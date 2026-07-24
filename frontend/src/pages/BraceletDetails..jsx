import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    api.get(`/api/shop/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!product || !product.images) return;
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [product]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const savings = product.originalPrice - product.price;

  return (
    <div className="relative min-h-screen bg-[#FFFBF7] text-[#4A3728] pb-32 overflow-hidden selection:bg-[#5D101D] selection:text-white">
      
      {/* ADDED NOTIFICATION */}
      {showAdded && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1B2624] text-white px-6 py-3 rounded-full shadow-xl text-sm animate-fadeIn">
          ✅ Added to cart
        </div>
      )}

      {/* DIVINE BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5D101D]/5 blur-[120px] rounded-full" />
      </div>

      {/* FLOATING HEARTS ANIMATION */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="absolute bottom-[-20px] text-[#E6BE8A]/40 animate-floatHeart opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              fontSize: `${12 + Math.random() * 20}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* ================= HERO SECTION ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 lg:pt-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* CAROUSEL WITH GLOW */}
          <div className="relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-radial-gradient from-[#FFD700]/10 to-transparent rounded-full blur-2xl animate-pulse" />
            
            <div className="relative animate-fadeInUp">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4AF37] via-[#FFD700] to-[#E6BE8A] rounded-[2.5rem] blur opacity-20" />
              
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                <img
                  src={product.images?.[currentImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
                />

                <button
                  onClick={() => setCurrentImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-[#5D101D] w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center text-2xl"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentImage(prev => (prev + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-[#5D101D] w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center text-2xl"
                >
                  ›
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {product.images?.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${
                        currentImage === i ? "w-8 bg-[#5D101D]" : "w-2 bg-[#E6BE8A]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-center mt-4 text-xs tracking-widest uppercase text-[#8A6D5A] font-medium">
                ✨ {product.ritual?.energized || "Blessed & Energised"} ✨
              </p>
            </div>
          </div>

          {/* INFO SIDE */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full border border-[#B27D62]/30 text-[10px] tracking-[0.2em] uppercase text-[#B27D62] font-semibold">
                Divine Connection
              </span>
              <h1 className="text-5xl md:text-6xl font-bold italic text-[#5D101D] leading-tight font-['Noto_Serif_Devanagari']">
                {product.name}
              </h1>
            </div>

            <p className="text-xl italic text-gray-700 leading-relaxed font-light">
              "{product.shortDescription}"
            </p>

            {/* Price Card */}
            <div className="relative mt-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="px-6 py-1.5 rounded-full bg-[#FFF1DC] border border-[#E6BE8A] shadow-[0_0_25px_rgba(230,190,138,0.45)]">
                  <p className="text-xs tracking-wide font-semibold text-[#5D101D]">
                    Become a part of our cosmic family
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFF4EC] to-white p-6 border border-[#E6BE8A]/30">
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-bold text-[#8B0000]">₹{product.price}</span>
                  <div className="flex flex-col">
                    <span className="text-lg line-through text-gray-400">₹{product.originalPrice}</span>
                    <span className="text-[#5D101D] font-bold text-sm tracking-wide">
                      Flat {Math.round((savings / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 shadow-[0_0_18px_rgba(255,215,0,0.35)]">
                  <span className="text-sm font-semibold text-[#8B0000]">
                    You save ₹{savings}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  addToCart(product);
                  setShowAdded(true);
                  setTimeout(() => {
                    setShowAdded(false);
                    navigate("/cart");
                  }, 1200);
                }}
                className="group relative w-full py-5 rounded-full bg-[#5D101D] text-white text-xl font-semibold shadow-[0_10px_30px_rgba(93,16,29,0.3)] transition-all hover:translate-y-[-2px] active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Claim Your {product.name}
              </button>

              <div className="flex justify-center gap-8 text-xs font-bold tracking-widest uppercase text-[#B27D62]">
                <span className="flex items-center gap-2">✦ 7 Day Exchange</span>
                <span className="flex items-center gap-2">✦ Non-Returnable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT SECTIONS ================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mt-20 space-y-32">

        <section className="text-center max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center text-[#E6BE8A]">✧ ✧ ✧</div>
          <p className="text-xl leading-relaxed text-gray-700 font-light italic">
            {product.description}
          </p>
        </section>

        {/* Symbolism Card */}
        <section className="relative bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] shadow-xl border border-white/80">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#5D101D] text-white px-8 py-2 rounded-full text-sm tracking-widest font-bold">
            THE SYMBOLISM
          </div>
          <h3 className="text-3xl font-['Playfair_Display'] text-center text-[#5D101D] mb-8 font-bold">
            Sacred Meaning & Energy
          </h3>
          <ul className="grid md:grid-cols-2 gap-8 text-lg">
            {product.symbolism?.map((text, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-[#B27D62] mt-1">✧</span>
                <span className="text-gray-800">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits Section */}
        <section className="space-y-10">
          <div className="text-center">
            <h3 className="text-4xl font-['Playfair_Display'] text-[#5D101D] italic font-bold">
              Why Choose This {product.category}?
            </h3>
            <div className="w-24 h-px bg-[#E6BE8A] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-sm tracking-[0.2em] font-bold text-[#B27D62] uppercase">The Appeal</h4>
              <ul className="space-y-4">
                {product.benefitsAppeal?.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg border-b border-[#E6BE8A]/10 pb-2">
                    <span className="text-[#8B0000]">♥</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm tracking-[0.2em] font-bold text-[#B27D62] uppercase">The Healing</h4>
              <ul className="space-y-4">
                {product.benefitsHealing?.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg border-b border-[#E6BE8A]/10 pb-2">
                    <span className="text-[#8B0000]">♥</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ritual Section */}
        <section className="bg-gradient-to-br from-[#5D101D] to-[#3D0A13] text-[#FFFBF7] p-8 rounded-[4rem] text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
          <h3 className="text-4xl font-['Playfair_Display'] mb-10 italic relative z-10">
            When and How to Wear
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-lg relative z-10 font-light italic">
            <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <p>{product.ritual?.energized}</p>
              <p>Best worn on: <span className="text-[#E6BE8A] font-bold">{product.ritual?.wearDay}</span></p>
            </div>
            <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <p>{product.ritual?.instruction}</p>
              <p>Wear on the: <span className="text-[#E6BE8A] font-bold underline underline-offset-8">{product.ritual?.wearHand}</span></p>
            </div>
          </div>
        </section>

        {/* Who Is This Perfect For? */}
        <section className="text-center space-y-8">
          <h3 className="text-3xl font-['Playfair_Display'] text-[#5D101D] font-bold">Who Is This Perfect For?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {product.whoIsItFor?.map((tag, i) => (
              <span key={i} className="px-6 py-2 rounded-full border border-[#B27D62]/30 text-[#B27D62] text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <footer className="text-center space-y-6 border-t border-[#E6BE8A]/40 pt-10">
          <p className="text-4xl font-['Playfair_Display'] italic text-[#5D101D] font-bold">
            {product.footerQuote}
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-xs font-bold">
            {product.footerNote}
          </p>
        </footer>
      </div>

      {/* MOBILE STICKY BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-[#E6BE8A]/30 p-4 lg:hidden z-50">
        <button
          onClick={() => {
            addToCart(product);
            setShowAdded(true);
            setTimeout(() => setShowAdded(false), 2000);
          }}
          className="w-full py-4 rounded-full bg-[#5D101D] text-white font-bold shadow-lg flex justify-between px-8 items-center"
        >
          <span>Claim Yours Now</span>
          <span className="text-lg">₹{product.price}</span>
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;