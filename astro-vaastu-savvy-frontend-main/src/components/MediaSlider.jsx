import { useEffect, useState } from "react";

function MediaSlider() {
  const images = [
    "/images/media/media-1.jpeg",
    "/images/media/media-10.jpeg",
    "/images/media/media-8.jpeg",
    "/images/media/media-9.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-md mx-auto">

      {/* IMAGE */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Media Appearance"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000
              ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
          />
        ))}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        {/* LABEL */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md
                        px-4 py-2 rounded-full text-xs font-semibold text-[#1B2624]">
          National Television Appearance
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition
              ${i === current ? "bg-[#BC6C25]" : "bg-[#BC6C25]/30"}
            `}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default MediaSlider;
