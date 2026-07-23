import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

   productCategory: {
  type: String,
  enum: ["bracelet", "rudraksha", "potli"],
  required: true,
},


    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: String,

    address: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "failed", "pending"],
      default: "paid",
    },

    orderStatus: {
      type: String,
      enum: ["received", "processing", "shipped", "delivered", "cancelled"],
      default: "received",
    },
  },
  { timestamps: true }
);
orderSchema.index({ createdAt: -1 });
orderSchema.index({ productCategory: 1 });
orderSchema.index({ paymentId: 1 });
export default mongoose.model("Order", orderSchema);
