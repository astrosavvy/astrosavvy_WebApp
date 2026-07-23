import { useNavigate } from "react-router-dom";

function Shop() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#FFFBF7] text-[#4A3728] overflow-hidden">
      {/* Divine Background Auras */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFD700]/10 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5D101D]/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Subtle Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="relative z-10 px-6 py-10 lg:py-10">
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="flex justify-center items-center gap-4">
            <span className="h-px w-12 bg-[#B27D62]/40" />
            <span className="text-[11px] tracking-[0.5em] uppercase text-[#B27D62] font-semibold">
              Divine Collections
            </span>
            <span className="h-px w-12 bg-[#B27D62]/40" />
          </div>

          <h1 className="text-5xl md:text-6xl font-serif text-[#5D101D] font-bold leading-tight">
            Sacred Shop
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 font-light leading-relaxed">
            Lab-certified and spiritually energized creations aligned
            to support your highest growth and divine manifestation.
          </p>
        </div>

        {/* ================= INTENTION FILTER ================= */}
        <div className="max-w-6xl mx-auto mb-10 grid lg:grid-cols-3 gap-8 bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/60 shadow-sm">
          <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#E6BE8A]/30 pb-6 lg:pb-0 lg:pr-10">
            <h3 className="text-2xl font-serif text-[#5D101D] mb-3">
              Shop by Intention
            </h3>
            <p className="text-sm text-gray-500">
              Select a spiritual intention to discover aligned sacred tools.
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-wrap gap-3 items-center justify-center">
            {["Love & Healing", "Protection", "Wealth & Success", "Inner Peace", "Confidence"].map(
              (intent) => (
                <span
                  key={intent}
                  className="px-6 py-2 rounded-full border border-[#B27D62]/20 bg-white text-xs font-semibold text-[#B27D62] hover:bg-[#5D101D] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {intent}
                </span>
              )
            )}
          </div>
        </div>

        {/* ================= CATEGORY CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* BRACELETS */}
          <div
            onClick={() => navigate("/shop/bracelets")}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#FFD700]/20 to-[#5D101D]/10 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="relative bg-white/50 backdrop-blur-2xl rounded-[3.5rem] p-10 border border-white/60 shadow-xl transition-all duration-700 hover:-translate-y-2">
              <div className="relative h-64 mb-8 overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="/images/shop/panch-mukhi-rudradsha-2.jpeg"
                  alt="Sacred Bracelets"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#5D101D] text-[10px] px-4 py-1 rounded-full uppercase tracking-widest font-semibold border border-[#E6BE8A]/30">
                  Energized
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold text-[#5D101D] mb-3">
                Sacred Bracelets
              </h2>

              <p className="text-gray-600 text-base mb-8">
                Hand-knotted spiritual tools designed for daily intention,
                emotional alignment, and energetic protection.
              </p>

              <span className="text-[#B27D62] font-semibold text-xs uppercase tracking-[0.3em]">
                Explore Collection
              </span>
            </div>
          </div>

          {/* RUDRAKSHA */}
          <div
            onClick={() => navigate("/shop/rudraksha")}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#5D101D]/20 to-[#FFD700]/10 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="relative bg-white/50 backdrop-blur-2xl rounded-[3.5rem] p-10 border border-white/60 shadow-xl transition-all duration-700 hover:-translate-y-2">
              <div className="relative h-64 mb-8 overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="/images/rudraksha/gauri-1.jpeg"
                  alt="Holy Rudraksha"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#5D101D] text-[10px] px-4 py-1 rounded-full uppercase tracking-widest font-semibold border border-[#E6BE8A]/30">
                  Certified
                </div>
              </div>

              <h2 className="text-3xl font-serif font-bold text-[#5D101D] mb-3">
                Holy Rudraksha
              </h2>

              <p className="text-gray-600 text-base mb-8">
                Authentic lab-certified beads for spiritual growth,
                karmic cleansing, and divine protection.
              </p>

              <span className="text-[#B27D62] font-semibold text-xs uppercase tracking-[0.3em]">
                Explore Collection
              </span>
            </div>
          </div>
          {/* POTLI */}
<div
  onClick={() => navigate("/shop/potli")}
  className="group relative cursor-pointer"
>
  <div className="absolute -inset-2 bg-gradient-to-tr from-[#FFD700]/20 to-[#5D101D]/10 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

  <div className="relative bg-white/50 backdrop-blur-2xl rounded-[3.5rem] p-10 border border-white/60 shadow-xl transition-all duration-700 hover:-translate-y-2">
    <div className="relative h-64 mb-8 overflow-hidden rounded-[2rem] shadow-2xl">
     <img
  src="/images/potli/potli-3.jpeg"
  alt="Holi Special Potli"
  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
/>

      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#5D101D] text-[10px] px-4 py-1 rounded-full uppercase tracking-widest font-semibold border border-[#E6BE8A]/30">
        Holi Special
      </div>
    </div>

    <h2 className="text-3xl font-serif font-bold text-[#5D101D] mb-3">
      Sarvdosh Nivaran Potli
    </h2>

    <p className="text-gray-600 text-base mb-8">
      Specially energized Holashtak Potli designed to remove negativity,
      clear financial blockages, and restore harmony in your life.
    </p>

    <span className="text-[#B27D62] font-semibold text-xs uppercase tracking-[0.3em]">
      Explore Sacred Item
    </span>
  </div>
</div>

        </div>

        {/* ================= VEDIC PROMISE ================= */}
        <div className="mt-10 max-w-5xl mx-auto border-t border-[#E6BE8A]/30 pt-20 text-center">
          <h3 className="text-3xl font-serif text-[#5D101D] mb-4">
            The Vedic Promise
          </h3>

          <p className="text-gray-500 uppercase tracking-[0.3em] text-[11px] font-semibold mb-12">
            Consecrated with ancient rituals
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                roman: "I",
                title: "Astro-Aligned",
                desc: "Sourced during auspicious planetary alignments for maximum energetic resonance.",
              },
              {
                roman: "II",
                title: "Abhimantrit",
                desc: "Each piece undergoes Vedic consecration rituals before dispatch.",
              },
              {
                roman: "III",
                title: "Lab Certified",
                desc: "Government-approved certification ensuring authenticity.",
              },
            ].map((item) => (
              <div key={item.roman} className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full border border-[#E6BE8A]/30 flex items-center justify-center text-[#5D101D] font-serif text-lg">
                  {item.roman}
                </div>
                <h4 className="font-semibold uppercase tracking-widest text-[18px] text-[#5D101D]">
                  {item.title}
                </h4>
                <p className="text-lg text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
