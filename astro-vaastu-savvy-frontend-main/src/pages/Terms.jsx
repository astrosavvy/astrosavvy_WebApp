import React from "react";

function Terms() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm leading-relaxed">

          <h2 className="text-xl font-medium">Authentic Products</h2>
          <p>
            All products sold on this website are genuine and verified before dispatch.
          </p>

          <h2 className="text-xl font-medium">Return Conditions</h2>
          <p>
            Products are eligible for replacement only if they are returned in proper condition.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The product must not be damaged.</li>
            <li>The product must be unused.</li>
            <li>The product must match the originally delivered item.</li>
            <li>The product must be returned in original packaging.</li>
          </ul>

          <h2 className="text-xl font-medium">Consultation Disclaimer</h2>
          <p>
            Astrology and Kundli consultations are based on traditional
            interpretations and may vary from person to person. Results are not guaranteed.
          </p>

          <h2 className="text-xl font-medium">Limitation of Liability</h2>
          <p>
            We are not liable for any indirect or consequential damages arising
            from the use of products or services purchased from this website.
          </p>

          <p>
            By using this website and purchasing products or services,
            you agree to these Terms & Conditions.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Terms;
