import jwt from "jsonwebtoken";

// ─── Existing admin middleware (unchanged) ────────────────────────────────────
export const protectAdmin = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Token missing",
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.role) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      req.admin = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token expired or invalid",
      });
    }
  };
};

// ─── New user middleware ──────────────────────────────────────────────────────
export const protectUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure this is a user token (has userId), not an admin token (has role)
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user token",
      });
    }

    req.user = decoded; // { userId, email }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please login again.",
    });
  }
};