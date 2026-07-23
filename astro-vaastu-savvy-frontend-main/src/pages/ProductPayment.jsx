import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axios";

function ProductPayment() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkoutData = JSON.parse(
    localStorage.getItem("productCheckoutData")
  );

  /* -------------------------------------------------- */
  /* SAFETY GUARD                                       */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/shop");
    }
  }, [cartItems, navigate]);

  if (!cartItems || cartItems.length === 0) return null;

  /* -------------------------------------------------- */
  /* TOTAL CALCULATION                                  */
  /* -------------------------------------------------- */
  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  /* -------------------------------------------------- */
  /* PAYMENT HANDLER                                    */
  /* -------------------------------------------------- */
  const handlePayment = async () => {
    if (loading) return;

    try {
      setLoading(true);

      /* 1️⃣ CREATE RAZORPAY ORDER */
      const { data } = await api.post(
        "/api/shop/payment/create-order",
        { amount: totalAmount }
      );

      /* 2️⃣ Dynamic Description */
      const productNames = cartItems
        .map((item) =>
          item.category === "rudraksha"
            ? item.title
            : item.name
        )
        .join(", ");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Astro Vaastu Savvy",
        description: productNames,
        order_id: data.order.id,

        handler: async function (response) {
          try {
            /* 3️⃣ VERIFY PAYMENT */
            const verifyRes = await api.post("/api/shop/payment/verify",
               {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,

                // 🔥 MUST MATCH BACKEND
                cartItems: cartItems,

                customer: {
                  name: checkoutData?.name,
                  phone: checkoutData?.phone,
                  email: checkoutData?.email,
                  address: checkoutData?.address,
                },
              }
            );

            if (verifyRes.data.success) {
              clearCart();
              localStorage.removeItem("productCheckoutData");
              window.location.href = "/payment-success";
            } else {
              window.location.href = "/payment-failure";
            }

          } catch (err) {
            console.error("Verify error:", err);
            window.location.href = "/payment-failure";
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#BC6C25",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Payment init error:", err);
      setLoading(false);
      navigate("/payment-failure");
    }
  };

  /* -------------------------------------------------- */
  /* UI                                                  */
  /* -------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#f9f7f3] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl text-center text-[#1B2624] font-semibold">
          Confirm Your Order
        </h1>

        <div className="mt-8 space-y-6">

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-5 items-center border rounded-xl p-4"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#1B2624]">
                  {item.category === "rudraksha"
                    ? item.title
                    : item.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 1}
                </p>

                <p className="text-lg font-bold text-[#BC6C25] mt-2">
                  ₹{item.price} × {item.quantity || 1}
                </p>
              </div>
            </div>
          ))}

        </div>

        <div className="flex justify-between items-center mt-8 text-lg font-semibold border-t pt-6">
          <span>Total Payable</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#BC6C25] hover:bg-[#a85d1f] text-white"
          }`}
        >
          {loading ? "Opening Payment..." : "Confirm & Pay Securely"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          🔒 Secure payment powered by Razorpay
        </p>

      </div>
    </div>
  );
}

export default ProductPayment;
