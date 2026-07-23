import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

// ─── Generate 6-digit OTP ───────────────────────────────────────────────────
const generateOTP = () =>
  crypto.randomInt(100000, 999999).toString();

// ─── POST /api/user/send-otp ─────────────────────────────────────────────────
export const sendOTP = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Name and email are required" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Upsert user — create if new, update OTP if existing
    const user = await User.findOneAndUpdate(
      { email },
      {
        name,
        otp: { code: otp, expiresAt },
        isVerified: false,
      },
      { upsert: true, new: true }
    );

    await sendEmail({
      to: email,
      subject: "Your AstroVastuSavvy Login OTP",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#faf9f7;border-radius:12px;">
          <h2 style="color:#4a1d96;margin-bottom:8px;">AstroVastuSavvy</h2>
          <p style="color:#555;">Hello <strong>${name}</strong>,</p>
          <p style="color:#555;">Your one-time login code is:</p>
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#4a1d96;margin:24px 0;text-align:center;">
            ${otp}
          </div>
          <p style="color:#888;font-size:13px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#aaa;font-size:12px;">AstroVastuSavvy — Spiritual guidance, delivered with care.</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("sendOTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ─── POST /api/user/verify-otp ───────────────────────────────────────────────
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found. Please register." });
    }

    if (!user.otp?.code || !user.otp?.expiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "No OTP found. Please request again." });
    }

    if (new Date() > user.otp.expiresAt) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    if (user.otp.code !== otp.trim()) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP" });
    }

    // Clear OTP after successful use
    user.otp = { code: null, expiresAt: null };
    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("verifyOTP error:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};

// ─── GET /api/user/me ────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-otp");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};