import Blog from "../models/Blog.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";

// =======================
// CREATE BLOG (Admin)
// =======================
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, isPublished } = req.body;

    let coverImage = "";

    // Upload image to Cloudinary if file exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });

      coverImage = result.secure_url;
    }

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      coverImage,
      isPublished,
      slug: slugify(title, { lower: true, strict: true }),
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

// =======================
// GET ALL BLOGS (Public)
// =======================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

// =======================
// GET SINGLE BLOG
// =======================
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// =======================
// UPDATE BLOG (Admin)
// =======================
export const updateBlog = async (req, res) => {
  try {
    const { title, excerpt, content, isPublished } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title || blog.title;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;
    blog.isPublished = isPublished ?? blog.isPublished;

    // Upload new image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });

      blog.coverImage = result.secure_url;
    }

    blog.slug = slugify(blog.title, { lower: true, strict: true });

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
    });
  }
};

// =======================
// DELETE BLOG (Admin)
// =======================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};