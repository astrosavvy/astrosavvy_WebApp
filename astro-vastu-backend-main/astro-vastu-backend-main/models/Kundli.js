import mongoose from "mongoose";

const kundliSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    timeOfBirth: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    message: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "pending", // pending | paid
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },

    // ── Fulfilment tracking (shown in user dashboard) ──
    deliveryStatus: {
      type: String,
      enum: ["pending", "under_review", "in_progress", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Kundli = mongoose.model("Kundli", kundliSchema);

export default Kundli;