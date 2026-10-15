import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3]">
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  // Calculate total
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill all required fields");
      return;
    }

    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        formData,
        cartItems,
        totalAmount,
      })
    );

    // Also persist directly for any legacy handlers
    localStorage.setItem("productCheckoutData", JSON.stringify(formData));

    navigate("/product-payment");
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3] px-6 py-14">

      {/* PAGE HEADING */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-['Playfair_Display'] text-[#1B2624]">
          Checkout
        </h1>
        <p className="text-gray-600 mt-2">
          Review your order & complete the purchase
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT — ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-semibold text-[#1B2624] mb-6">
            Order Summary
          </h2>

          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-5 mb-6 border-b pb-5">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Quantity: {item.quantity || 1}
                </p>

                <p className="text-[#BC6C25] font-bold mt-2">
                  ₹{item.price} × {item.quantity || 1}
                </p>

                <p className="text-sm font-semibold mt-1">
                  Subtotal: ₹{item.price * (item.quantity || 1)}
                </p>
              </div>
            </div>
          ))}

          <hr className="my-6" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Payable</span>
            <span>₹{totalAmount}</span>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            ✔ Secure payment via Razorpay  
            <br />
            ✔ Delivery within 5–7 working days
          </p>
        </div>

        {/* RIGHT — DELIVERY FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-[#1B2624]">
            Delivery Details
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
          />

          <textarea
            name="address"
            placeholder="Full Address *"
            rows="3"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City *"
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode *"
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#BC6C25]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#BC6C25] hover:bg-[#a85d1f] text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            Proceed to Secure Payment →
          </button>

          <p className="text-center text-sm text-gray-500">
            🔒 100% Secure & Encrypted Payment
          </p>
        </form>

      </div>
    </div>
  );
}

export default Checkout;
