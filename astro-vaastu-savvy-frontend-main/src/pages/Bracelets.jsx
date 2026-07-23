import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Bracelets() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/shop/products?category=bracelet")
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.products);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] px-6 py-16">
      <h1 className="text-4xl text-center font-bold mb-12">
        Divine Bracelets
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map(product => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product.slug || product._id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition"
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-[#BC6C25] font-bold mt-2">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bracelets;