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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 relative">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Unified Admin Portal
            </h1>
            <span className="bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {role}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Access Love Reports, Kundli Consultations, E-Commerce Catalog &amp; Editorial Blog Suite
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 px-5 py-2.5 rounded-xl font-semibold text-xs transition duration-200 shadow-md flex items-center gap-2"
        >
          <span>🚪</span> Logout
        </button>
      </div>

      {/* Grid Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* --- LOVE REPORTS --- */}
        {(isSuperAdmin || isSupport) && (
          <div
            onClick={() => navigate("/admin/report-orders")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-pink-900/40 hover:border-pink-500/60 shadow-lg hover:shadow-pink-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-pink-950/60 rounded-2xl border border-pink-800/40">💕</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-950/80 px-2.5 py-1 rounded-lg border border-pink-800/30">
                Primary Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-pink-300 transition">
              Love Reports
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Manage compatibility orders, edit birth details, rebuild overlay PDFs &amp; view delivery logs.
            </p>
          </div>
        )}

        {/* --- KUNDLI CONSULTATIONS --- */}
        {(isSuperAdmin || isSupport) && (
          <div
            onClick={() => navigate("/admin/kundli")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-purple-900/40 hover:border-purple-500/60 shadow-lg hover:shadow-purple-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-purple-950/60 rounded-2xl border border-purple-800/40">🔮</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-800/30">
                Consultations
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
              Kundli Consultations
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Inspect paid Kundli analysis bookings, customer horoscopes &amp; fulfillment status.
            </p>
          </div>
        )}

        {/* --- PRODUCT CATALOG --- */}
        {(isSuperAdmin || isStoreManager) && (
          <div
            onClick={() => navigate("/admin/products")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-amber-900/40 hover:border-amber-500/60 shadow-lg hover:shadow-amber-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-amber-950/60 rounded-2xl border border-amber-800/40">💎</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800/30">
                Inventory
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
              Product Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Manage bracelets, rudraksha &amp; potli items, stock counts &amp; pricing.
            </p>
          </div>
        )}

        {/* --- BRACELET ORDERS --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/bracelet-orders")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-orange-900/40 hover:border-orange-500/60 shadow-lg hover:shadow-orange-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-orange-950/60 rounded-2xl border border-orange-800/40">📿</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2.5 py-1 rounded-lg border border-orange-800/30">
                Shop Orders
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-orange-300 transition">
              Bracelet Orders
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              View &amp; update crystal bracelet purchases and customer shipping addresses.
            </p>
          </div>
        )}

        {/* --- RUDRAKSHA ORDERS --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/rudraksha-orders")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-emerald-900/40 hover:border-emerald-500/60 shadow-lg hover:shadow-emerald-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-emerald-950/60 rounded-2xl border border-emerald-800/40">🌿</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/30">
                Shop Orders
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
              Rudraksha Orders
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Inspect 1-14 Mukhi Rudraksha orders and payment verifications.
            </p>
          </div>
        )}

        {/* --- POTLI ORDERS --- */}
        {(isSuperAdmin || isStoreManager || isSupport) && (
          <div
            onClick={() => navigate("/admin/potli-orders")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-rose-900/40 hover:border-rose-500/60 shadow-lg hover:shadow-rose-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-rose-950/60 rounded-2xl border border-rose-800/40">🎒</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-lg border border-rose-800/30">
                Shop Orders
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-rose-300 transition">
              Potli Orders
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Track sacred potli purchases and delivery updates.
            </p>
          </div>
        )}

        {/* --- BLOG MANAGEMENT --- */}
        {(isSuperAdmin || isMarketing) && (
          <div
            onClick={() => navigate("/admin/blogs")}
            className="group cursor-pointer bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-indigo-900/40 hover:border-indigo-500/60 shadow-lg hover:shadow-indigo-950/40 transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl p-3 bg-indigo-950/60 rounded-2xl border border-indigo-800/40">📝</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800/30">
                Editorial Suite
              </span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
              Blog Management
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Write &amp; publish articles with Tiptap editor, drag &amp; drop images &amp; SEO meters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
