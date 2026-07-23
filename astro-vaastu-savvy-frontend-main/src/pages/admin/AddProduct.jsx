import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

// Helper — render a tag-input row (comma separated → array)
const TagInput = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 font-medium text-sm">{label}</label>
    <input
      type="text"
      placeholder={placeholder || "Separate items with commas"}
      className="w-full border p-3 rounded text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <div className="flex flex-wrap gap-2 mt-2">
        {value.split(",").filter(Boolean).map((tag, i) => (
          <span key={i} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            {tag.trim()}
          </span>
        ))}
      </div>
    )}
  </div>
);

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ── Common fields ──────────────────────────────────────────────────────────
  const [name, setName]                 = useState("");
  const [category, setCategory]         = useState("bracelet");
  const [origin, setOrigin]             = useState("");
  const [price, setPrice]               = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock]               = useState("");
  const [callForPrice, setCallForPrice] = useState(false);
  const [images, setImages]             = useState([]);
  const [previews, setPreviews]         = useState([]);

  // ── Bracelet fields ────────────────────────────────────────────────────────
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription]           = useState("");
  const [symbolism, setSymbolism]               = useState("");
  const [benefitsAppeal, setBenefitsAppeal]     = useState("");
  const [benefitsHealing, setBenefitsHealing]   = useState("");
  const [whoIsItFor, setWhoIsItFor]             = useState("");
  const [footerQuote, setFooterQuote]           = useState("");
  const [footerNote, setFooterNote]             = useState("");

  // Ritual sub-fields
  const [energized, setEnergized]   = useState("");
  const [wearDay, setWearDay]       = useState("");
  const [wearHand, setWearHand]     = useState("");
  const [instruction, setInstruction] = useState("");

  // ── Rudraksha fields ───────────────────────────────────────────────────────
  const [title, setTitle]       = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [about, setAbout]       = useState("");
  const [benefits, setBenefits] = useState("");

  // ── Potli fields ───────────────────────────────────────────────────────────
  const [contents, setContents] = useState("");
  const [purpose, setPurpose]   = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [weight, setWeight]     = useState("");

  // ── Image preview handler ──────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category) {
      alert("Name and category are required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // Common
      formData.append("name", name);
      formData.append("category", category);
      formData.append("origin", origin);
      formData.append("price", price);
      formData.append("originalPrice", originalPrice);
      formData.append("stock", stock);
      formData.append("callForPrice", callForPrice);

      // Images
      images.forEach((img) => formData.append("images", img));

      // Bracelet
      if (category === "bracelet") {
        formData.append("shortDescription", shortDescription);
        formData.append("description", description);
        formData.append("symbolism",       JSON.stringify(symbolism.split(",").map(s => s.trim()).filter(Boolean)));
        formData.append("benefitsAppeal",  JSON.stringify(benefitsAppeal.split(",").map(s => s.trim()).filter(Boolean)));
        formData.append("benefitsHealing", JSON.stringify(benefitsHealing.split(",").map(s => s.trim()).filter(Boolean)));
        formData.append("whoIsItFor",      JSON.stringify(whoIsItFor.split(",").map(s => s.trim()).filter(Boolean)));
        formData.append("footerQuote", footerQuote);
        formData.append("footerNote", footerNote);
        formData.append("ritual", JSON.stringify({ energized, wearDay, wearHand, instruction }));
      }

      // Rudraksha
      if (category === "rudraksha") {
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("about", about);
        formData.append("benefits", JSON.stringify(benefits.split(",").map(s => s.trim()).filter(Boolean)));
      }

      // Potli
      if (category === "potli") {
        formData.append("contents", JSON.stringify(contents.split(",").map(s => s.trim()).filter(Boolean)));
        formData.append("purpose", purpose);
        formData.append("howToUse", howToUse);
        formData.append("weight", weight);
      }

      await api.post("/api/shop/products/admin/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="text-gray-500 hover:text-black transition text-sm"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── COMMON SECTION ── */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Basic Details</h3>

          <input
            type="text"
            placeholder="Product Name *"
            className="w-full border p-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div>
            <label className="block mb-1 font-medium text-sm">Category *</label>
            <select
              className="w-full border p-3 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="bracelet">Bracelet</option>
              <option value="rudraksha">Rudraksha</option>
              <option value="potli">Potli</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Origin (e.g. Nepal, India)"
            className="w-full border p-3 rounded"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="callForPrice"
              checked={callForPrice}
              onChange={() => setCallForPrice(!callForPrice)}
            />
            <label htmlFor="callForPrice" className="text-sm">Call for Price (hides price field)</label>
          </div>

          {!callForPrice && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-sm">Sale Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 999"
                  className="w-full border p-3 rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">Original Price (₹) — for strikethrough</label>
                <input
                  type="number"
                  placeholder="e.g. 1499"
                  className="w-full border p-3 rounded"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-sm">Stock Quantity</label>
            <input
              type="number"
              placeholder="e.g. 50"
              className="w-full border p-3 rounded"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium text-sm">Product Images (max 10)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="w-full border p-3 rounded text-sm"
              onChange={handleImageChange}
            />
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── BRACELET SECTION ── */}
        {category === "bracelet" && (
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-[#BC6C25]">Bracelet Details</h3>

            <textarea
              placeholder="Short Description"
              className="w-full border p-3 rounded"
              rows="2"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <textarea
              placeholder="Full Description"
              className="w-full border p-3 rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TagInput label="Symbolism"         value={symbolism}       onChange={setSymbolism} />
            <TagInput label="Benefits — Appeal"  value={benefitsAppeal}  onChange={setBenefitsAppeal} />
            <TagInput label="Benefits — Healing" value={benefitsHealing} onChange={setBenefitsHealing} />
            <TagInput label="Who Is It For"      value={whoIsItFor}      onChange={setWhoIsItFor} />

            <div>
              <h4 className="font-medium text-sm mb-3">Ritual Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Energized" className="border p-3 rounded text-sm" value={energized}    onChange={(e) => setEnergized(e.target.value)} />
                <input type="text" placeholder="Wear Day"  className="border p-3 rounded text-sm" value={wearDay}      onChange={(e) => setWearDay(e.target.value)} />
                <input type="text" placeholder="Wear Hand" className="border p-3 rounded text-sm" value={wearHand}     onChange={(e) => setWearHand(e.target.value)} />
                <input type="text" placeholder="Instruction" className="border p-3 rounded text-sm" value={instruction} onChange={(e) => setInstruction(e.target.value)} />
              </div>
            </div>

            <input type="text" placeholder="Footer Quote" className="w-full border p-3 rounded" value={footerQuote} onChange={(e) => setFooterQuote(e.target.value)} />
            <input type="text" placeholder="Footer Note"  className="w-full border p-3 rounded" value={footerNote}  onChange={(e) => setFooterNote(e.target.value)} />
          </div>
        )}

        {/* ── RUDRAKSHA SECTION ── */}
        {category === "rudraksha" && (
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-green-700">Rudraksha Details</h3>

            <input type="text" placeholder="Title (e.g. 5 Mukhi Rudraksha)" className="w-full border p-3 rounded" value={title}    onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Subtitle"                        className="w-full border p-3 rounded" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            <textarea
              placeholder="About"
              className="w-full border p-3 rounded"
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <TagInput label="Benefits" value={benefits} onChange={setBenefits} />
          </div>
        )}

        {/* ── POTLI SECTION ── */}
        {category === "potli" && (
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 text-[#5D101D]">Potli Details</h3>

            <TagInput label="Contents (what's inside)" value={contents} onChange={setContents} />
            <input type="text" placeholder="Purpose (e.g. Wealth & Prosperity)" className="w-full border p-3 rounded" value={purpose}  onChange={(e) => setPurpose(e.target.value)} />
            <textarea
              placeholder="How To Use"
              className="w-full border p-3 rounded"
              rows="3"
              value={howToUse}
              onChange={(e) => setHowToUse(e.target.value)}
            />
            <input type="text" placeholder="Weight (e.g. 250g)" className="w-full border p-3 rounded" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-black text-white px-6 py-3 rounded w-full md:w-auto transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;