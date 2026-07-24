import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";


function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartItem } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#F5EBE0]/95 backdrop-blur-md border-b border-[#606C33]/30">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold md:text-2xl font-['Playfair_Display'] text-[#1B2624]"
          >
            Astro Vaastu Savvy
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-['Poppins'] text-[#1B2624]">
            {["Home","About","Services","Shop","Blogs","Contact"].map(item => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-[#BC6C25] transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side (Cart + CTA) */}
          <div className="hidden md:flex items-center gap-6">

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-2xl">
              🛒
              {cartItem && (
                <span className="absolute -top-2 -right-2 bg-[#BC6C25] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  1
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link
              to="/contact"
              className="bg-[#BC6C25] text-white px-6 py-2 rounded-md font-['Poppins'] shadow-md hover:opacity-90 transition"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#1B2624] text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-3 bg-[#F5EBE0] rounded-xl p-5 shadow-lg border border-[#606C33]/30">
            <ul className="flex flex-col gap-4 font-['Poppins'] text-[#1B2624]">

              {["Home","About","Services","Shop","Blogs","Contact"].map(item => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#BC6C25]"
                >
                  {item}
                </Link>
              ))}

              {/* Mobile Cart */}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-lg"
              >
                🛒 Cart
                {cartItem && (
                  <span className="bg-[#BC6C25] text-white text-xs px-2 py-0.5 rounded-full">
                    1
                  </span>
                )}
              </Link>

              <Link
                to="/contact"
                className="mt-2 bg-[#BC6C25] text-white text-center py-2 rounded-md"
                onClick={() => setOpen(false)}
              >
                Book Consultation
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
