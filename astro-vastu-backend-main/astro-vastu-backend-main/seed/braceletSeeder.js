import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const seedBracelets = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const bracelets = [
      {
        name: "Divy Love Bracelet",
        slug: "divy-love-bracelet",
        category: "bracelet",
        price: 999,
        originalPrice: 2499,
        images: [
          "/images/bracelets/divy-1.jpg",
          "/images/bracelets/divy-2.jpg",
          "/images/bracelets/divy-3.jpg"
        ],
        shortDescription: "A sacred blend to attract divine love.",
        about: "Full detailed spiritual description here...",
      }
    ];

    await Product.deleteMany({ category: "bracelet" });
    await Product.insertMany(bracelets);

    console.log("Bracelets Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBracelets();
