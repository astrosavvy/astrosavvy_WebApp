import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../utils/axios";
import { ArrowLeft, Lock, ShieldCheck, Truck, Sparkles, Check } from "lucide-react";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // 'razorpay' | 'cod'
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EBE7DF] text-center max-w-md w-full">
          <p className="text-gray-600 text-lg mb-6">Your cart is currently empty.</p>
          <Link
            to="/shop"
            className="inline-block bg-[#385246] hover:bg-[#2C4238] text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Explore Sacred Shop →
          </Link>
        </div>
      </div>
    );
  }

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const deliveryCharge = paymentMethod === "cod" ? 49 : 0;
  const finalTotal = Math.max(0, subtotal + deliveryCharge - appliedDiscount);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "SAVVY10" || code === "FESTIVE10" || code === "KARWA10") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponSuccess(`Coupon ${code} applied! 10% off saved ₹${discount}`);
    } else if (code === "DIVINE100" || code === "WELCOME100") {
      const discount = Math.min(100, subtotal);
      setAppliedDiscount(discount);
      setCouponSuccess(`Coupon ${code} applied! ₹${discount} saved`);
    } else {
      setCouponError("Invalid or expired coupon code");
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your Full Name";
    if (!formData.email.trim() || !formData.email.includes("@")) return "Please enter a valid Email Address";
    if (!formData.phone.trim() || formData.phone.length < 10) return "Please enter a valid 10-digit Phone Number";
    if (!formData.address.trim()) return "Please enter your Street Address";
    if (!formData.pincode.trim() || formData.pincode.length < 5) return "Please enter a valid PIN Code";
    if (!formData.city.trim()) return "Please enter your City";
    if (!formData.state.trim()) return "Please enter your State";
    if (!agreedTerms) return "Please accept the Terms & Conditions and Policies to continue";
    return null;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (loading) return;

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const fullStreetAddress = formData.landmark.trim()
      ? `${formData.address.trim()}, Near ${formData.landmark.trim()}`
      : formData.address.trim();

    const customerPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: fullStreetAddress,
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.trim(),
    };

    // Save for sync
    localStorage.setItem("checkoutData", JSON.stringify({ formData, cartItems, totalAmount: finalTotal }));
    localStorage.setItem("productCheckoutData", JSON.stringify(customerPayload));

    // ==============================================================
    // 1. CASH ON DELIVERY (COD)
    // ==============================================================
    if (paymentMethod === "cod") {
      try {
        const verifyRes = await api.post("/api/shop/payment/verify", {
          is_cod: true,
          amount: finalTotal,
          orderType: "product",
          cartItems: cartItems,
          customer: customerPayload,
        });

        if (verifyRes.data?.success) {
          clearCart();
          localStorage.removeItem("checkoutData");
          localStorage.removeItem("productCheckoutData");
          window.location.href = "/payment-success";
        } else {
          setErrorMessage(verifyRes.data?.detail || "Order creation failed. Please try again.");
          setLoading(false);
        }
      } catch (err) {
        console.error("COD Order creation error:", err);
        setErrorMessage("Failed to place Cash on Delivery order. Please try again or use Razorpay.");
        setLoading(false);
      }
      return;
    }

    // ==============================================================
    // 2. RAZORPAY PREPAID CHECKOUT
    // ==============================================================
    try {
      const { data } = await api.post("/api/shop/payment/create-order", {
        amount: finalTotal,
      });

      // Handle mock mode
      if (data.order?.mock) {
        const verifyRes = await api.post("/api/shop/payment/verify", {
          razorpay_order_id: data.order.id,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: "mock_signature",
          cartItems: cartItems,
          customer: customerPayload,
        });
        if (verifyRes.data?.success) {
          clearCart();
          localStorage.removeItem("checkoutData");
          localStorage.removeItem("productCheckoutData");
          window.location.href = "/payment-success";
        } else {
          window.location.href = "/payment-failure";
        }
        return;
      }

      const productDescriptions = cartItems
        .map((item) => item.category === "rudraksha" ? item.title : item.name)
        .filter(Boolean)
        .join(", ");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY || "rzp_live_T9L3iqBPRPz1i5",
        amount: data.order.amount,
        currency: "INR",
        name: "Astro Vaastu Savvy",
        description: productDescriptions || "Sacred Vedic Astrological Products",
        order_id: data.order.id,
        prefill: {
          name: customerPayload.name,
          email: customerPayload.email,
          contact: customerPayload.phone,
        },
        theme: {
          color: "#385246",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async function (response) {
          try {
            const verifyRes = await api.post("/api/shop/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cartItems,
              customer: customerPayload,
            });

            if (verifyRes.data?.success) {
              clearCart();
              localStorage.removeItem("checkoutData");
              localStorage.removeItem("productCheckoutData");
              window.location.href = "/payment-success";
            } else {
              window.location.href = "/payment-failure";
            }
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            window.location.href = "/payment-failure";
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Razorpay order initiation error:", err);
      setErrorMessage("Could not initialize payment gateway. Please check your network or try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B2624] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP NAVIGATION / BREADCRUMB */}
        <div className="flex items-center justify-between mb-8 pb-3 text-sm text-[#4A5568]">
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-[#1B2624] font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to bag
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            256-bit encrypted checkout
          </div>
        </div>

        {/* ERROR BANNER */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {errorMessage}
          </div>
        )}

        {/* TWO-COLUMN CHECKOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. SHIPPING ADDRESS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#EBE7DF]">
              <h2 className="text-xl font-semibold text-[#1B2624] mb-6">
                Shipping Address
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="patron@domain.com"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Flat No., Building, Street area"
                    className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                  />
                </div>

                {/* Apartment, landmark */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                    Apartment, suite, landmark (optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="e.g. Near Rose Garden"
                    className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                  />
                </div>

                {/* PIN Code & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 110001"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* State & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2C3E35] mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      readOnly
                      className="w-full bg-[#F5F2EB] border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-gray-700 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHOD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#EBE7DF]">
              <h2 className="text-xl font-semibold text-[#1B2624] mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Option 1: Razorpay Secure Checkout */}
                <div
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`border rounded-2xl p-4.5 cursor-pointer transition flex items-start gap-3.5 ${
                    paymentMethod === "razorpay"
                      ? "border-[#C9A96E] bg-[#FDFBF7] ring-1 ring-[#C9A96E]"
                      : "border-[#E8E4DC] hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="mt-0.5">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "razorpay"
                          ? "border-[#B88E2F] bg-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {paymentMethod === "razorpay" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#B88E2F]" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-[#1B2624]">
                        Razorpay Secure Checkout
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-white border border-[#E2DDD3] text-gray-600 px-2 py-0.5 rounded font-medium">
                          UPI
                        </span>
                        <span className="text-[10px] bg-white border border-[#E2DDD3] text-gray-600 px-2 py-0.5 rounded font-medium">
                          Cards
                        </span>
                        <span className="text-[10px] bg-white border border-[#E2DDD3] text-gray-600 px-2 py-0.5 rounded font-medium">
                          Net Banking
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      UPI, Credit/Debit Cards, Net Banking & Wallets
                    </p>
                  </div>
                </div>

                {/* Option 2: Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border rounded-2xl p-4.5 cursor-pointer transition flex items-start gap-3.5 ${
                    paymentMethod === "cod"
                      ? "border-[#C9A96E] bg-[#FDFBF7] ring-1 ring-[#C9A96E]"
                      : "border-[#E8E4DC] hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="mt-0.5">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === "cod"
                          ? "border-[#B88E2F] bg-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#B88E2F]" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <span className="font-semibold text-sm text-[#1B2624]">
                      Cash on Delivery • ₹49 extra
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Payment due on delivery • Standard delivery
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Estimation Note */}
              <div className="mt-5 text-xs text-gray-500 leading-relaxed border-t border-[#F2EEE9] pt-4">
                <p>Estimated delivery 3–5 working days after dispatch.</p>
                <p className="text-gray-400 mt-0.5">
                  Festival, weather and unforeseen delays may affect delivery.
                </p>
              </div>
            </div>

            {/* TERMS & CONDITIONS CHECKBOX */}
            <div className="flex items-start gap-3 pt-1 px-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#385246] border-gray-300 focus:ring-[#385246]"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="underline hover:text-[#1B2624]">
                  Terms and Conditions
                </Link>{" "}
                and have read the{" "}
                <Link to="/privacy-policy" className="underline hover:text-[#1B2624]">
                  Privacy Policy
                </Link>
                ,{" "}
                <Link to="/return-policy" className="underline hover:text-[#1B2624]">
                  Shipping Policy and Cancellation and Refunds
                </Link>
                .
              </label>
            </div>

            {/* BIG ACTION CTA BUTTON */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`w-full py-4.5 rounded-2xl font-semibold text-base shadow-sm transition flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#385246] hover:bg-[#2C4238] active:scale-[0.99] text-white"
              }`}
            >
              {loading
                ? "Processing your order..."
                : `Pay ₹${finalTotal.toLocaleString("en-IN")} securely →`}
            </button>

          </div>

          {/* RIGHT COLUMN: STICKY "YOUR ORDER" SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-[#EBE7DF] sticky top-8">
              <h2 className="text-xl font-semibold text-[#1B2624] mb-5">
                Your Order
              </h2>

              {/* PRODUCTS LIST */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item, idx) => {
                  const displayName =
                    item.category === "rudraksha"
                      ? item.title || item.name
                      : item.name || item.title;
                  const itemPrice = Number(item.price) || 0;
                  const itemQty = Number(item.quantity) || 1;
                  const itemImg = item.images?.[0] || "/favicon.png";

                  return (
                    <div
                      key={idx}
                      className="bg-[#FAF7F2] border border-[#EBE7DF] rounded-2xl p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <img
                          src={itemImg}
                          alt={displayName}
                          className="w-14 h-14 object-cover rounded-xl border border-white shadow-xs shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-[#1B2624] truncate">
                            {displayName}
                          </h3>
                          <span className="inline-block text-[11px] bg-white border border-[#E8E4DC] text-gray-500 px-2 py-0.5 rounded-md mt-1 font-medium">
                            Qty: {itemQty}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm font-bold text-[#1B2624] shrink-0">
                        ₹{(itemPrice * itemQty).toLocaleString("en-IN")}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* COUPON CODE */}
              <div className="mb-6 border-b border-[#F2EEE9] pb-6">
                <label className="block text-xs font-semibold text-[#2C3E35] mb-2">
                  Coupon Code
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl px-3.5 py-2.5 text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#385246] uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-[#2C3E35] hover:bg-black text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shrink-0"
                  >
                    Apply Code
                  </button>
                </form>
                {couponSuccess && (
                  <p className="text-xs text-emerald-600 mt-2 font-medium">
                    ✓ {couponSuccess}
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {couponError}
                  </p>
                )}
              </div>

              {/* PRICE SUMMARY */}
              <div className="space-y-3 text-sm border-b border-[#F2EEE9] pb-5 mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-medium text-[#1B2624]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery:</span>
                  {deliveryCharge > 0 ? (
                    <span className="font-medium text-[#1B2624]">₹{deliveryCharge}</span>
                  ) : (
                    <span className="font-medium text-emerald-700">Free</span>
                  )}
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>-₹{appliedDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center text-lg font-bold text-[#1B2624] mb-6">
                <span>Total:</span>
                <span className="text-xl">₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* TRUST BADGES */}
              <div className="space-y-2.5 text-xs text-gray-500 border-t border-[#F2EEE9] pt-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#385246] shrink-0" />
                  <span>Free Delivery Across India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#B88E2F] shrink-0" />
                  <span>Sacred Consecrated Packaging</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;
