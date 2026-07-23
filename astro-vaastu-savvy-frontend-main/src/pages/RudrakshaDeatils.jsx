import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

function RudrakshaDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    api.get(`/api/shop/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3] py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* ================= IMAGE SLIDER ================= */}
        <div className="relative">
         <img
  src={product.images?.[currentImage] || "/images/fallback.jpg"}
  alt={product.name}
  className="rounded-3xl shadow-xl w-full object-cover"
/>


          {product.images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-2 rounded-full shadow"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-2 rounded-full shadow"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* ================= INFO ================= */}
        <div className="space-y-6">

          {/* TITLE */}
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1B2624] leading-snug">
            {product.title}
          </h1>

          {/* SUBTITLE */}
          <p className="text-gray-600 text-lg">
            {product.subtitle}
          </p>

          {/* PRICE */}
         <p className="text-3xl font-semibold text-[#BC6C25]">
  {product.price
    ? `₹${product.price.toLocaleString()}`
    : "Call for Pricing"}
</p>


          {/* ABOUT */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-[#1B2624]">
              About This Rudraksha
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.about}
            </p>
          </div>

          {/* BENEFITS */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-[#1B2624]">
              Key Benefits
            </h3>

            <ul className="space-y-3">
              {product.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1">✔</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ICON BADGES */}
          <div className="flex flex-wrap gap-4 mt-8">
            {product.icons?.map((icon, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-50 text-sm rounded-full border text-green-700"
              >
                {icon}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default RudrakshaDetails;
