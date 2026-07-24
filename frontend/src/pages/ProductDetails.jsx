import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";

function ProductDetails() {
  const { slug } = useParams(); // ← was `id`, now `slug`
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    api.get(`/api/shop/products/${slug}`) // ← now fetches by slug
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.product);
        }
      })
      .catch(err => console.log(err));
  }, [slug]);

  useEffect(() => {
    if (!product?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % product.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [product]);

  if (!product) return <div className="p-20 text-center font-serif text-[#5D101D] animate-pulse">Loading Divine Grace...</div>;

  const isBracelet = product.category === "bracelet";
  const isRudraksha = product.category === "rudraksha";
  const isPotli = product.category === "potli";

  const savings = product.originalPrice && product.price && product.originalPrice > product.price
    ? product.originalPrice - product.price
    : 0;

  const discount = savings > 0 ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-[#4A3728] pb-32 selection:bg-[#5D101D] selection:text-white">
      
      {/* TOAST NOTIFICATION */}
      {showAdded && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#1B2624] text-white px-8 py-3 rounded-full shadow-2xl z-50 animate-fadeInUp flex items-center gap-3 border border-white/20">
          <span className="bg-green-500 rounded-full p-1 text-xs">✓</span> Added to your sacred collection
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* IMAGE CAROUSEL */}
        <div className="relative group">
          <div className={`absolute -inset-4 rounded-[3rem] blur-2xl opacity-20 ${isRudraksha ? 'bg-orange-200' : 'bg-rose-200'}`} />
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50">
            <img
              src={product.images?.[currentImage]}
              alt={product.name}
              className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {product.images?.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setCurrentImage(p => p === 0 ? product.images.length - 1 : p - 1)} className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#5D101D] w-10 h-10 flex items-center justify-center">‹</button>
                <button onClick={() => setCurrentImage(p => (p + 1) % product.images.length)} className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#5D101D] w-10 h-10 flex items-center justify-center">›</button>
              </div>
            )}
          </div>
        </div>

        {/* CORE INFO */}
        <div className="space-y-8 lg:pt-6">
          <div className="space-y-4">
            <span className={`px-4 py-1 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase border ${isRudraksha ? 'border-orange-200 text-orange-700 bg-orange-50' : 'border-rose-200 text-rose-700 bg-rose-50'}`}>
              {isRudraksha ? `Ancient ${product.origin} Wisdom` : 'Divine Connection'}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#5D101D] leading-tight font-serif">
              {isRudraksha ? product.title : product.name}
            </h1>
            <p className="text-xl text-gray-600 font-light italic">
              {isRudraksha ? product.subtitle : `"${product.shortDescription}"`}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-[#8B0000]">
              {product.price ? `₹${product.price.toLocaleString()}` : "Call for Pricing"}
            </span>

            {savings > 0 && (
              <>
                <span className="text-xl line-through text-gray-400">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg text-sm">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              addToCart(product);
              setShowAdded(true);
              setTimeout(() => { setShowAdded(false); navigate("/cart"); }, 1500);
            }}
            className="w-full py-5 bg-[#5D101D] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
          >
            Add to Sacred Cart
          </button>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-[#E6BE8A]">✦</span> 100% Authentic
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-[#E6BE8A]">✦</span> Vedic Energized
            </div>
          </div>
        </div>
      </div>

      {/* ================= DETAILED CONTENT SECTION ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-12 space-y-20">
        
        {/* ---------------- RUDRAKSHA SPECIFIC UI ---------------- */}
        {isRudraksha && (
          <div className="space-y-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-orange-50 p-8 rounded-[2rem] text-center border border-orange-100 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-orange-800 font-bold mb-2">Faces</p>
                <p className="text-3xl font-bold text-orange-900">{product.mukhi} Mukhi</p>
              </div>
              <div className="bg-orange-50 p-8 rounded-[2rem] text-center border border-orange-100 shadow-sm md:col-span-2">
                <p className="text-xs uppercase tracking-widest text-orange-800 font-bold mb-2">Sacred Origin</p>
                <p className="text-3xl font-bold text-orange-900">{product.origin} Himalayan Forests</p>
              </div>
            </div>

            <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-[#5D101D] font-serif">About This Sacred Bead</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{product.about}</p>
            </section>

            <section className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#5D101D] font-serif">Divine Benefits</h2>
                <ul className="space-y-4">
                  {product.benefits?.map((b, i) => (
                    <li key={i} className="flex gap-4 items-start text-gray-700">
                      <span className="bg-orange-100 text-orange-700 p-1 rounded-full text-xs">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1B2624] p-10 rounded-[3rem] text-white">
                <h2 className="text-2xl font-bold mb-8 text-[#E6BE8A] font-serif">Product Assurance</h2>
                <div className="grid grid-cols-1 gap-4">
                  {product.icons?.map((icon, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <span className="text-green-400">✦</span>
                      <span className="text-sm font-medium tracking-wide">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------- BRACELET SPECIFIC UI ---------------- */}
        {isBracelet && (
          <div className="space-y-20">
            <section className="text-center max-w-3xl mx-auto space-y-6">
              <div className="text-[#E6BE8A] text-2xl">✧ ✧ ✧</div>
              <p className="text-gray-700 leading-relaxed text-2xl font-light italic">
                {product.description || product.fullDescription}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-12">
              <section className="bg-white p-10 rounded-[3rem] shadow-lg border border-gray-50">
                <h2 className="text-2xl font-bold mb-8 text-[#5D101D] border-b pb-4">Spiritual Symbolism</h2>
                <ul className="space-y-4">
                  {product.symbolism?.map((s, i) => (
                    <li key={i} className="flex gap-4 items-center text-gray-700">
                      <span className="text-[#B27D62]">✦</span> {s}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-rose-500">♥</span> The Appeal
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {product.benefitsAppeal?.map((b, i) => (
                      <span key={i} className="px-4 py-2 bg-rose-50 text-rose-800 rounded-xl text-sm border border-rose-100">{b}</span>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-emerald-500">♥</span> The Healing
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {product.benefitsHealing?.map((b, i) => (
                      <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-sm border border-emerald-100">{b}</span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- POTLI SPECIFIC UI ---------------- */}
        {isPotli && (
          <div className="space-y-20">
            <section className="text-center max-w-3xl mx-auto space-y-6">
              <div className="text-[#E6BE8A] text-2xl">✧ ✧ ✧</div>
              <p className="text-gray-700 leading-relaxed text-xl font-light">
                {product.description}
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-white p-10 rounded-[3rem] shadow-lg border border-gray-50">
                <h2 className="text-2xl font-bold mb-8 text-[#5D101D] border-b pb-4">Key Features</h2>
                <ul className="space-y-4">
                  {product.symbolism?.map((item, i) => (
                    <li key={i} className="flex gap-4 items-center text-gray-700">
                      <span className="text-[#B27D62]">✦</span> {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white p-10 rounded-[3rem] shadow-lg border border-gray-50">
                <h2 className="text-2xl font-bold mb-8 text-[#5D101D] border-b pb-4">Who Is It For?</h2>
                <ul className="space-y-4">
                  {product.whoIsItFor?.map((item, i) => (
                    <li key={i} className="flex gap-4 items-center text-gray-700">
                      <span className="text-[#B27D62]">✦</span> {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="bg-white p-10 rounded-[3rem] shadow-lg border border-gray-50">
              <h2 className="text-2xl font-bold mb-8 text-[#5D101D] border-b pb-4">Benefits</h2>
              <ul className="space-y-4">
                {product.benefits?.map((item, i) => (
                  <li key={i} className="flex gap-4 items-center text-gray-700">
                    <span className="text-[#B27D62]">✦</span> {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* ---------------- UNIVERSAL RITUAL BOX ---------------- */}
        {isBracelet &&
          product.ritual &&
          (product.ritual.energized ||
            product.ritual.wearDay ||
            product.ritual.wearHand ||
            product.ritual.hand ||
            product.ritual.instruction) && (
            <section className="relative overflow-hidden bg-gradient-to-br from-[#5D101D] to-[#3D0A13] text-white p-12 rounded-[4rem] shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 font-serif text-[#E6BE8A]">Ritual & Activation</h2>
                  {product.ritual?.energized && (
                    <p className="text-lg text-rose-100 font-light leading-relaxed">{product.ritual.energized}</p>
                  )}
                </div>
                <div className="space-y-4 bg-black/20 p-8 rounded-3xl border border-white/10">
                  {product.ritual?.wearDay && (
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-rose-200">Auspicious Day:</span>
                      <span className="font-bold">{product.ritual.wearDay}</span>
                    </div>
                  )}
                  {(product.ritual?.wearHand || product.ritual?.hand) && (
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-rose-200">Hand/Side:</span>
                      <span className="font-bold">{product.ritual.wearHand || product.ritual.hand}</span>
                    </div>
                  )}
                  {product.ritual?.instruction && (
                    <p className="italic text-sm text-center pt-2 text-rose-200">"{product.ritual.instruction}"</p>
                  )}
                </div>
              </div>
            </section>
          )}

        {/* ---------------- FOOTER SECTION ---------------- */}
        <footer className="text-center py-20 border-t border-gray-100">
          <h2 className="text-4xl font-serif italic text-[#5D101D] mb-6">"{product.footerQuote}"</h2>
          <p className="text-gray-500 max-w-2xl mx-auto uppercase tracking-widest text-xs leading-loose">{product.footerNote}</p>
        </footer>

      </div>
    </div>
  );
}

export default ProductDetails;