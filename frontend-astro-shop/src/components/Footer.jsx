import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-[#F4F8F7] text-[#1B2624] pt-16 pb-8 mt-20">

      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#BC6C25] via-[#DDA158] to-[#BC6C25]"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-14">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold font-['Playfair_Display'] text-[#112e29] mb-4">
            Astro Vaastu Savvy
          </h2>

          <p className="text-[#1B2624]/80 leading-relaxed text-sm">
            Blending ancient astrological wisdom with scientific vastu
            principles to create balance, harmony, and success in life.
            Trusted by clients across India and globally.
          </p>

          <div className="mt-6 text-sm text-[#BC6C25] tracking-wide font-medium">
            ✦ Ancient Wisdom • Modern Alignment ✦
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-[#112e29] mb-5">
            Explore
          </h3>

          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Shop", path: "/shop" },
              { name: "Contact", path: "/contact" },
             { name: "Return Policy", path: "/return-policy" },
{ name: "Privacy Policy", path: "/privacy-policy" },
{ name: "Terms & Conditions", path: "/terms" },

            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="text-[#1B2624]/80 hover:text-[#BC6C25] transition duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#112e29] mb-5">
            Connect
          </h3>

          <div className="space-y-3 text-sm text-[#1B2624]/80">
            <p>📞 +91 7303014789</p>
            <p>📞 +91 9217766359</p>
            <p>📍 India | Serving Worldwide</p>
          </div>

          {/* Glass Card Social */}
      <div className="mt-6 flex gap-4">
  <a
    href="https://www.instagram.com/astrovaastusavvy?igsh=MWRkNW80NzFvNHdvZQ=="
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-lg text-sm hover:bg-[#BC6C25] hover:text-white transition duration-300 shadow-sm"
  >
    Instagram
  </a>

  <a
    href="https://youtube.com/@astrovaastusavvy?si=ElbFq-AFMX9zlT61"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-lg text-sm hover:bg-[#BC6C25] hover:text-white transition duration-300 shadow-sm"
  >
    YouTube
  </a>
</div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1B2624]/10 mt-14 pt-6 text-center text-sm text-[#1B2624]/60">
        © {new Date().getFullYear()} Astro Vaastu Savvy. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
