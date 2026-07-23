import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Kundli from "../models/Kundli.js";

/* =====================================================
   CREATE RAZORPAY ORDER
===================================================== */
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("❌ Create Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};


/* =====================================================
   VERIFY PAYMENT & SAVE DATA
===================================================== */
export const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderType,
      amount,
      kundliData,
      cartItems,
      customer
    } = req.body;

    /* ==============================
       VALIDATION
    ============================== */

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    /* ==============================
       VERIFY SIGNATURE
    ============================== */

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }


    /* =====================================================
       🟣 KUNDLI PAYMENT
    ===================================================== */

   if (orderType && orderType.toLowerCase() === "kundli") {
      if (!kundliData) {
        return res.status(400).json({
          success: false,
          message: "Kundli data missing",
        });
      }

      const savedKundli = await Kundli.create({

        fullName: kundliData.fullName,
        email: kundliData.email,
        phone: kundliData.phone,
        dateOfBirth: kundliData.dateOfBirth,
        timeOfBirth: kundliData.timeOfBirth,
        placeOfBirth: kundliData.placeOfBirth,
        gender: kundliData.gender,
        message: kundliData.message,

        paymentStatus: "paid",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      });

      return res.status(200).json({
        success: true,
        message: "Kundli saved successfully",
        data: savedKundli,
      });
    }


    /* =====================================================
       🟢 PRODUCT CART PAYMENT
    ===================================================== */

    if (orderType === "product") {

      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart items missing",
        });
      }

      const ordersToSave = cartItems.map((item) => ({
        productName: item.name || item.title,
        productPrice: item.price,

        productCategory:
          item.category &&
          ["bracelet", "rudraksha", "potli", "kundli"].includes(
            item.category.toLowerCase()
          )
            ? item.category.toLowerCase()
            : "product",

        orderType: "product",

        customerName: customer?.name,
        email: customer?.email,
        phone: customer?.phone,
        address: customer?.address,

        paymentId: razorpay_payment_id,
        paymentStatus: "paid",
        orderStatus: "received",
      }));

      const savedOrders = await Order.insertMany(ordersToSave);

      return res.status(200).json({
        success: true,
        message: "Product order saved successfully",
        orders: savedOrders,
      });
    }


    /* ==============================
       INVALID ORDER TYPE
    ============================== */

    return res.status(400).json({
      success: false,
      message: "Invalid order type",
    });

  } catch (error) {

    console.error("❌ Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};