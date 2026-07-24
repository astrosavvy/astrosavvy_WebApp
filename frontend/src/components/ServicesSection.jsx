
import { Link } from "react-router-dom";
function ServicesSection() {
  const services = [
    {
      title: "Astro Vastu Consultation & Scientific Space Strategy",
      desc: "Harmonising homes and workspaces using vastu principles aligned with planetary energies.",
      icon: "/icons/astrology.png",
      image: "/images/home-services-1.png",
    },
    {
      title: "Birth Chart Analysis",
      desc: "Detailed kundali interpretation for career, relationships, health, and life direction.",
      icon: "/icons/moon.png",
      image: "/images/home-services-2.png",
    },
    {
      title: "Numerology & Name Analysis",
      desc: "Understanding numerical vibrations of names and dates to guide life decisions.",
      icon:"/icons/mystery.png",
      image: "/images/home-services-3.png",
    },
    {
      title: "Astro Palmistry",
      desc: "Looking beyond just the lines to understand your karmic blueprints, helping you navigate life's challenges",
      icon: "/icons/chiromancy.png",
      image: "/images/astro-palmistry.png",
    },
  ];

  return (
    <section className="bg-[white]  pt-15 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-16">
        <h2 className="text-5xl font-bold md:text-5xl font-['Playfair_Display'] text-[#BC6C25]">
  Services Offered
</h2>
          <div className="mt-4 h-px w-24 bg-[#606C33]/60"></div>
          <p className="mt-6 font-['Poppins'] text-[#1B2624]/80 leading-relaxed">
            Each service is delivered with discipline, analytical depth, and
            ethical responsibility—combining classical wisdom with modern
            interpretation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-[#F5EBE0] border border-[#606C33]/35 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2624]/40 via-transparent to-transparent"></div>

                {/* Floating Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-[#DDA158] flex items-center justify-center shadow-md">
                  <img src={service.icon} alt="" className="w-6 h-6" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#1B2624] mb-3">
                  {service.title}
                </h3>

                <div className="h-px w-12 bg-[#606C33]/40 mb-3"></div>

                <p className="text-sm font-['Poppins'] text-[#1B2624] leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-[#DDA158]/10 to-transparent"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;
