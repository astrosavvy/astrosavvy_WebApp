import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-purple-800 mb-4">
          Thank You 
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was successful and your Kundli consultation request has
          been submitted.
        </p>

        <p className="text-gray-500 mb-8 text-sm">
          Acharaya Savvy’s team will review your details and contact you shortly.
        </p>

        <Link
          to="/"
          className="inline-block bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
