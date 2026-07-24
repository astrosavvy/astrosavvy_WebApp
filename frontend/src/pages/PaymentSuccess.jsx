import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f3] px-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-['Playfair_Display'] text-green-700">
          Order Confirmed 🎉
        </h1>

        <p className="mt-4 text-gray-700 font-['Poppins']">
          Thank you for your purchase.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          📦 Your order will be delivered within <strong>5–7 working days</strong>.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          📧 You will receive order updates on your email.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-[#BC6C25] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
