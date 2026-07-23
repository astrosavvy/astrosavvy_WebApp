import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import RudrakshaModal from "../components/RudrakshaModal";

function RudrakshaCategory() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get("/api/shop/products?category=rudraksha")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-16 px-6">
      <h1 className="text-4xl text-center font-bold text-[#5D101D] mb-12">
        Sacred Rudraksha Collection
      </h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map(product => (
          <div
            key={product._id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#5D101D]">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                ₹{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <RudrakshaModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default RudrakshaCategory;
