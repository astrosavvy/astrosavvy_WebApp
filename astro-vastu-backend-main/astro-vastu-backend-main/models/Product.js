import mongoose from "mongoose";
import slugify from "slugify";

// ─── Ritual Sub-Schema ───────────────────────────────────────────────────────
const ritualSchema = new mongoose.Schema(
  {
    energized:   { type: String, default: "" },
    wearDay:     { type: String, default: "" },
    wearHand:    { type: String, default: "" },
    instruction: { type: String, default: "" },
  },
  { _id: false }
);

// ─── Main Product Schema ──────────────────────────────────────────────────────
const productSchema = new mongoose.Schema(
  {
    // ── COMMON FIELDS ──────────────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
      // Auto-generated from name — see pre-save hook below
    },

    category: {
      type: String,
      enum: {
        values: ["bracelet", "rudraksha", "potli"],
        message: "Category must be bracelet, rudraksha, or potli",
      },
      required: [true, "Category is required"],
    },

    origin: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      default: 0,
    },

    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
      default: null,
    },

    // Cloudinary image URLs — stored as array
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: "Maximum 10 images allowed",
      },
    },

    callForPrice: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true, // soft delete / hide from frontend
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    // ── BRACELET FIELDS ────────────────────────────────────────────────────────
    shortDescription: { type: String, default: "" },
    description:      { type: String, default: "" },

    symbolism:       { type: [String], default: [] },
    benefitsAppeal:  { type: [String], default: [] },
    benefitsHealing: { type: [String], default: [] },

    ritual: {
      type: ritualSchema,
      default: () => ({}),
    },

    whoIsItFor:  { type: [String], default: [] },
    footerQuote: { type: String,   default: "" },
    footerNote:  { type: String,   default: "" },

    // ── RUDRAKSHA FIELDS ───────────────────────────────────────────────────────
    title:    { type: String, default: "" },
    subtitle: { type: String, default: "" },
    about:    { type: String, default: "" },
    benefits: { type: [String], default: [] },

    // Icon URLs (Cloudinary) — separate from product images
    icons: { type: [String], default: [] },

    // ── POTLI FIELDS ───────────────────────────────────────────────────────────
    contents:    { type: [String], default: [] }, // what's inside the potli
    purpose:     { type: String,   default: "" }, // e.g. "Wealth & Prosperity"
    howToUse:    { type: String,   default: "" },
    weight:      { type: String,   default: "" }, // e.g. "250g"
  },
  {
    timestamps: true, // createdAt + updatedAt auto-managed
  }
);

// ─── Auto-generate slug from name ─────────────────────────────────────────────
productSchema.pre("save", async function (next) {
  // Only regenerate if name changed or slug is missing
  if (!this.isModified("name") && this.slug) return next();

  let baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  // Ensure slug is unique
  while (await mongoose.models.Product.findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

// ─── Auto-sync inStock with stock count ───────────────────────────────────────
productSchema.pre("save", function (next) {
  this.inStock = this.stock > 0;
  next();
});

// ─── Virtual: discount percentage ─────────────────────────────────────────────
productSchema.virtual("discountPercent").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.set("toJSON",   { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("Product", productSchema);