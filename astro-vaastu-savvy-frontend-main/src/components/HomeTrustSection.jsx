import { Link } from "react-router-dom";

function HomeTrustSection() {
  return (
    <section className="bg-[white] py-20">
      <div className="max-w-7xl mx-auto px-6 ">

        {/* 1. WHY CHOOSE DR SAVVY */}
   {/* WHY CHOOSE DR SAVVY – Eternal, Calm, Premium */}
<section className="relative w-screen left-1/2 -translate-x-1/2 py-8 overflow-hidden bg-[#E3ECE6] ">

  {/* Subtle depth overlay (optional but recommended) */}
  <div className="absolute inset-0 "></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-10">
      <h2 className="text-5xl md:text-5xl font-['Playfair_Display'] 
                     text-[#1B2624] tracking-wide">
       <b> Why Choose Acharya Dr. Savvy Singh</b>
      </h2>
      <div className="mx-auto mt-6 h-px w-20 bg-[#DDA158]/60"></div>
    </div>

    {/* Cards */}
   {/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 perspective">

  {[
    {
      title: "Ethical Practice",
      desc: "No fear-based guidance. Every recommendation is ethical, practical, and confidential.",
      icon: "/icons/sign-1.png",
    },
    {
      title: "Accuracy & Precision",
      desc: "Predictions and remedies are rooted in deep analysis and disciplined methodology.",
      icon: "/icons/sign-2.png",
    },
    {
      title: "Long-Term Guidance",
      desc: "Focus on sustainable outcomes rather than instant or temporary fixes.",
      icon: "/icons/sign-3.png",
    },
    {
      title: "Global Trust",
      desc: "Trusted by clients across India, the UK, the US, Europe, and beyond.",
      icon: "/icons/sign-4.png",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="group relative bg-white
                 rounded-3xl p-8 text-center
                 border border-[#8FAF9A]/50
                 card-3d
                 shadow-[0_10px_25px_rgba(0,0,0,0.15),0_35px_80px_rgba(27,38,36,0.35)]
                 opacity-0
                 animate-[floatUp_0.9s_ease-out_forwards]"
      style={{ animationDelay: `${i * 120}ms` }}
    >

      {/* Icon */}
      <div className="mx-auto mb-6 flex items-center justify-center 
                      w-20 h-20 rounded-full 
                      bg-[#DDA158]/25
                      transform transition duration-500
                      group-hover:scale-110">
        <img src={item.icon} alt="" className="w-12 h-12" />
      </div>

      {/* Title */}
      <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#1B2624] mb-3">
        {item.title}
      </h3>

      {/* Divider */}
      <div className="mx-auto mb-4 h-px w-12 bg-[#606C33]/50
                      transition-all duration-500
                      group-hover:w-20 group-hover:bg-[#DDA158]">
      </div>

      {/* Description */}
      <p className="text-sm font-['Poppins'] text-[#1B2624]/75 leading-relaxed">
        {item.desc}
      </p>

      {/* Corner Logo */}
      <div className="absolute top-4 right-4 w-10 h-10 ">
        <img
          src="/images/astro-savvy-bgless.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

    </div>
  ))}

</div>

  </div>
</section>


       {/* 2. TESTIMONIALS PREVIEW */}


<div className="relative">

  {/* Soft Background Accent */}
<div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-[#DDA158]/10"></div>

  <div className="relative px-0 py-14">

    <h2 className="text-5xl font-bold md:text-5xl font-['Playfair_Display'] text-[#1B2624] font-bold mb-10 text-center">
      What Clients Say
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {[
        {
          text:
            "Her predictions during our first consultation were remarkably accurate. Over the years, her guidance has helped me achieve clarity and growth.",
          name: "Ankita Gupta",
          place: "London, UK",
        },
        {
          text:
            "Dr. Savvy Singh does not just consult; she walks alongside you until results are achieved. Her vastu guidance transformed my business.",
          name: "Rajesh Rastogi",
          place: "Delhi, India",
        },
        {
          text:
            "Her numerology insights helped my son gain clarity and focus. Today he is studying medicine, and I remain deeply grateful.",
          name: "Mrs. Richa",
          place: "USA",
        },
      ].map((t, i) => (
        <div
          key={i}
          className="group relative bg-[white] border border-[#606C33]/40 rounded-2xl p-8
                     transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >

          {/* Quote Mark */}
          <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full 
                          bg-[#BC6C25]/15 flex items-center justify-center
                          font-['Playfair_Display'] text-2xl text-[#BC6C25]">
            “
          </div>

          {/* Testimonial Text */}
          <p className="text-sm font-['Poppins'] text-[#1B2624]/80 leading-relaxed mb-6">
            {t.text}
          </p>

          {/* Divider */}
          <div className="h-px w-12 bg-[#606C33]/40 mb-4"></div>

          {/* Client Info */}
          <p className="font-['Playfair_Display'] font-bold text-[#1B2624]">
            {t.name}
          </p>
          <p className="text-xs font-['Poppins'] font-bold text-[#606C33]">
            {t.place}
          </p>
        </div>
      ))}
    </div>

    {/* Link */}
    <div className="mt-12 text-center">
      <Link
        to="/services"
        className="inline-block text-sm font-['Poppins'] text-[#a86020] 
                   underline underline-offset-4 hover:opacity-80 transition"
      >
        Read full client stories →
      </Link>
    </div>

  </div>
</div>

       {/* 3. CONSULTATION PROCESS */}
{/* 3. CONSULTATION PROCESS */}
<section className="relative py-15 overflow-hidden">

  {/* Soft ambient background */}
  <div className="absolute inset-0 -z-10 
    bg-[radial-gradient(circle_at_top,#FBF4EC,#F8EFE6,transparent)]">
  </div>

  {/* Heading */}
  <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] 
                 text-[#1c3934] mb-18 text-center">
    Consultation Process
  </h2>

  {/* Steps */}
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

    {[
      {
        title: "Analysis",
        desc: "Comprehensive evaluation of charts, space, and circumstances.",
      },
      {
        title: "Guidance",
        desc: "Clear, structured recommendations explained in detail.",
      },
      {
        title: "Implementation",
        desc: "Support during execution of suggested changes.",
      },
      {
        title: "Ongoing Support",
        desc: "Follow-ups to ensure long-term alignment.",
      },
    ].map((step, i) => (
      <div
        key={i}
        className="group relative bg-[#FDF8F3]
        rounded-2xl p-6 text-center
        border-2 border-[#606C33]/35
        shadow-[0_6px_16px_rgba(0,0,0,0.12),0_28px_60px_rgba(28,57,52,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]
        transition-all duration-500 ease-out
        transform-gpu
        hover:-translate-y-4
        hover:shadow-[0_14px_32px_rgba(0,0,0,0.18),0_45px_90px_rgba(188,108,37,0.35)]"
      >

        {/* Glow overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl
          bg-gradient-to-br from-[#DDA158]/18 via-transparent to-[#606C33]/18
          opacity-0 group-hover:opacity-100 transition duration-500">
        </div>

        {/* Step Number */}
        <div className="relative mx-auto -mt-16 mb-6
          w-14 h-14 rounded-full
          bg-gradient-to-br from-[#DDA158] to-[#BC6C25]
          text-white flex items-center justify-center
          font-['Playfair_Display'] font-bold text-xl
          shadow-[0_10px_25px_rgba(188,108,37,0.5)]
          ring-4 ring-[#FDF8F3]">
          {i + 1}
        </div>

        {/* Title */}
        <p className="relative font-['Playfair_Display'] font-bold text-lg 
                      text-[#1B2624] mb-3">
          {step.title}
        </p>

        {/* Divider */}
        <div className="relative h-px w-12 bg-[#606C33]/40 mx-auto mb-4"></div>

        {/* Description */}
        <p className="relative text-sm font-['Poppins'] 
                      text-[#1B2624]/85 leading-relaxed">
          {step.desc}
        </p>

      </div>
    ))}
  </div>
</section>



 {/* FINAL CTA – CONSULTATION */}
<section className="mt-20 md:mt-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="relative bg-[#F5EBE0] border border-[#606C33]/25 
                    rounded-3xl p-8 sm:p-10 md:p-14 shadow-sm overflow-hidden">

      {/* Decorative Background (subtle & safe) */}
      <div className="absolute -top-28 -right-28 w-72 h-72 rounded-full bg-[#DDA158]/20 blur-3xl"></div>
      <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-[#606C33]/15 blur-3xl"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl sm:text-4xl md:text-4xl 
                         font-['Playfair_Display'] font-bold text-[#1B2624] mb-4">
            Begin Your Consultation Journey
          </h2>

          <div className="h-px w-16 bg-[#606C33]/60 mb-5"></div>

          <p className="font-['Poppins'] text-sm sm:text-base 
                        text-[#1B2624]/80 leading-relaxed mb-6 max-w-xl">
            Consultations are conducted with discretion, depth, and ethical
            responsibility. Each session is designed to provide clarity,
            alignment, and long-term direction — never fear or dependency.
          </p>

          {/* What You Can Expect */}
          <ul className="space-y-2 font-['Poppins'] text-sm text-[#1B2624]/85 mb-8">
            <li>• Personalised analysis based on your unique chart or space</li>
            <li>• Clear guidance, not generic predictions</li>
            <li>• Practical, non-invasive remedies</li>
            <li>• Continued support where required</li>
          </ul>

          {/* SOCIAL MEDIA */}
          <div className="mt-6">
            <p className="font-['Playfair_Display'] text-[#1B2624] mb-3">
              Stay Connected
            </p>

           <div className="flex items-center gap-3 flex-wrap">

  {[
    {
      href: "https://www.youtube.com/@AstroVaastuSavvy",
      icon: "/icons/youtube.png"
    },
    {
      href: "https://www.instagram.com/astrovaastusavvy",
      icon: "/icons/instagram.png"
    },
    {
      href: "https://wa.me/917303014789",
      icon: "/icons/whatsapp.png",
      green: true
    },
  ].map((item, i) => (
    <a
      key={i}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-11 h-11 rounded-full border 
        ${item.green 
          ? "border-green-600/40 hover:bg-green-600 hover:border-green-600" 
          : "border-[#606C33]/40 hover:bg-[#BC6C25] hover:border-[#BC6C25]"}
        flex items-center justify-center bg-white transition duration-300 shadow-sm group`}
    >
      <img
        src={item.icon}
        alt="social-icon"
        className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition duration-300"
      />
    </a>
  ))}

</div>


            <p className="mt-4 text-sm font-['Poppins'] text-[#1B2624]/70">
              📞 Call / WhatsApp: <br />
              <span className="font-medium">+91 7303014789</span><br />
              <span className="font-medium">+91 9217766359</span>
            </p>
          </div>
        </div>

        {/* RIGHT CTA CARD */}
        <div className="bg-[#FDF8F3] border border-[#606C33]/25 
                        rounded-2xl p-6 sm:p-8 md:p-10">

          <p className="font-['Playfair_Display'] text-lg text-[#1B2624] mb-6 text-center md:text-left">
            Choose how you’d like to proceed
          </p>

          <div className="flex flex-col gap-4">

            {/* Primary CTA */}
            <a
              href="/contact"
              className="text-center bg-[#BC6C25] text-white py-3 rounded-full 
                         font-['Poppins'] shadow-md hover:opacity-90 transition"
            >
              Book Consultation
            </a>

            {/* Secondary CTA */}
            <a
              href="https://wa.me/917303014789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-white text-[#1B2624] py-3 rounded-full 
                         font-['Poppins'] shadow-md transition border
                         hover:bg-green-100"
            >
              Talk on WhatsApp
            </a>
          </div>

          <p className="mt-6 text-xs font-['Poppins'] text-[#1B2624]/60 text-center">
            Not sure which consultation is right for you?  
            We’ll guide you personally before you begin.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>




      </div>
    </section>
  );
}

export default HomeTrustSection;
