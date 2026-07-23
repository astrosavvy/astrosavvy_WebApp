import express from "express";
import { sendOTP, verifyOTP, getMe } from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Kundli from "../models/Kundli.js";

const router = express.Router();

// ─── Auth ─────────────────────────────────────────────────────────────────────
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/me", protectUser, getMe);

// ─── Dashboard: all orders by user email ─────────────────────────────────────
router.get("/dashboard", protectUser, async (req, res) => {
  try {
    const email = req.user.email;

    const [kundliOrders, productOrders] = await Promise.all([
      // Kundli: select delivery tracking fields only
      Kundli.find({ email })
        .sort({ createdAt: -1 })
        .select("fullName email phone dateOfBirth paymentStatus deliveryStatus razorpayPaymentId createdAt")
        .lean(),

      // Product orders: only paid orders
      Order.find({ email, paymentStatus: "paid" })
        .sort({ createdAt: -1 })
        .select("productName productPrice productCategory customerName phone email address orderStatus paymentId createdAt")
        .lean(),
    ]);

    // Split product orders by category using productCategory field
    const rudrakshaOrders = productOrders.filter(o => o.productCategory === "rudraksha");
    const braceletOrders  = productOrders.filter(o => o.productCategory === "bracelet");
    const potliOrders     = productOrders.filter(o => o.productCategory === "potli");

    res.status(200).json({
      success: true,
      data: {
        kundliOrders,
        rudrakshaOrders,
        braceletOrders,
        potliOrders,
      },
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

export default router;