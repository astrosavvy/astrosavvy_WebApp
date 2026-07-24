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
      localStorage.setItem("adminRole", res.data.role); // 🔥 Stored for UI logic

      navigate("/admin");
    } catch (error) {
      const message =
        error.response?.data?.detail || error.response?.data?.message || "Invalid admin credentials";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
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

        {/* --- Quick Credentials Selector --- */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
            Role Credentials (Click to autofill)
          </h3>

          <div className="space-y-3">
            {/* Super Admin */}
            <div
              onClick={() => fillCredentials("Savvvysinh9@gmail.com", "astrosavvvysingh_123")}
              className="cursor-pointer p-3 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition text-left"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-purple-800">👑 Super Admin</span>
                <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded font-medium">Full Access</span>
              </div>
              <p className="text-[11px] text-gray-600 font-mono">Email: Savvvysinh9@gmail.com</p>
              <p className="text-[11px] text-gray-600 font-mono">Password: astrosavvvysingh_123</p>
            </div>

            {/* Marketing / Blog Admin */}
            <div
              onClick={() => fillCredentials("blogadmin@astrosavvysingh.com", "astrosavvvysinh_blog_123")}
              className="cursor-pointer p-3 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 transition text-left"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-green-800">✍️ Blog &amp; Marketing Admin</span>
                <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded font-medium">Blogs Only</span>
              </div>
              <p className="text-[11px] text-gray-600 font-mono">Email: blogadmin@astrosavvysingh.com</p>
              <p className="text-[11px] text-gray-600 font-mono">Password: astrosavvvysinh_blog_123</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;