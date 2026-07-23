import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


/* ================= ANIMATED NUMBER ================= */
function AnimatedNumber({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}


function HomeHero() {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Floating effect for the circles
  const floatTransition = {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  };

  return (
    <section className="bg-[white]">
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* MOBILE HERO – REFINED */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:hidden relative w-full min-h-[80vh] bg-cover bg-top flex items-end rounded-b-[32px] overflow-hidden"
          style={{ backgroundImage: "url('/images/astro-savvy-main-6.jpeg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

          <div className="relative z-10 p-5 pb-8 text-white">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full bg-[#E6B566]/90 text-xs font-['Poppins'] text-[#1B2624]"
            >
              ✦ Award-Winning Celebrity Astrologer
            </motion.div>

            <h1 className="text-3xl font-['Playfair_Display'] leading-tight">
              Redesign Your Life. <br />
              <span className="text-[#F2C078]">Redefine Its Path.</span>
            </h1>

            <p className="mt-3 text-sm font-['Poppins'] text-white/90 leading-relaxed">
              A holistic blend of Astrology, Vastu, Numerology and scientific
              space strategy to bring balance, prosperity and clarity to life.
            </p>

            <div className="mt-5 flex gap-3">
              <Link to="/contact" className="flex-1 text-center bg-[#BC6C25] py-3 rounded-full text-sm font-medium shadow-lg hover:opacity-90 transition">
                Book Consultation
              </Link>
              <Link to="/services" className="flex-1 text-center border border-white/70 py-3 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white hover:text-[#1B2624] transition">
                Services
              </Link>
            </div>
          </div>
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#DDA158]/30 text-sm text-[#1B2624] font-['Poppins']">
            ✦ Award-Winning Celebrity Astrologer & Vastu Expert
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] text-[#1B2624] leading-tight">
            Redesign Your Life. <br />
            <span className="text-[#BC6C25]">Redefine Its Path.</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="mt-6 text-lg font-['Poppins'] text-[#1B2624]/80 max-w-xl">
            A holistic blend of Astrology, Vastu, Numerology and scientific
            space strategy to bring balance, prosperity and clarity to life.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="bg-[#1a342f] text-white px-8 py-3 rounded-md shadow-md hover:bg-[#BC6C25] transition-colors duration-300">
              Book Consultation
            </Link>
            <Link to="/services" className="px-8 py-3 rounded-md border border-[#606C33] text-[#1B2624] hover:bg-[#606C33] hover:text-white transition">
              Explore Services
            </Link>
          </motion.div>

          {/* Achievements */}
           {/* 🔥 ANIMATED ACHIEVEMENTS */}
          <motion.div variants={itemVariants} className="mt-12 flex gap-12 text-[#1B2624]">
            <div>
              <p className="text-3xl font-['Playfair_Display']">
                <AnimatedNumber value={50} suffix="+" />
              </p>
              <p className="text-sm font-['Poppins']">Global Awards</p>
            </div>
            <div>
              <p className="text-3xl font-['Playfair_Display']">
                <AnimatedNumber value={15} suffix="+" />
              </p>
              <p className="text-sm font-['Poppins']">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-['Playfair_Display']">
                <AnimatedNumber value={50} suffix="L+" />
              </p>
              <p className="text-sm font-['Poppins']">Reach</p>
            </div>
          </motion.div>
        </motion.div>

      

        {/* RIGHT VISUAL - DESKTOP */}
        <div className="relative hidden md:flex justify-center items-center w-full min-h-[420px]">
          {/* Background Wash */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={floatTransition}
            className="absolute w-[420px] h-[420px] rounded-full bg-[#606C33]/12" 
          />

          {/* Main Image */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-2 border-[#BC6C25]/40 flex items-center justify-center bg-[#F5EBE0]">
              <img src="/images/astro-savvy-main-6.jpeg" alt="Astro Vaastu Savvy" className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-full border border-[#606C33]/40" />
            </div>
          </motion.div>

          {/* Secondary Image – Top Right */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ ...floatTransition, delay: 0.2 }}
            className="absolute top-4 right-6 md:right-10"
          >
            <div className="relative w-44 h-44 rounded-full bg-[#DDA158]/35 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#606C33]/20 blur-md"></div>
              <img src="/images/award-5.jpeg" alt="Award Recognition" className="relative w-36 h-36 object-cover rounded-full border border-[#606C33]/50" />
            </div>
          </motion.div>

          {/* Secondary Image – Bottom Left */}
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ ...floatTransition, delay: 0.5 }}
            className="absolute bottom-6 left-8 md:left-0"
          >
            <div className="w-48 h-48 rounded-full bg-[#606C33]/20 flex items-center justify-center">
              <img src="/images/media/media-1.jpeg" alt="Media Appearance" className="w-40 h-40 object-cover rounded-full border border-[#606C33]/40" />
            </div>
          </motion.div>
        </div>

        {/* MOBILE IMAGE LAYOUT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden flex flex-col items-center gap-8 mt-0"
        >
          {/* Main Image */}
          <div className="relative mb-0">
            <div className="w-64 h-64 rounded-full bg-[#606C33]/15 flex items-center justify-center">
              <img src="/images/astro-savvy-main.jpeg" alt="Astro Vaastu Savvy" className="w-56 h-56 object-cover rounded-full border border-[#606C33]/40 bg-[#F5EBE0]" />
            </div>
          </div>

          {/* Supporting Images */}
          <div className="flex gap-6">
            <div className="w-32 h-32 rounded-full bg-[#DDA158]/30 flex items-center justify-center">
              <img src="/images/speech-3.jpeg" alt="Award Ceremony" className="w-24 h-24 object-cover rounded-full border border-[#606C33]/40" />
            </div>
            <div className="w-32 h-32 rounded-full bg-[#606C33]/20 flex items-center justify-center">
              <img src="/images/media/media-1.jpeg" alt="Media Presence" className="w-24 h-24 object-cover rounded-full border border-[#606C33]/40" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default HomeHero;