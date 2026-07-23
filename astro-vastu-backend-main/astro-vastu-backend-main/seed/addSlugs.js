import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const addSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const db = mongoose.connection.db;
    const products = await db.collection("products").find({}).toArray();

    console.log(`📦 Found ${products.length} products`);

    let updated = 0;

    for (const product of products) {
      // Generate slug from name
      const baseSlug = product.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      // Check if slug already exists on another product
      let slug = baseSlug;
      let count = 1;
      while (
        await db.collection("products").findOne({
          slug,
          _id: { $ne: product._id },
        })
      ) {
        slug = `${baseSlug}-${count++}`;
      }

      await db.collection("products").updateOne(
        { _id: product._id },
        { $set: { slug } }
      );

      console.log(`  ✅ "${product.name}" → slug: "${slug}"`);
      updated++;
    }

    console.log(`\n🎉 Done! Updated ${updated} products with slugs.`);
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

addSlugs();