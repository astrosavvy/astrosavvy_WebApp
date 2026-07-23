function PaymentFailure() {
  return (
    <div className="px-6 py-10 text-red-600">
      <h1 className="text-4xl font-['Playfair_Display']">
        Payment Failed
      </h1>
      <p className="mt-4">
        Something went wrong. Please try again or contact support.
      </p>
    </div>
  );
}

export default PaymentFailure;
