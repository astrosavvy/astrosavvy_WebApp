import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("adminRole") || "super-admin";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin/login");
  };

  const isSuperAdmin = role === "super-admin" || role === "admin" || !role;
  const isMarketing = role === "marketing" || role === "blog-admin";
  const isStoreManager = role === "store-manager";
  const isSupport = role === "support";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-10 relative">
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-purple-950">
              Unified Admin Portal
            </h1>
            <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {role}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Access Love Reports, Kundli Consultations, E-Commerce Catalog &amp; Editorial Blog Suite
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-5 py-2.5 rounded-xl font-semibold text-xs transition duration-200 shadow-sm flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>

      {/* White Grid Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* --- LOVE REPORTS --- */}
        {(isSuperAdmin || isSupport) && (
          <div
            onClick={() => navigate("/admin/report-orders")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-pink-50 rounded-2xl border border-pink-100">💕</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                Primary Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition">
              Love Reports
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Manage compatibility orders, edit birth details, rebuild overlay PDFs &amp; view delivery logs.
            </p>
          </div>
        )}

        {/* --- KUNDLI CONSULTATIONS --- */}
        {(isSuperAdmin || isSupport) && (
          <div
            onClick={() => navigate("/admin/kundli")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-purple-50 rounded-2xl border border-purple-100">🔮</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                Consultations
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition">
              Kundli Consultations
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Inspect paid Kundli analysis bookings, customer horoscopes &amp; fulfillment status.
            </p>
          </div>
        )}

        {/* --- PRODUCT CATALOG --- */}
        {(isSuperAdmin || isStoreManager) && (
          <div
            onClick={() => navigate("/admin/products")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-amber-100 hover:border-amber-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-amber-50 rounded-2xl border border-amber-100">💎</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                Inventory
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition">
              Product Catalog
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Manage bracelets, rudraksha &amp; potli items, stock counts &amp; pricing.
            </p>
          </div>
        )}

        {/* --- BRACELET ORDERS --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/bracelet-orders")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-orange-50 rounded-2xl border border-orange-100">📿</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                Shop Orders
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition">
              Bracelet Orders
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              View &amp; update crystal bracelet purchases and customer shipping addresses.
            </p>
          </div>
        )}

        {/* --- RUDRAKSHA ORDERS --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/rudraksha-orders")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-emerald-50 rounded-2xl border border-emerald-100">🌿</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Shop Orders
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition">
              Rudraksha Orders
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Inspect 1-14 Mukhi Rudraksha orders and payment verifications.
            </p>
          </div>
        )}

        {/* --- POTLI ORDERS --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/potli-orders")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-rose-50 rounded-2xl border border-rose-100">🎒</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                Shop Orders
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition">
              Potli Orders
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Track sacred potli purchases and delivery updates.
            </p>
          </div>
        )}

        {/* --- BLOG MANAGEMENT --- */}
        {(isSuperAdmin || isMarketing) && (
          <div
            onClick={() => navigate("/admin/blogs")}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-indigo-100 hover:border-indigo-300 shadow-sm hover:shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-indigo-50 rounded-2xl border border-indigo-100">📝</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                Editorial Suite
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
              Blog Management
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Write &amp; publish articles with Tiptap editor, drag &amp; drop images &amp; SEO meters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
