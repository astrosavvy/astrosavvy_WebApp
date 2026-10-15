import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect directly to the unified checkout page
    navigate("/checkout", { replace: true });
  }, [navigate]);

  return null;
}

export default ProductPayment;
