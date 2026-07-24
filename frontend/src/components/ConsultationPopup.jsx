import { useEffect, useState } from "react";

function ConsultationPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  if (!visible) return null;
const blockedRoutes = ["/kundli-analysis", "/checkout","/shop","/services","/shop/rudraksha","/shop/bracelets","/potli/6995bdeaad02b5bb4201238c"];

if (blockedRoutes.includes(location.pathname)) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
      <div className="relative bg-[#FFF8F1] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#BC6C25]/40">

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 text-[#1B2624]/70 hover:text-[#1B2624]"
        >
          ✕
        </button>

        {/* Kundli Image */}
     {/* Kundli Image */}
<div className="w-full flex justify-center">
  <div className="w-60 h-96 flex items-center justify-center overflow-hidden">
    <img
      src="/images/kundli-illustration.jpeg"
      alt="Bhagya Kundli Analysis"
      className="w-full h-full object-cover object-center"
    />
  </div>
</div>




        {/* Content */}                         
        <div className="p-6 text-center">
          <h3 className="text-2xl font-['Playfair_Display'] text-[#1B2624] mb-3">
            Discover Your Bhagya Kundli
          </h3>

          {/* CTA */}
          <a
            href="/kundli-analysis"
            className="inline-block w-full bg-[#BC6C25] text-white py-3 rounded-full font-['Poppins'] text-sm shadow-md hover:opacity-90 transition"
          >
            View My Bhagya Kundli
          </a>

          <p className="mt-4 text-xs font-['Poppins'] text-[#1B2624]/60">
            Accurate • Personalized • Trusted by Thousands
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConsultationPopup;
