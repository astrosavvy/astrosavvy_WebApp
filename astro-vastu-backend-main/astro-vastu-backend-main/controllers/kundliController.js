import Kundli from "../models/Kundli.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ======================================================
   CREATE FREE / UNPAID KUNDLI
====================================================== */
export const createKundli = async (req, res) => {
  try {
    const kundliData = req.body;

    const newKundli = await Kundli.create(kundliData);

    res.status(201).json({
      success: true,
      message: "Kundli consultation submitted successfully",
      data: newKundli,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit kundli form",
      error: error.message,
    });
  }
};

/* ======================================================
   CREATE PAID KUNDLI + EMAILS
====================================================== */
export const createPaidKundli = async (req, res) => {
  try {
    const kundliData = req.body;

    const newKundli = await Kundli.create({
      ...kundliData,
      paymentStatus: "paid",
    });

    /* ===============================
       EMAILS (NON-BLOCKING)
    ================================ */
    try {
      // 📧 USER EMAIL
      await sendEmail({
        to: newKundli.email,
        subject: "Your Paid Kundli Consultation is Confirmed ✨",
        html: `
          <h2>Thank You, ${newKundli.fullName}</h2>
          <p>Your paid kundli consultation has been successfully received.</p>
          <p>Our team will analyze your details and get back to you soon.</p>
          <br/>
          <p>🙏 Astro Vaastu Savvy</p>
        `,
      });

      // 📧 ADMIN EMAIL
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: "🔔 New Paid Kundli Consultation",
        html: `
          <h3>New Paid Kundli Received</h3>
          <p><strong>Name:</strong> ${newKundli.fullName}</p>
          <p><strong>Email:</strong> ${newKundli.email}</p>
          <p><strong>Phone:</strong> ${newKundli.phone}</p>
          <p><strong>Payment Status:</strong> Paid</p>
        `,
      });
    } catch (emailError) {
      console.error("⚠️ Email sending failed:", emailError.message);
      // ❗ DO NOT block API response
    }

    res.status(201).json({
      success: true,
      message: "Paid Kundli consultation saved successfully",
      data: newKundli,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save paid kundli",
      error: error.message,
    });
  }
};

/* ======================================================
   GET ALL PAID KUNDLIS (ADMIN)
====================================================== */
export const getPaidKundlis = async (req, res) => {
  try {
    const kundlis = await Kundli.find({ paymentStatus: "paid" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: kundlis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch paid kundlis",
    });
  }
};
