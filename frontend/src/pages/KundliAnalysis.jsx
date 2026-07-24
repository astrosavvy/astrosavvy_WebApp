import Loader from "../components/Loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const KundliAnalysis = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
    message: "",
  });
console.log("RAZORPAY KEY:", import.meta.env.VITE_RAZORPAY_KEY);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayAndSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // 🔥 META PIXEL: Initiate Checkout
    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        value: 299,
        currency: "INR",
      });
    }

    try {
      setLoading(true);

      // 1️⃣ CREATE ORDER (Using the debugged endpoint)
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/payment/create-order`,
        { amount: 299 },
        { timeout: 30000 }
      );

      const order = orderRes.data.order || orderRes.data;

      if (!order?.id) {
        throw new Error("Order creation failed");
      }
const kundliPayload = { ...formData };
      // 2️⃣ RAZORPAY OPTIONS
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY || "rzp_live_S6uqRxVnmhfTmE",
        amount: order.amount,
        currency: "INR",
        name: "Astro Vaastu Savvy",
        description: "Kundli Analysis Consultation",
        order_id: order.id,

        handler: async function (response) {
          try {
            // 3️⃣ VERIFY PAYMENT (Using the debugged logic)
            const verifyRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderType: "kundli",
                amount: 299,
               kundliData: kundliPayload, // Passing data here as per debugged code
              }
            );

            if (!verifyRes.data.success) {
              alert("Payment verification failed");
              setLoading(false);
              return;
            }

            // ✅ META PIXEL: Purchase
            if (window.fbq) {
              window.fbq("track", "Purchase", {
                value: 299,
                currency: "INR",
              });
            }

            setLoading(false);
            navigate("/thank-you");
          } catch (err) {
            console.error("Post-payment error:", err);
            alert("Payment successful. If you don’t see confirmation, please contact support.");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#6A1B9A",
        },
      };

      // 🔥 META PIXEL: Lead
      if (window.fbq) {
        window.fbq("track", "Lead");
      }

      // 4️⃣ OPEN RAZORPAY
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5EBE0]">
      <div className="min-h-screen flex items-center justify-center px-6 py-6">
        <div className="max-w-6xl w-full bg-[#FDF8F3] rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-[#606C33]/30">
          
          {/* LEFT — FORM */}
          <div className="p-8 lg:p-12">
            <h2 className="text-4xl font-bold font-['Playfair_Display'] text-[#BC6C25] mb-2">
              Book Your Bhagya Kundali
            </h2>
            <div className="h-px w-20 bg-[#606C33]/60 mb-6"></div>
            <p className="font-['Poppins'] text-[#1B2624]/80 mb-8">
              Submit your birth details for Kundali analysis
            </p>

            <form onSubmit={handlePayAndSubmit} className="space-y-5">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-[#1B2624]">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-[#1B2624]">Time of Birth</label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
                  />
                </div>
              </div>

              <input
                type="text"
                name="placeOfBirth"
                placeholder="Place of Birth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="message"
                placeholder="Specific concerns or questions (optional)"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-[#606C33]/40 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#BC6C25]"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-full text-lg font-bold flex justify-center items-center transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#BC6C25] text-white hover:bg-[#a35d1f] shadow-lg active:scale-95"
                }`}
              >
                {loading ? <Loader /> : "Pay ₹299 & Book Now"}
              </button>
            </form>
          </div>

          {/* RIGHT — INFO */}
          <div className="bg-[#606C33]/15 p-10 lg:p-12 flex flex-col justify-between border-l border-[#606C33]/30">
            <div className="mt-2 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#606C33]/30 w-80">
                <div className="absolute inset-0 bg-[#1B2624]/10 pointer-events-none"></div>
                <img
                  src="/images/kundli-illustration.jpeg"
                  alt="Kundli Birth Chart Illustration"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-['Playfair_Display'] text-[#1B2624] mb-4">
                Why Bhagya Kundali?
              </h3>
              <ul className="space-y-3 text-sm text-[#1B2624]/85 font-['Poppins']">
                <li>• Financial Guidance Analysis</li>
                <li>• Health Analysis</li>
                <li>• Accurate timing of opportunities & challenges</li>
                <li>• Remedies focused on balance, not fear</li>
                <li>• Personally analysed by Acharya Dr. Savvy Singh</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRUST & AUTHORITY MASTER SECTION ================= */}
      <section className="bg-[#fbf8f5] py-12 md:py-28 overflow-hidden font-['Poppins']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 md:space-y-24">
          {/* 1. CELEBRITY PROFILE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* LEFT: CINEMATIC CAROUSEL */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 relative order-1"
            >
              <div className="absolute -inset-1 md:-inset-4 bg-gradient-to-tr from-[#BC6C25]/20 to-transparent rounded-2xl md:rounded-[3rem] blur-xl md:blur-2xl" />
              <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
                <Swiper
                  modules={[Autoplay, EffectFade, Pagination]}
                  effect="fade"
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                  className="w-full min-h-[260px] h-[260px] sm:h-[420px] md:h-[550px]"
                >
                  {["/images/celeb-3.jpeg", "/images/celeb-4.jpeg", "/images/celeb-5.jpeg"].map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} alt="Dr Savvy Singh" className="w-full h-full object-cover block" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>

            {/* RIGHT: BIO + AUTHORITY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6 md:space-y-8 order-2"
            >
              <div className="space-y-3 md:space-y-4">
                <span className="inline-block px-3 py-1 bg-[#BC6C25]/10 text-[#BC6C25] rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                  Celebrity Astrologer • Space Strategist
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-['Playfair_Display'] text-[#1B2624] leading-tight">
                  Acharya Dr. Savvy <span className="text-[#BC6C25]">Singh</span>
                </h2>
              </div>

              <div className="space-y-4 md:space-y-5 text-sm md:text-lg text-[#1B2624]/80 leading-relaxed">
                <p>
                  A globally celebrated <span className="font-semibold text-[#1B2624]">medal-winning Scientific Vastu Expert</span>, 
                  Dr. Savvy Singh bridges <span className="font-semibold">Vedic sciences</span> with <span className="font-semibold">modern spatial psychology</span>.
                </p>
                <p>
                  Trusted by celebrities, business leaders, and political figures, her consultations are known for 
                  <span className="font-semibold"> precision, logic, and fear-free remedies</span>.
                </p>
                <p className="border-l-4 border-[#BC6C25] pl-4 italic text-[#606C33]">
                  “Alignment of space is alignment of destiny.”
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { value: "6+", label: "Years Experience" },
                  { value: "15K+", label: "Consultations" },
                  { value: "Global", label: "Clientele" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xl md:text-3xl font-bold text-[#1B2624]">{item.value}</p>
                    <p className="text-[9px] md:text-xs uppercase tracking-widest text-[#BC6C25] font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 2. CORE EXPERTISE STRIP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "Scientific Vastu Analysis",
              "Birth Chart & Kundli",
              "Numerology Corrections",
              "Business & Space Strategy",
            ].map((skill, i) => (
              <div key={i} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-md hover:shadow-xl transition">
                <p className="font-bold text-[#1B2624] text-xs md:text-base">{skill}</p>
                <p className="text-[9px] md:text-xs text-[#BC6C25] mt-2 uppercase tracking-wider">Proven Results</p>
              </div>
            ))}
          </div>

          {/* MEDIA & AWARDS */}
          <div className="bg-white rounded-2xl md:rounded-[3rem] py-10 md:py-16">
            <div className="px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                <h2 className="text-2xl md:text-5xl font-bold font-['Playfair_Display'] text-[#1B2624]">
                  Trusted by <span className="text-[#BC6C25]">Media</span> & Honored with <span className="text-[#BC6C25]">Global Awards</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl border border-[#BC6C25]/10">
                {/* MEDIA */}
                <div className="bg-[#1B2624] p-6 md:p-14 text-white relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B2624] to-[#1e3934]" />
                  <div className="relative space-y-8">
                    <h3 className="text-2xl md:text-3xl font-bold font-['Playfair_Display']">Media Appearances</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                      Acharya Dr. Savvy Singh is a regularly invited expert on leading national and international platforms, trusted for her ethical guidance.
                    </p>
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      autoplay={{ delay: 2500 }}
                      pagination={{ clickable: true }}
                      loop
                      className="h-[140px] sm:h-40 md:h-52 rounded-xl overflow-hidden"
                    >
                      {[
                        "/images/media/jkl-24-7.png",
                        "/images/media/ndtv.jpg",
                        "/images/media/Sadhna.png",
                        "/images/media/zeemedia-logo.png",
                      ].map((img, i) => (
                        <SwiperSlide key={i}>
                          <img src={img} alt="Media Logo" className="w-full h-full object-contain bg-black" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                {/* AWARDS */}
                <div className="bg-[#fbf8f5] p-6 md:p-14">
                  <h3 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] text-[#1B2624] mb-6">Awards & Recognitions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { title: "Jyotish Gaurav", loc: "India", img: "/images/award-1.jpeg" },
                      { title: "Bharat Gaurav", loc: "New York, USA", img: "/images/award-3.jpeg" },
                      { title: "Yuva Yodha Award", loc: "India", img: "/images/award-4.jpeg" },
                      { title: "Innovative Youth Icon", loc: "London, UK", img: "/images/award-6.jpeg" },
                    ].map((award, i) => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                        <div className="h-36 overflow-hidden">
                          <img src={award.img} alt={award.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-[#1B2624] text-sm">{award.title}</h4>
                          <p className="text-xs text-[#BC6C25] mt-1">{award.loc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KundliAnalysis;