import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const seedPotli = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    const potli = {
      name: "Sarvdosh Nivaran Holashtak Potli",
      slug: "sarvdosh-nivaran-holashtak-potli",
      category: "potli",

      price: 2100,
      originalPrice: 5100,

      images: [
        "/images/potli/potli-5.jpeg",
        "/images/potli/potli-6.jpeg",
        "/images/potli/potli-1.jpeg",
        "/images/potli/potli-4.jpeg"
      ],

      shortDescription:
        "Holi Special (Abhimantrit + Energized) – Removes negativity, clears money blockages & restores peace.",

      description:
        "On the auspicious occasion of Holi, this specially energized Tantra Potli is prepared through sacred rituals and mantra chanting to help eliminate negative energy, financial blockages, and constant conflicts in the home.",

      symbolism: [
        "Removes Negativity",
        "Nazar Dosh Protector",
        "Clears Money Blockages",
        "Restores Peace at Home"
      ],

      whoIsItFor: [
        "Money coming in but not staying",
        "Frequent arguments and tension at home",
        "Stuck business or job growth",
        "Negative vibes or evil eye effects",
        "Work getting delayed repeatedly",
        "Marriage getting delayed",
        "Instability in love relationships"
      ],

      benefits: [
        "Reduces negative energy",
        "Supports financial flow",
        "Brings peace and harmony in family",
        "Helpful for business and career growth",
        "Protects from nazar and unwanted energies",
        "Supports love and harmony"
      ],

      ritual: {
        energized:
          "Prepared through sacred Holashtak rituals and Vedic mantra chanting for maximum spiritual activation.",
        instruction:
          "Place the potli in your home or business space before Holi. Simple and detailed instructions will be provided with the package."
      },

      footerQuote:
        "Order now and invite positive energy and abundance into your life.",

      footerNote:
        "Limited Holi Offer. Available for a short time only."
    };

    // 🔥 Delete only potli products (SAFE)
    await Product.deleteMany({ category: "potli" });

    await Product.create(potli);

    console.log("Potli Seeded Successfully 🚀");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedPotli();
