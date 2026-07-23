import express from "express";
import Order from "../models/Order.js";
import Kundli from "../models/Kundli.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ─── GET /api/orders?category=rudraksha ──────────────────────────────────────
router.get("/", protectAdmin(["super-admin"]), async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { productCategory: category } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// ─── PATCH /api/orders/:id/status ────────────────────────────────────────────
router.patch("/:id/status", protectAdmin(["super-admin"]), async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["received", "processing", "shipped", "delivered", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
});

// ─── PATCH /api/orders/kundli/:id/status ─────────────────────────────────────
router.patch("/kundli/:id/status", protectAdmin(["super-admin"]), async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["pending", "under_review", "in_progress", "delivered"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const kundli = await Kundli.findByIdAndUpdate(
      req.params.id,
      { deliveryStatus: status },
      { new: true }
    );

    if (!kundli) {
      return res.status(404).json({ success: false, message: "Kundli order not found" });
    }

    res.status(200).json({ success: true, kundli });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update kundli status" });
  }
});

export default router;