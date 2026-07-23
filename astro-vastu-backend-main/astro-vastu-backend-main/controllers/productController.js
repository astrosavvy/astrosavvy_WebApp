import Product from "../models/Product.js";
import cloudinary, { uploadToCloudinary } from "../middleware/uploadMiddleware.js";

/* =========================================================
   ADD PRODUCT (ADMIN)
========================================================= */
export const addProduct = async (req, res) => {
  try {
    const {
      // Common
      name, category, origin, price, originalPrice, callForPrice,
      stock, isActive,

      // Bracelet
      shortDescription, description, symbolism, benefitsAppeal,
      benefitsHealing, ritual, whoIsItFor, footerQuote, footerNote,

      // Rudraksha
      title, subtitle, about, benefits,

      // Potli
      contents, purpose, howToUse, weight,
    } = req.body;

    // ── Parse JSON strings sent from multipart/form-data ──────────────────────
    const parse = (val) => {
      if (!val) return [];
      try { return typeof val === "string" ? JSON.parse(val) : val; }
      catch { return Array.isArray(val) ? val : [val]; }
    };

    // ── Upload images to Cloudinary via buffer ────────────────────────────────
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const results = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, `astrovastusavvy/products/${category || "general"}`)
        )
      );
      imageUrls = results.map((r) => r.secure_url);
    }

    const product = await Product.create({
      // Common
      name, category, origin,
      price:         Number(price) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : null,
      callForPrice:  callForPrice === "true" || callForPrice === true,
      stock:         Number(stock) || 0,
      isActive:      isActive !== undefined ? isActive !== "false" : true,
      images:        imageUrls,

      // Bracelet
      shortDescription, description,
      symbolism:       parse(symbolism),
      benefitsAppeal:  parse(benefitsAppeal),
      benefitsHealing: parse(benefitsHealing),
      ritual:          ritual ? (typeof ritual === "string" ? JSON.parse(ritual) : ritual) : {},
      whoIsItFor:      parse(whoIsItFor),
      footerQuote, footerNote,

      // Rudraksha
      title, subtitle, about,
      benefits: parse(benefits),

      // Potli
      contents: parse(contents),
      purpose, howToUse, weight,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add product",
    });
  }
};

/* =========================================================
   GET ALL PRODUCTS (ADMIN - includes inactive)
========================================================= */
export const getAllProductsAdmin = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* =========================================================
   GET ALL PRODUCTS (PUBLIC - only active)
========================================================= */
export const getAllProductsPublic = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Fetch public products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* =========================================================
   GET SINGLE PRODUCT BY SLUG (PUBLIC)
========================================================= */
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug, isActive: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Fetch product error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

/* =========================================================
   UPDATE PRODUCT (ADMIN)
========================================================= */
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const parse = (val) => {
      if (!val) return undefined;
      try { return typeof val === "string" ? JSON.parse(val) : val; }
      catch { return Array.isArray(val) ? val : [val]; }
    };

    // ── Upload new images if provided ──────────────────────────────────────────
    let imageUrls = product.images; // keep existing by default
    if (req.files && req.files.length > 0) {
      const results = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer, `astrovastusavvy/products/${product.category}`)
        )
      );
      imageUrls = results.map((r) => r.secure_url);
    }

    const {
      name, category, origin, price, originalPrice, callForPrice,
      stock, isActive, shortDescription, description, symbolism,
      benefitsAppeal, benefitsHealing, ritual, whoIsItFor,
      footerQuote, footerNote, title, subtitle, about, benefits,
      contents, purpose, howToUse, weight,
    } = req.body;

    // Build update object — only include fields that were sent
    const updates = {
      ...(name              && { name }),
      ...(category          && { category }),
      ...(origin            !== undefined && { origin }),
      ...(price             !== undefined && { price: Number(price) }),
      ...(originalPrice     !== undefined && { originalPrice: originalPrice ? Number(originalPrice) : null }),
      ...(callForPrice      !== undefined && { callForPrice: callForPrice === "true" || callForPrice === true }),
      ...(stock             !== undefined && { stock: Number(stock) }),
      ...(isActive          !== undefined && { isActive: isActive !== "false" }),
      images:               imageUrls,
      ...(shortDescription  !== undefined && { shortDescription }),
      ...(description       !== undefined && { description }),
      ...(symbolism         && { symbolism: parse(symbolism) }),
      ...(benefitsAppeal    && { benefitsAppeal: parse(benefitsAppeal) }),
      ...(benefitsHealing   && { benefitsHealing: parse(benefitsHealing) }),
      ...(ritual            && { ritual: typeof ritual === "string" ? JSON.parse(ritual) : ritual }),
      ...(whoIsItFor        && { whoIsItFor: parse(whoIsItFor) }),
      ...(footerQuote       !== undefined && { footerQuote }),
      ...(footerNote        !== undefined && { footerNote }),
      ...(title             !== undefined && { title }),
      ...(subtitle          !== undefined && { subtitle }),
      ...(about             !== undefined && { about }),
      ...(benefits          && { benefits: parse(benefits) }),
      ...(contents          && { contents: parse(contents) }),
      ...(purpose           !== undefined && { purpose }),
      ...(howToUse          !== undefined && { howToUse }),
      ...(weight            !== undefined && { weight }),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

/* =========================================================
   DELETE PRODUCT (ADMIN)
========================================================= */
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ── Delete images from Cloudinary ─────────────────────────────────────────
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((url) => {
        // Extract public_id from Cloudinary URL
        const parts = url.split("/");
        const publicIdWithExt = parts.slice(-2).join("/"); // folder/filename
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove extension
        return cloudinary.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises);
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

/* =========================================================
   TOGGLE PRODUCT ACTIVE STATUS (ADMIN)
========================================================= */
export const toggleProductStatus = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? "activated" : "deactivated"} successfully`,
      isActive: product.isActive,
    });
  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle product status",
    });
  }
};