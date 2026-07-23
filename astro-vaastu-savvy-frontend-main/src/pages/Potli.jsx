import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Potli() {
  const navigate = useNavigate();
  const [potlis, setPotlis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPotlis = async () => {
      try {
        const res = await api.get("/api/shop/products?category=potli");

        if (Array.isArray(res.data)) {
          setPotlis(res.data);
        } else if (res.data.products && Array.isArray(res.data.products)) {
          setPotlis(res.data.products);
        } else {
          setPotlis([]);
        }
      } catch (err) {
        console.error("Potli fetch error:", err);
        setPotlis([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPotlis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#5D101D] font-serif text-xl animate-pulse">
        Loading Divine Potlis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#4A3728] px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-[#5D101D] mb-4">
            Sacred Potli Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specially energized spiritual potlis prepared through sacred rituals
            to remove negativity and invite abundance.
          </p>
        </div>

        {/* EMPTY STATE */}
        {potlis.length === 0 && (
          <div className="text-center text-gray-500 mt-20 text-lg">
            No potlis available yet.
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {potlis.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/potli/${product.slug || product._id}`)} // ← slug with _id fallback
              className="group cursor-pointer bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8 space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#5D101D]">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {product.shortDescription || product.description}
                </p>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold text-[#8B0000]">
                    {product.price
                      ? `₹${product.price.toLocaleString()}`
                      : "Call for Price"}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#B27D62] font-semibold">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Potli;