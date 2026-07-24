import { useEffect, useState } from "react";

/* ---------------- MEDIA SLIDER ---------------- */

const mediaImages = [
  { src: "/images/media/media-1.jpeg", caption: "National Television Appearance" },
  { src: "/images/media/media-2.jpeg", caption: "Expert Panel Discussion" },
  { src: "/images/media/media-3.jpeg", caption: "News Studio Session" },
  { src: "/images/media/media-4.jpeg", caption: "Political Analysis Program" },
  { src: "/images/media/media-5.jpeg", caption: "Live Broadcast Session" },
  { src: "/images/media/media-6.jpeg", caption: "Studio Interaction" },
];

function MediaSlider() {
  const imagesPerSlide = 2;
  const totalSlides = Math.ceil(mediaImages.length / imagesPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            className="min-w-full grid grid-cols-2 gap-6 px-2"
          >
            {mediaImages
              .slice(
                slideIndex * imagesPerSlide,
                slideIndex * imagesPerSlide + imagesPerSlide
              )
              .map((item, index) => (
                <div key={index}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80 object-cover rounded-md border border-[#606C33]/30"
                  />
                  <p className="mt-2 text-xs font-['Poppins'] text-[#1B2624]/70">
                    {item.caption}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              currentSlide === index
                ? "bg-[#BC6C25]"
                : "bg-[#606C33]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- AWARDS CAROUSEL ---------------- */

function AwardsCarousel() {
  const images = [
    "/images/award-1.jpeg",
    "/images/award-2.jpeg",
    "/images/award-3.jpeg",
    "/images/award-4.jpeg",
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, images.length]);

  return (
    <div
      className="relative w-full h-100 md:h-120 overflow-hidden rounded-md border border-[#606C33]/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => setPaused(!paused)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Award Recognition"
            className="min-w-full h-full object-cover"
          />
        ))}
      </div>

      {paused && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-xs font-['Poppins']">
            Paused
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

function AwardsTimeline() {
  return (
    <>
      {/* ================= AWARDS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-14 max-w-3xl">
            <h2 className="text-5xl font-bold font-['Playfair_Display'] text-[#1B2624]">
              Awards & Media Presence
            </h2>
            <p className="mt-4 font-['Poppins'] text-[#1B2624]/80">
              Recognitions and public appearances that reflect years of disciplined
              practice, research-driven interpretation, and professional trust.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

            {/* Timeline */}
            <div className="relative border-l border-[#606C33]/50 pl-8 space-y-10">
              {[
                { year: "2025", title: "Jyotish Gaurav Samman", place: "Uttarakhand, India" },
                { year: "2024", title: "Yuva Yodha Award", place: "National Akali Dal, India" },
                { year: "2023", title: "Innovative Youth Icon Award", place: "House of Lords, London, UK" },
                { year: "2023", title: "Bharat Gaurav Samman", place: "Times Square, New York, USA" },
                { year: "2022", title: "Bharat Gaurav Samman", place: "House of Lords, London, UK" },
              ].map((item, index) => (
                <div key={index}>
                  <span className="text-sm font-bold font-['Poppins'] text-[#BC6C25]">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-['Playfair_Display'] font-bold text-[#1B2624]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-['Poppins'] text-[#1B2624]/70">
                    {item.place}
                  </p>
                </div>
              ))}
            </div>

            {/* Awards Carousel */}
            <div>
              <AwardsCarousel />
              <p className="mt-6 text-sm font-['Poppins'] text-[#1B2624]/70">
                Selected recognitions from national and international institutions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MEDIA PRESENCE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

            <MediaSlider />

            <div>
              <h3 className="text-2xl md:text-5xl font-bold font-['Playfair_Display'] text-[#BC6C25] mb-6">
                Media Presence & Public Discourse
              </h3>

              <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed mb-8">
                <span className="font-bold">Acharaya Dr. Savvy Singh</span> has been a regular
                presence on national television and international platforms.
              </p>

              <ul className="space-y-4 font-bold font-['Poppins'] text-[#1B2624]/85">
                <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>Zee Media</li>
                <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>NDTV इंडिया</li>
                <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>NDTV 24*7</li>
                <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>Network 10</li>
                <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>News Nation</li>
                 <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>Zee Rajasthan</li>
                  <li className="flex gap-3"><span className="mt-2 w-2 h-2 bg-[#18322d] rounded-full"></span>India News</li>
             
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default AwardsTimeline;
