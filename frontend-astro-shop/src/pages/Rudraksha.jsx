import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Rudraksha() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/shop/products?category=rudraksha");
        const data = res.data.products || res.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FFFBF7] text-[#4A3728] selection:bg-[#5D101D] selection:text-white overflow-hidden">

      {/* Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5D101D]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B27D62] font-bold mb-4 block">
            The Tears of Lord Shiva
          </span>
          <h1 className="text-5xl md:text-6xl font-bold italic text-[#5D101D] mb-4">
            Sacred Rudraksha
          </h1>
          <div className="w-24 h-px bg-[#E6BE8A] mx-auto mb-8" />
          <p className="text-gray-600 max-w-2xl mx-auto italic">
            Each bead carries a unique spiritual frequency based on its Mukhi,
            helping in protection, clarity, and spiritual growth.
          </p>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#5D101D]">The Collection</h2>
              <p className="text-[#B27D62] text-sm italic">Authentic • Lab-Certified • Energised</p>
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
              {products.length} Items
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D101D]"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 italic">No sacred beads found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product.slug || product._id}`)} // ← slug with _id fallback
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/500x600?text=No+Image"}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5D101D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-8 bg-white">
                      <h3 className="text-xl font-bold text-[#5D101D] mb-2 group-hover:text-[#8B0000] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 italic line-clamp-1 mb-4">
                        {product.shortDescription}
                      </p>
                      <div className="flex justify-between items-center border-t border-[#E6BE8A]/20 pt-4">
                        <span className="text-2xl font-bold text-[#8B0000]">
                          {product.price
                            ? `₹${Number(product.price).toLocaleString("en-IN")}`
                            : "Call for Pricing"}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B27D62] border-b border-[#B27D62] pb-1 group-hover:text-[#5D101D] group-hover:border-[#5D101D] transition-all">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER CTA */}
        <section className="bg-[#5D101D] py-16 px-6 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl italic font-semibold">Need help choosing your Mukhi?</h3>
            <p className="opacity-80 leading-relaxed italic">
              Our Vedic experts can guide you to the right Rudraksha based on your birth chart and life goals.
            </p>
            <button className="mt-4 px-10 py-4 border border-[#E6BE8A] text-[#E6BE8A] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E6BE8A] hover:text-[#5D101D] transition-all duration-300">
              Consult a Vedic Expert
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Rudraksha;