function HomeAbout() {
  return (
    <section className="relative bg-[#fbf8f5] py-10">
      
      {/* Soft Background Accent */}
      <div className="absolute inset-0 bg-[#DDA158]/10"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm font-['Poppins'] tracking-wide text-[#4d794b] mb-3">
            About the Astrologer
          </p>

          <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-[#1e3934] leading-tight">
            A Career Rooted in Knowledge, <br />
            Recognised Across the Globe
          </h2>

          <div className="mt-4 h-px w-20 bg-[#606C33]/60"></div>

          <p className="mt-6 font-['Poppins'] text-[#1B2624]/85 leading-relaxed max-w-xl">
             Acharaya Dr.Savvy Singh, widely known as{" "}
            <strong>Astro Vaastu Savvy</strong>, is a renowned celebrity
            astrologer and medal-winning scientific vastu expert with over
            six years of professional practice.
          </p>

          <p className="mt-4 font-['Poppins'] text-[#1B2624]/85 leading-relaxed max-w-xl">
            Her work has been recognised through multiple national and
            international honours, extensive media presence, and a trusted
            global clientele spanning India, Europe, North America, and the
            Middle East.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="/about"
              className="inline-block border font-bold border-[#606C33] px-6 py-3 rounded-md text-sm font-['Poppins'] text-[#1B2624] hover:bg-[#606C33] hover:text-white transition"
            >
              Read Full Profile
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">

         {/* Image – Editorial Circular Style */}
<div className="flex justify-center">
  <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">

    {/* Organic Background Shape 1 */}
    <div className="absolute w-64 h-64 bg-[#DDA158]/35 rounded-full -top-6 -left-15"></div>

    {/* Organic Background Shape 2 */}
    <div className="absolute w-52 h-52 bg-[#606C33]/20 rounded-full bottom-0 -right-10"></div>

    
    {/* Main Circular Image */}
    <img
      src="/images/astro-savvy-main-4.jpeg"
      alt="Astro Vaastu Savvy"
      className="relative z-10 w-100 h-100 md:w-64 md:h-90 object-cover rounded-full border border-[#606C33]/40 bg-[#F5EBE0]"
    />
  </div>
</div>


         
        </div>

      </div>
    </section>
  );
}

export default HomeAbout;
