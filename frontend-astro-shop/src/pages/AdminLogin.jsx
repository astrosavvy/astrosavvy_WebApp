import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        (import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com") + "/api/shop/admin/login",
        { email, password }
      );

      // ✅ Save BOTH JWT token and Role
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminRole", res.data.role);

      navigate("/admin");
    } catch (error) {
      const message =
        error.response?.data?.detail || error.response?.data?.message || "Invalid admin credentials";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 text-purple-700">
          Admin Portal Login
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          Access Love Reports, Kundli Consultations, Shop Orders &amp; Blogs
        </p>

        <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800 shadow-md"
          }`}
        >
          {loading ? "Logging in..." : "Login to Admin Portal"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;