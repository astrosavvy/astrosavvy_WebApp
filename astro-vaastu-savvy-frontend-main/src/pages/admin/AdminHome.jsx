import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("adminRole") || "guest";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin-login");
  };

  const isSuperAdmin = role === "super-admin";
  const isMarketing = role === "marketing" || role === "blog-admin";
  const isStoreManager = role === "store-manager";
  const isSupport = role === "support";

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Unified Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Logged in as: <span className="font-semibold text-purple-700 uppercase">{role}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 shadow-md"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">

        {/* --- LOVE REPORTS (Super Admin OR Support) --- */}
        {(isSuperAdmin || isSupport) && (
          <div
            onClick={() => navigate("/admin/report-orders")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition border border-pink-500/30"
          >
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">
              💕 Love Reports
            </h2>
            <p className="text-gray-600">View orders &amp; trigger PDF report generation.</p>
          </div>
        )}

        {/* --- KUNDLI CONSULTATIONS (Super Admin OR Support) --- */}
        {(isSuperAdmin || isSupport) && (
          <div
            onClick={() => navigate("/admin/kundli")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition border border-purple-500/30"
          >
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">
              🔮 Kundli Consultations
            </h2>
            <p className="text-gray-600">View paid Kundli consultations &amp; status.</p>
          </div>
        )}

        {/* --- PRODUCT CATALOG (Super Admin OR Store Manager) --- */}
        {(isSuperAdmin || isStoreManager) && (
          <div
            onClick={() => navigate("/admin/products")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition border border-yellow-600/30"
          >
            <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
              💎 Product Catalog
            </h2>
            <p className="text-gray-600">
              Manage bracelets, rudraksha &amp; potli items{isStoreManager ? " (Prices Hidden)" : ""}.
            </p>
          </div>
        )}

        {/* --- BRACELET ORDERS (Super Admin, Store Manager, Support) --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/bracelet-orders")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-[#BC6C25] mb-2">
              📿 Bracelet Orders
            </h2>
            <p className="text-gray-600">
              View &amp; update bracelet purchases{isStoreManager ? " (Prices Hidden)" : ""}.
            </p>
          </div>
        )}

        {/* --- RUDRAKSHA ORDERS (Super Admin, Store Manager, Support) --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/rudraksha-orders")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              🌿 Rudraksha Orders
            </h2>
            <p className="text-gray-600">
              View &amp; update rudraksha purchases{isStoreManager ? " (Prices Hidden)" : ""}.
            </p>
          </div>
        )}

        {/* --- POTLI ORDERS (Super Admin, Store Manager, Support) --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/potli-orders")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-[#5D101D] mb-2">
              🎒 Potli Orders
            </h2>
            <p className="text-gray-600">
              View &amp; update potli purchases{isStoreManager ? " (Prices Hidden)" : ""}.
            </p>
          </div>
        )}

        {/* --- BLOG MANAGEMENT (Super Admin OR Marketing) --- */}
        {(isSuperAdmin || isMarketing) && (
          <div
            onClick={() => navigate("/admin/blogs")}
            className="cursor-pointer bg-white p-8 rounded-xl shadow hover:shadow-lg transition border border-[#606C33]/30"
          >
            <h2 className="text-2xl font-semibold text-[#606C33] mb-2">
              📝 Blog Management
            </h2>
            <p className="text-gray-600">
              Create, edit &amp; publish website blogs.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminHome;
