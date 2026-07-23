function Services() {
  return (
    <section className="bg-[white]">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

      {/* 1. INTRO TO SERVICES */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

  {/* TEXT CONTENT */}
  <div>
    <h1 className="text-5xl font-bold md:text-5xl font-['Playfair_Display'] text-[#1B2624]  leading-tight">
      Professional Astrology & Vastu Services
    </h1>

    {/* Decorative Line */}
    <div className="mt-4 h-px w-24 bg-[#606C33]/60"></div>

    <p className="mt-6 font-['Poppins'] text-[#1B2624]/85 leading-relaxed max-w-xl">
      The services offered by  <span className="font-bold">Acharaya Dr. Savvy Singh</span> are rooted in classical
      astrological and vastu sciences, interpreted through a modern,
      logical, and ethical framework.
    </p>

    <p className="mt-4 font-['Poppins'] text-[#1B2624]/80 leading-relaxed max-w-xl">
      Her approach is structured, analytical, and focused on long-term
      clarity, balance, and sustainable transformation rather than
      temporary relief.
    </p>
  </div>

  {/* IMAGE COMPOSITION */}
<div className="flex justify-center md:justify-end">
  <div className="relative w-[250px] md:w-[300px] h-[400px]">

    {/* BACKGROUND IMAGE (VISIBLE FIXED) */}
    <img
      src="/images/bg-1.png"
      alt="Background texture"
      className="absolute -top-5 -left-43 w-full h-full object-cover rounded-t-full opacity-50 z-0"
    />

    {/* SOFT COLOR WASH */}
    <div className="absolute inset-0 bg-[#606C33]/10 rounded-t-full z-10"></div>

    {/* SHADOW LAYER */}
    <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#DDA158]/25 rounded-t-full z-20"></div>

    {/* MAIN IMAGE */}
    <img
      src="/images/astro-savvy-main-5.jpeg"
      alt="Astrology & Vastu Services"
      className="absolute inset-0 w-full h-full object-cover rounded-t-full border border-[#606C33]/40 bg-[#F5EBE0] z-30"
    />

  </div>
</div>


</div>


        {/* 2. DETAILED SERVICE EXPLANATION */}
<div>
  <h2 className="text-5xl font-bold md:text-5xl text-center font-['Playfair_Display'] text-[#BC6C25]  mb-12">
    Areas of Practice
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

    {[
      {
        title: "Astro Vastu Consultation & Scientific Space Strategy",
        desc:
          "Aligning homes and workplaces with vastu principles and planetary energies to restore balance and prosperity.",
        img: "/images/Astro-1.png",
        icon: "/icons/astrology.png",
      },
      {
        title: "Birth Chart Analysis",
        desc:
          "In-depth kundali analysis to understand life patterns, career direction, relationships, and timing.",
        img: "/images/Astro-2.png",
        icon: "/icons/moon.png",
      },
      {
        title: "Numerology & Name Analysis",
        desc:
          "Decoding numerical vibrations of names and dates to improve alignment and decision-making.",
        img: "/images/name-analysis.png",
        icon: "/icons/mystery.png",
      },
      {
        title: "Astro Palmistry",
        desc: "Looking beyond just the lines to understand your karmic blueprints, helping you navigate life's challenges",
        img: "/images/Astro-4.png",
        icon: "/icons/chiromancy.png",
      },
    ].map((service, index) => (
      <div
        key={index}
        className="group relative bg-[#F5EBE0] border border-[#606C33]/35 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-70 overflow-hidden">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-700"
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-[#1B2624]/10"></div>
        </div>

        {/* Content */}
        <div className="relative p-6">

          {/* Floating Icon */}
          <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-[#DDA158] flex items-center justify-center shadow-md">
            <img src={service.icon} alt="" className="w-6 h-6" />
          </div>

          <h3 className="mt-6 font-['Playfair_Display'] text-lg text-[#1B2624] mb-3">
            {service.title}
          </h3>

          <div className="h-px w-12 bg-[#606C33]/50 mb-3"></div>

          <p className="text-sm font-['Poppins'] text-[#1B2624]/75 leading-relaxed">
            {service.desc}
          </p>
        </div>

        {/* Subtle hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-[#DDA158]/10 to-transparent"></div>
      </div>
    ))}
  </div>
</div>

{/* 2.5 KUNDLI ANALYSIS – PAID SERVICE */}
{/* 2.5 KUNDLI ANALYSIS – PAID SERVICE */}
<section className="relative pt-5 pb-5 bg-[#F5EBE0]">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

      {/* LEFT – CONTENT */}
      <div>

        <h2 className="text-5xl md:text-5xl font-bold font-['Playfair_Display'] text-[#BC6C25] mb-4">
          Bhagya Kundali
        </h2>

        <div className="h-px w-24 bg-[#BC6C25]/70 mb-6"></div>

        <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed mb-6 max-w-xl">
          A deeply personalised, paid consultation where your birth chart is
          analysed using classical astrological methods.
        </p>

        <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed mb-6 max-w-xl">
          Your kundli is studied in detail through planetary positions,
          nakshatras, dashas, yogas, and karmic indicators to provide ethical,
          fear-free guidance aligned with your life’s direction.
        </p>

       <ul className="space-y-3 font-['Poppins'] text-sm text-[#1B2624]/80 mb-8">
  <li>• Personalised 10 year kundali prediction</li>
  <li>• Career & Business Analysis</li>
  <li>• Love & Marriage Analysis</li>
  <li>• Financial Guidance Analysis</li>
  <li>• Health Analysis</li>
  <li>• Accurate timing of opportunities & challenges</li>
  <li>• Remedies focused on balance, not fear</li>
  <li>• Personally analysed by Acharya Dr. Savvy Singh</li>
</ul>

        <div className="inline-block text-xs font-['Poppins'] text-[#606C33]
                        border border-[#606C33]/30 rounded-full px-4 py-1">
          Confidential • Paid Consultation
        </div>

      </div>

      {/* RIGHT – FEATURE CARD */}
      <div className="flex justify-center md:justify-end self-start">

        <div className="group relative bg-[#FDF8F3] border border-[#606C33]/30
                        rounded-3xl p-9 w-full max-w-sm
                        transition-all duration-500
                        hover:-translate-y-2
                        hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]">

          {/* Soft glow */}
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full
                          bg-[#BC6C25]/15 blur-3xl opacity-0
                          group-hover:opacity-100 transition"></div>

          {/* Image */}
         <div className="relative mb-8 flex justify-center">

  {/* Soft aura ring */}
  <div className="absolute w-56 h-56 rounded-full 
                  bg-gradient-to-br from-[#BC6C25]/25 via-[#DDA158]/20 to-transparent 
                  blur-2xl"></div>

  {/* Image frame */}
  <div className="relative z-10 bg-[#FFF8F1] 
                  rounded-2xl p-5 
                  shadow-[0_18px_45px_rgba(0,0,0,0.25)]
                  ring-1 ring-[#BC6C25]/20">

    <img
      src="/images/kundli-illustration.jpeg"
      alt="Birth Chart Analysis"
      className="w-44 h-auto object-contain 
                 rounded-xl 
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
    />
  </div>

</div>


          <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#1B2624] mb-3 text-center">
           Book Your Bhagya Kundali 
          </h3>

          <div className="h-px w-16 bg-[#606C33]/50 mx-auto mb-4"></div>

          <p className="text-sm font-['Poppins'] text-[#1B2624]/80
                        leading-relaxed mb-6 text-center">
            Submit your birth details, complete payment, and receive a
            professionally analysed consultation with personalised guidance.
          </p>

          <a
            href="/kundli-analysis"
            className="block text-center bg-[#BC6C25] text-white
                       py-3 rounded-full font-['Poppins']
                       shadow-md hover:opacity-90 transition"
          >
            Pay & Submit Details
          </a>

       

        </div>
      </div>

    </div>
  </div>
</section>



      {/* 3. ACHIEVEMENTS & EXPERTISE */}
<div className="relative bg-[#DDA158]/25 rounded-3xl p-10 md:p-16 overflow-hidden">

  {/* Decorative background elements */}
  <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#606C33]/15 blur-3xl"></div>
  <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#BC6C25]/20 blur-3xl"></div>

  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

    {/* LEFT CONTENT */}
    <div>
      <h2 className="text-4xl md:text-4xl font-['Playfair_Display'] font-bold text-[#1B2624] mb-6">
        Expertise, Achievements & Professional Integrity
      </h2>

      <div className="h-px w-24 bg-[#606C33]/50 mb-6"></div>

      <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed mb-4 max-w-xl">
        With over six years of professional experience, Acharya Dr. Savvy Singh has
        built a trusted and diverse client base across India and internationally,
        including the United Kingdom, the United States, Dubai, Finland, Estonia,
        and Canada.
      </p>

      <p className="font-['Poppins'] text-[#1B2624]/85 leading-relaxed mb-10 max-w-xl">
        Her work has been recognised on multiple national and international
        platforms. She is known for her precise predictions, scientific vastu
        expertise, and a deeply ethical, client-centric approach.
      </p>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1  font-bold sm:grid-cols-2 gap-6">

        {[
          {
            title: "Celebrity Astrologer & Vastu Expert",
          
          },
          {
            title: "International Award Recipient",
        
          },
          {
            title: "Global Media Presence",
          
          },
          {
            title: "Ethical & Confidential Practice",
           
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group relative bg-[#F5EBE0] border border-[#606C33]/35
                       rounded-xl p-4 shadow-sm transition-all duration-500
                       hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Subtle hover wash */}
            <div className="absolute inset-0 rounded-xl
                            bg-gradient-to-br from-[#DDA158]/0 to-[#DDA158]/25
                            opacity-0 group-hover:opacity-100 transition duration-500"></div>

       

            {/* Text */}
            <p className="relative font-['Playfair_Display'] text-[#1B2624] leading-snug">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="flex justify-center md:justify-end">
      <div className="relative">

        {/* Shadow frame */}
        <div className="absolute inset-0 translate-x-3 translate-y-3
                        bg-[#606C33]/20 rounded-xl"></div>

        <img
          src="/images/celeb-2.jpeg"
          alt="Awards & Recognition"
          className="relative w-72 md:w-80 rounded-xl
                     border border-[#606C33]/40 bg-[#F5EBE0]
                     shadow-lg"
        />
      </div>
    </div>

  </div>
</div>



        {/* 4. CLIENT REVIEWS */}
        <div>

          <h2 className="text-3xl font-bold md:text-4xl font-['Playfair_Display'] text-[#1B2624]  mb-12">
            Client Stories & Testimonials
          </h2>

          <div className="space-y-12">

            {/* Review 1 */}
            <div className="border border-[#606C33]/35 rounded-2xl p-8 bg-[#F5EBE0] shadow-sm">
              <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
                I met Dr. Savvy Singh, Astro Vaastu Expert, at an event in London,
                UK, and was instantly drawn to her aura. She is young and vibrant,
                yet deeply learned and intuitive. What impressed me most was her
                knowledge of astrology, vastu, and numerology, and her genuine
                intent to provide individual-friendly solutions.
                <br /><br />
                During our very first consultation, she precisely identified
                the professional challenges I was facing. Her guidance over the
                years has helped me achieve my desired outcomes and strengthened
                my trust in her expertise.
              </p>

              <div className="mt-6">
                <p className="font-['Playfair_Display'] text-[#1B2624]">
                  Mrs. Ankita Gupta
                </p>
                <p className="text-sm font-['Poppins'] text-[#606C33]">
                  London, UK
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="border border-[#606C33]/35 rounded-2xl p-8 bg-[#F5EBE0] shadow-sm">
              <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
                Of the many astrologers I have consulted over the years, it is
                rare to find someone willing to walk the journey with you until
                results are achieved. Dr. Savvy Singh is a true example of
                dedication, patience, and persistence.
                <br /><br />
                Her precise vastu guidance helped me expand and stabilise my
                business. She does not merely consult, but continuously guides
                and monitors progress.
              </p>

              <div className="mt-6">
                <p className="font-['Playfair_Display'] text-[#1B2624]">
                  Rajesh Rastogi
                </p>
                <p className="text-sm font-['Poppins'] text-[#606C33]">
                  Delhi, India
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="border border-[#606C33]/35 rounded-2xl p-8 bg-[#F5EBE0] shadow-sm">
              <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
                As a single mother, I was deeply concerned about my child’s
                future. I met Dr. Savvy Singh at a conference in the US and was
                moved by her insights into numerology and how names and numbers
                influence life paths.
                <br /><br />
                Her guidance resonated deeply, and the suggested name changes
                helped my son gain clarity and focus. Today, he is studying
                Medicine at a renowned university in the US, and I remain
                immensely grateful for her support.
              </p>

              <div className="mt-6">
                <p className="font-['Playfair_Display'] text-[#1B2624]">
                  Mrs. Richa
                </p>
                <p className="text-sm font-['Poppins'] text-[#606C33]">
                  USA
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;
