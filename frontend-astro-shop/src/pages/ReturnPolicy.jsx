import React from "react";

function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">
          Return & Replacement Policy
        </h1>

        <p className="text-sm mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm leading-relaxed">

          <p>
            All products sold through this website are carefully verified
            before dispatch. Please read the following return terms carefully.
          </p>

          <h2 className="text-xl font-medium">No Refund Policy</h2>
          <p>
            We do not provide refunds under any circumstances. All purchases
            are final.
          </p>

          <h2 className="text-xl font-medium">Replacement Policy</h2>
          <p>
            Customers may request a replacement if they wish to return a
            product. Replacement will be provided only after verification.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The product must be unused.</li>
            <li>The product must be in original condition.</li>
            <li>The product must not be damaged or altered.</li>
            <li>Original packaging must be intact.</li>
          </ul>

          <h2 className="text-xl font-medium">Return Process</h2>
          <p>
            To initiate a return request, customers must contact Dr. Savvy’s
            team through the official contact details provided on the website.
          </p>

          <p>
            After inspection and approval, a similar replacement product will
            be dispatched. Replacement is subject to availability.
          </p>

        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
