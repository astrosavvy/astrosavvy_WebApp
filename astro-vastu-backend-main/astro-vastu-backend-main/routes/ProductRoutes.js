import express from "express";
import {
  addProduct,
  getAllProductsAdmin,
  getAllProductsPublic,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

const superAdminOnly = ["super-admin"];

/* ===============================
   PUBLIC – GET ALL PRODUCTS
   /api/products
   /api/products?category=bracelet
=============================== */
router.get("/", getAllProductsPublic);

/* ===============================
   ADMIN – GET ALL PRODUCTS
   MUST be before /:slug
=============================== */
router.get("/admin/all", protectAdmin(superAdminOnly), getAllProductsAdmin);

/* ===============================
   ADMIN – ADD NEW PRODUCT
=============================== */
router.post(
  "/admin/add",
  protectAdmin(superAdminOnly),
  upload.array("images", 10),
  addProduct
);

/* ===============================
   ADMIN – UPDATE PRODUCT
=============================== */
router.put(
  "/admin/:productId",
  protectAdmin(superAdminOnly),
  upload.array("images", 10),
  updateProduct
);

/* ===============================
   ADMIN – DELETE PRODUCT
=============================== */
router.delete(
  "/admin/:productId",
  protectAdmin(superAdminOnly),
  deleteProduct
);

/* ===============================
   ADMIN – TOGGLE ACTIVE STATUS
=============================== */
router.patch(
  "/admin/:productId/toggle",
  protectAdmin(superAdminOnly),
  toggleProductStatus
);

/* ===============================
   PUBLIC – GET SINGLE PRODUCT
   MUST be last — catches /:slug
   /api/products/divy-love-bracelet
=============================== */
router.get("/:slug", getProductBySlug);

export default router;