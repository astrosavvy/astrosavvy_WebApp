import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const CATEGORIES = ["all", "bracelet", "rudraksha", "potli"];

function AdminProducts() {
  const [products, setProducts]     = useState([]);
  const [category, setCategory]     = useState("all");
  const [loading, setLoading]       = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = category !== "all" ? `?category=${category}` : "";
      const { data } = await api.get(`/api/shop/products/admin/all${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.delete(`/api/shop/products/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/api/shop/products/admin/${id}/toggle`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to toggle product status");
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition border ${
              category === cat
                ? "bg-yellow-700 text-white border-yellow-700"
                : "bg-white text-gray-600 border-gray-300 hover:border-yellow-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500 py-12">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="p-3 border">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="p-3 border font-medium">{product.name}</td>

                  {/* Category */}
                  <td className="p-3 border capitalize">
                    <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-700">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-3 border">
                    {localStorage.getItem("adminRole") === "store-manager" ? (
                      <span className="text-gray-500 font-semibold">🔒 Restricted</span>
                    ) : product.callForPrice ? (
                      <span className="text-blue-600 text-sm">Call for Price</span>
                    ) : (
                      <span>₹{product.price?.toLocaleString("en-IN")}</span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="p-3 border">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {product.stock > 0 ? product.stock : "Out of Stock"}
                    </span>
                  </td>

                  {/* Active Status */}
                  <td className="p-3 border text-center">
                    <span className={`px-2 py-1 rounded text-sm ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {product.isActive ? "Active" : "Hidden"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 border">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleToggle(product._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition text-sm"
                      >
                        {product.isActive ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
                      >
                        Delete
                      </button>
                      <button
  onClick={() => navigate(`/admin/products/edit/${product._id}`)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition text-sm"
>
  Edit
</button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-8 text-gray-500">
                    No products found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;