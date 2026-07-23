import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const emailLower = email.toLowerCase().trim();
    let role = null;

    // SUPER ADMIN
    if (
      emailLower === process.env.SUPER_ADMIN_EMAIL.toLowerCase() &&
      password === process.env.SUPER_ADMIN_PASSWORD
    ) {
      role = "super-admin";
    }

    // BLOG ADMIN
    if (
      emailLower === process.env.BLOG_ADMIN_EMAIL.toLowerCase() &&
      password === process.env.BLOG_ADMIN_PASSWORD
    ) {
      role = "blog-admin";
    }

    if (!role) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      role,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};