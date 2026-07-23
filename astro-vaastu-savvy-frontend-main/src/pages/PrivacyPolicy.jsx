import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm leading-relaxed">

          <p>
            We are committed to protecting the privacy and personal information
            of our clients.
          </p>

          <h2 className="text-xl font-medium">Information Collected</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact details.</li>
            <li>Birth details for Kundli consultations.</li>
            <li>Shipping address for product delivery.</li>
            <li>Payment information processed securely.</li>
          </ul>

          <h2 className="text-xl font-medium">Data Protection</h2>
          <p>
            All personal information shared by clients is kept secure and
            confidential. We do not sell, share, or disclose personal
            information to third parties without consent, except where required
            by law.
          </p>

          <h2 className="text-xl font-medium">Use of Information</h2>
          <p>
            Information collected is used strictly for providing consultations,
            processing orders, delivering products, and customer support.
          </p>

          <p>
            By using this website, you agree to the terms of this Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
