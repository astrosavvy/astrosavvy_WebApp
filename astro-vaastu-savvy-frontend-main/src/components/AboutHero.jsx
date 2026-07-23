import { useEffect, useState } from "react";

const images = [
  "/images/award-1.jpeg",
  "/images/award-5.jpeg",
  "/images/award-6.jpeg",
  "/images/award-4.jpeg",
];

function AboutHero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-0 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold font-['Playfair_Display'] text-[#112e29] leading-tight">
  Meet <span className="highlight">Astro Vaastu Savvy</span>
</h1>

<p className="mt-4 text-lg md:text-xl text-[#4a6b66] max-w-xl">
  Blending Ancient Astrology with Scientific Vaastu
</p>


          <div className="h-1 w-24 bg-gradient-to-r from-[#BC6C25] to-[#DDA158] rounded-full"></div>

           <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed max-w-xl">
          <strong>Acharaya Dr. Savvy Singh</strong>, popularly known as{" "}
          <strong>Astro Vaastu Savvy</strong>, is a renowned celebrity astrologer,
          medal-winning scientific vastu expert, and space strategist. Her
          growing social media presence and authentic practice have made her a
          trusted name among individuals, professionals, and public figures.
        </p>

        <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed max-w-xl">
          With over <strong>six years of professional experience</strong> and
          qualifications from esteemed institutions, she blends traditional
          astrological wisdom with scientific vastu principles to deliver
          practical, ethical, and result-oriented guidance.
        </p>

        <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed max-w-xl">
          Her work spans across <strong>India, Dubai, the United States, the
          United Kingdom, Finland, Estonia, and Canada</strong>, supported by a
          strong and loyal global client base. She has also been featured on
          multiple national and international forums and has received numerous
          awards and accolades for her contributions.
        </p>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            {[
              "Celebrity Astrologer",
              "6+ Years Experience",
              "Global Clientele",
              "Award Winner",
              "Media Featured",
              "Ethical Guidance",
            ].map((item, i) => (
             <div
  key={i}
  className="px-4 py-2 text-[#1B2624] rounded-lg bg-white/60 backdrop-blur-md shadow-sm text-sm font-medium"
>
  <span className="text-[#BC6C25] mr-1">✦</span> {item}
</div>
            ))}
          </div>
        </div>

        {/* RIGHT CAROUSEL */}
        <div
          className="relative flex justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-72 sm:w-80 md:w-96 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Astro Vaastu Savvy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000
                  ${index === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105"}
                `}
              />
            ))}

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            {/* BADGE */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold">
              Astro Vaastu Savvy
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutHero;


