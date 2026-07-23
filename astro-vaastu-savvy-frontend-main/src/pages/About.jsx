import AboutHero from "../components/AboutHero";
import MediaSlider from "../components/MediaSlider";


function About() {
  return (
    <section className="bg-[white]">
      <div className="max-w-7xl mx-auto px-6 py-2 space-y-0">

       {/* 1. HERO INTRO */}
      <AboutHero />
      

{/* ================= AWARDS & RECOGNITIONS ================= */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    {/* Header */}
    <div className="mb-10">
      <h2 className="text-5xl font-bold font-['Playfair_Display'] text-[#1B2624]">
        Awards & Recognitions
      </h2>
      <div className="mt-3 h-[2px] w-14 bg-[#BC6C25]"></div>
      <p className="mt-4 max-w-2xl text-sm font-['Poppins'] text-[#1B2624]/75">
        Due to her precise predictions and achievements at a young age, she has
        been honoured with several prestigious national and international awards.
      </p>
    </div>

    {/* Timeline Wrapper */}
    <div className="relative">

      {/* Center Line (Desktop only) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#606C33]/30 hidden md:block"></div>

      <div className="space-y-14">
        {[
          { year: "2025", title: "Jyotish Gaurav Samman", place: "Uttarakhand, India", img: "/images/award-11.jpeg" },
          { year: "2024", title: "Yuva Yodha Award", place: "National Akali Dal, India", img: "/images/award-12.jpeg" },
          { year: "2023", title: "Innovative Youth Icon Award", place: "House of Lords, London, UK", img: "/images/award-3.jpeg" },
          { year: "2023", title: "Bharat Gaurav Samman", place: "Times Square, New York, USA", img: "/images/award-2.jpeg" },
          { year: "2023", title: "Jyotish Ratna Award", place: "India", img: "/images/celeb-3.jpeg" },
          { year: "2022", title: "Bharat Gaurav Samman", place: "House of Lords, London, UK", img: "/images/award-10.jpeg" },
          { year: "2022", title: "Special Guest – ERAS Festival", place: "Oslo, Norway", img: "/images/award-14.jpeg" },
          { year: "2022", title: "Voice of Nation Award", place: "National Akali Dal, India", img: "/images/award-8.jpeg" },
          { year: "2021", title: "Indian Culture Promoter & Awareness Influencer", place: "Zürich, Switzerland", img: "/images/award-5.jpeg" },
          { year: "2021", title: "Bharat Vikas Ratan", place: "All India Business Development Association", img: "/images/award-6.jpeg" },
          { year: "2019", title: "12th National Women Ecxellence Award", place: "", img: "/images/award-13.jpeg" },
              { year: "2021", title: "Prominent Personality Award", place: "", img: "/images/award-1.jpeg" },
               { year: "2024", title: "Special Guest at India Week", place: "London, UK", img: "/images/award-15.jpeg" },
              
        ].map((award, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className="relative">

              {/* ================= MOBILE CARD ================= */}
              <div className="md:hidden bg-[#F5EBE0]/40 rounded-xl p-4 shadow-sm">
                <img
                  src={award.img}
                  alt={award.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <p className="text-xs font-bold text-[#606C33]">{award.year}</p>
                <h3 className="font-['Playfair_Display'] font-bold text-[#1B2624]">
                  {award.title}
                </h3>
                <p className="text-sm font-['Poppins'] text-[#1B2624]/70">
                  {award.place}
                </p>
              </div>

              {/* ================= DESKTOP TIMELINE ================= */}
              <div className="hidden md:flex items-center">

                {/* Center Dot */}
                <span className="absolute left-1/2 top-6 -translate-x-1/2
                                 w-3 h-3 rounded-full bg-[#BC6C25]
                                 ring-4 ring-[#F5EBE0] z-10" />

                {/* Left Image */}
                {isLeft && (
                  <div className="w-1/2 flex justify-end pr-20">
                    <img
                      src={award.img}
                      alt={award.title}
                      className="w-72 h-56 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}

                {/* Text */}
               <div
  className={`w-1/2 flex ${
    isLeft ? "justify-end   pr-10 -mr-6 text-right" : "justify-start pl-10 text-left"
  }`}
>
  <div className="w-[22rem]">
    <p className="text-xs font-bold text-[#606C33]">
      {award.year}
    </p>

    <h3 className="font-['Playfair_Display'] font-bold text-2xl text-[#1B2624] leading-snug">
      {award.title}
    </h3>

    <p className="text-sm font-['Poppins'] text-[#1B2624]/70">
      {award.place}
    </p>
  </div>
</div>


                {/* Right Image */}
                {!isLeft && (
                  <div className="w-1/2 flex justify-start pl-20">
                    <img
                      src={award.img}
                      alt={award.title}
                      className="w-72 h-56 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

{/* ================= MEDIA PRESENCE ================= */}
<section className="py-16 bg-[#FDF6EC]">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

    {/* LEFT CONTENT */}
    <div>
      <h2 className="text-5xl font-bold font-['Playfair_Display'] text-[#1B2624]">
        Media Presence
      </h2>
      <div className="mt-3 h-[1px] w-20 bg-[#BC6C25]"></div>

      <p className="mt-5 font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
        With her authentic skills, deep astrological knowledge, and precise
        political predictions, Acharya Dr. Savvvy Singh has become a recognised
        household name across India.
      </p>

      <p className="mt-4 font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
        She has appeared on leading national television networks including{" "}
        <strong>Zee Media</strong>, <strong>Sadhna TV</strong>,{" "}
        <strong>NDTV</strong>, <strong>Network 10</strong>, and many more.
      </p>

      <p className="mt-4 font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
        Her popular prediction-based show <strong>“2024 की कुंडली”</strong>, aired on{" "}
        <strong>JKL 24x7 News</strong> and <strong>Gulistan</strong>.
      </p>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-3">
        {[
          "Zee Media",
          "Sadhna TV",
          "NDTV",
          "Network 10",
          "JKL 24x7 News",
          "Gulistan",
          "News Nation",
          "India News",
          "NDTV 24x7 News",
          "NDTV इंडिया",
          "Zee Rajasthan"
        ].map((channel, i) => (
          <span
            key={i}
            className="px-4 py-1.5 text-sm rounded-full bg-white
                       border border-[#BC6C25]/30 text-[#1B2624] shadow-sm"
          >
            {channel}
          </span>
        ))}
      </div>
    </div>

    {/* RIGHT SLIDER */}
    <MediaSlider />
  </div>
</section>

     
{/* 3. AREAS OF PRACTICE */}
<div className="mt-18 px-4 max-w-7xl mx-auto">
  <div className="flex flex-col items-center mb-16">
    <h2 className="text-5xl font-bold md:text-5xl font-['Playfair_Display'] text-[#1B2624] text-center">
      Areas of Practice
    </h2>
    <div className="h-1 w-20 bg-[#BC6C25] mt-4 rounded-full"></div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      {
        img: "/images/space-consultation.png",
        title: "Astro Vastu Consultation & Scientific Space Strategy",
        desc: "Harmonising living and working spaces through traditional vastu principles aligned with planetary energies.",
      },
      {
        img: "/images/birth-chart-analysis.png",
        title: "Birth Chart Analysis",
        desc: "Detailed kundali interpretation focusing on career, relationships, education, and long-term life patterns.",
      },
      {
        img: "/images/name-analysis.png",
        title: "Numerology & Name Analysis",
        desc: "Understanding numerical vibrations of names and dates to guide decisions and personal alignment.",
      },
      {
        img: "/images/palmistry.jpeg",
        title: "Astro-Palmistry",
        desc: "Looking beyond just the lines to understand your karmic blueprints, helping you navigate life's challenges.",
      },
    ].map((item, index) => (
     <div 
  key={index}
  className="group relative p-8 rounded-xl bg-[#F5EBE0]
             border border-[#606C33]/30
             flex flex-col h-full overflow-hidden
             transition-all duration-500 ease-out
             hover:-translate-y-1
             hover:border-[#BC6C25]/45
             shadow-[0_6px_16px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.6)]
             hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
>

  {/* Soft aura glow */}
  <div className="pointer-events-none absolute inset-0 opacity-0 
                  group-hover:opacity-100 transition duration-700
                  bg-gradient-to-b from-[#BC6C25]/10 via-transparent to-transparent">
  </div>

  {/* Corner depth accent */}
  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full 
                  bg-[#000]/5 blur-2xl opacity-60">
  </div>

  <div className="relative z-10 flex flex-col h-full">

    {/* Image – same size, stronger depth */}
    <div className="mb-10 flex items-center justify-center h-50">
      <img 
        src={item.img} 
        alt={item.title} 
        className="w-50 h-50 object-contain
                   transition-transform duration-500
                   group-hover:scale-105
                   drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]"
      />
    </div>

    {/* Title */}
    <p className="font-['Playfair_Display'] text-[#BC6C25] 
                  font-bold text-xl mb-4 leading-tight">
      {item.title}
    </p>

    {/* Divider */}
    <div className="h-px w-12 bg-[#606C33]/35 mb-4
                    transition-all duration-500
                    group-hover:w-20 group-hover:bg-[#BC6C25]">
    </div>

    {/* Description */}
    <p className="text-sm font-['Poppins'] text-[#1B2624]/80 
                  leading-relaxed flex-grow">
      {item.desc}
    </p>

  </div>
</div>

    ))}
  </div>
</div>
        {/* GLOBAL PRESENCE & TRUST */}
<section className="py-14">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* LEFT – CONTENT */}
      <div>
        <h2 className="text-4xl md:text-4xl font-bold font-['Playfair_Display'] text-[#0f332c]">
          Global Presence & Trust
        </h2>

        <div className="mt-3 h-[2px] w-16 bg-[#BC6C25]"></div>

        <p className="mt-5 font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
          Acharya <strong>Dr. Savvvy Singh</strong> has built a strong and trusted
          client base across <strong>India, the United States, the United
          Kingdom, Dubai, Finland, Estonia, and Canada</strong>. Her work and
          insights have also been featured on prominent national and
          international television platforms.
        </p>

        {/* TRUST STATS */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { value: "6+", label: "Countries Served" },
            { value: "15+", label: "Awards & Honors" },
            { value: "National", label: "TV Presence" },
            { value: "Ethical", label: "Confidential Practice" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-md rounded-xl p-4 text-center shadow-sm"
            >
              <p className="text-xl font-bold text-[#BC6C25]">
                {item.value}
              </p>
              <p className="text-xs font-['Poppins'] text-[#1B2624]/70 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT – VISUAL */}
      <div className="relative">
        {/* Decorative Accent */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#BC6C25]/10 rounded-full"></div>

        <img
          src="/images/celeb-5.jpeg"
          alt="Global Presence"
          className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover"
        />

        {/* Caption */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md
                        px-4 py-2 rounded-full text-xs font-semibold text-[#1B2624] shadow-md">
          Trusted Across Borders
        </div>
      </div>

    </div>
  </div>
</section>


        {/* 5. CLOSING STATEMENT */}
        <div className="max-w-4xl border-t border-[#606C33]/40 pt-12">
          <p className="font-['Playfair_Display'] text-xl text-[#0e2722] leading-relaxed">
            “Together, we transform spaces and life paths with clarity,
            discipline, and harmony — guided by time-tested principles and
            thoughtful understanding.”
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;
