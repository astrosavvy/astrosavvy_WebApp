import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import kundliRoutes from "./routes/KundliRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productPaymentRoutes from "./routes/productPaymentRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

/* ===============================
   ENV + DB
================================ */
dotenv.config();
connectDB();

/* ===============================
   INIT EXPRESS
================================ */
const app = express();

/* ===============================
   CORS
================================ */
const allowedOrigins = [
  "http://localhost:5173",
  "https://www.astrosavvysingh.com",
  "https://astrosavvysingh.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / server-to-server
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/product-payment", productPaymentRoutes);
app.use("/api/kundli",          kundliRoutes);
app.use("/api/admin",           adminRoutes);
app.use("/api/orders",          orderRoutes);
app.use("/api/products",        productRoutes);
app.use("/api/blogs",           blogRoutes);
app.use("/api/user",            userRoutes);

/* ===============================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
  res.send("Astro Vaastu Savvy Backend is Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Frontend connected successfully 🎉" });
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});