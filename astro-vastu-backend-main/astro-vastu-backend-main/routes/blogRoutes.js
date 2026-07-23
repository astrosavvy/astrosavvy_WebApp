import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import { upload } from "../middleware/uploadMiddleware.js"; // ← named import
import { protectAdmin } from "../middleware/authMiddleware.js";
import Blog from "../models/Blog.js";

const router = express.Router();

const adminRoles = ["super-admin", "blog-admin"];

/* ===========================
   PUBLIC ROUTES
=========================== */

// Get all published blogs
router.get("/", getAllBlogs);

/* ===========================
   ADMIN ROUTES
   (MUST COME BEFORE :slug)
=========================== */

// Fetch blog by ID (Admin only)
router.get("/admin/:id", protectAdmin(adminRoles), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ blog });
  } catch (error) {
    console.error("Admin Fetch Blog Error:", error);
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// Create Blog
router.post(
  "/",
  protectAdmin(adminRoles),
  upload.single("coverImage"),
  createBlog
);

// Update Blog
router.put(
  "/:id",
  protectAdmin(adminRoles),
  upload.single("coverImage"),
  updateBlog
);

// Delete Blog
router.delete("/:id", protectAdmin(adminRoles), deleteBlog);

/* ===========================
   SLUG ROUTE (MUST BE LAST)
=========================== */

// Get single blog by slug
router.get("/:slug", getSingleBlog);

export default router;