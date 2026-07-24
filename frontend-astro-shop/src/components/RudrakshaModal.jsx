import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function RudrakshaModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  /* ==============================
     Prevent Background Scroll
  ============================== */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* ==============================
     Slider Controls
  ============================== */
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

  /* ==============================
     Add To Cart
  ============================== */
  const handleAddToCart = () => {
    if (!product.price) return;

    addToCart(product);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  /* ==============================
     JSX
  ============================== */
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal Box */}
        <div
          className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">

            {/* ================= LEFT: IMAGE SLIDER ================= */}
            <div className="relative">

              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full rounded-2xl object-cover"
              />

              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-10 h-10"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-10 h-10"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      currentImage === index
                        ? "bg-[#8B0000]"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ================= RIGHT: CONTENT ================= */}
            <div className="space-y-6">

              <h2 className="text-3xl font-bold text-[#5D101D]">
                {product.title}
              </h2>

              <p className="text-gray-600 font-medium">
                {product.subtitle}
              </p>

              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.about}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-2 text-gray-700">
                      ✔ {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Icons */}
              <div className="grid grid-cols-2 gap-3 text-sm font-medium text-gray-700">
                {product.icons.map((icon, index) => (
                  <div key={index}>✔ {icon}</div>
                ))}
              </div>

              {/* ================= PRICE SECTION ================= */}
              <div className="pt-4 border-t">

                {product.price ? (
                  <>
                    <p className="text-2xl font-bold text-[#8B0000]">
                      ₹{product.price}
                    </p>

                    <button
                      onClick={handleAddToCart}
                      className="w-full mt-4 py-3 rounded-xl bg-[#5D101D] text-white font-semibold hover:opacity-90 transition"
                    >
                      Add to Cart
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-semibold text-[#8B0000]">
                      Call for Pricing
                    </p>

                    <a
                      href="tel:+91XXXXXXXXXX"
                      className="block w-full mt-4 text-center py-3 rounded-xl bg-[#5D101D] text-white font-semibold"
                    >
                      Contact Now
                    </a>
                  </>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= TOAST ================= */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1B2624] text-white px-6 py-3 rounded-full shadow-lg z-50">
          ✅ Added to cart
        </div>
      )}
    </>
  );
}

export default RudrakshaModal;
