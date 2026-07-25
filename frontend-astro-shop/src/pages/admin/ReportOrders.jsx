import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderDetailDrawer from "../../components/admin/OrderDetailDrawer";

const ReportOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const currentToken = localStorage.getItem("adminToken");
    return {
      Authorization: `Bearer ${currentToken}`,
      "X-Admin-Token": currentToken,
    };
  };

  const fetchReportOrders = async () => {
    const currentToken = localStorage.getItem("adminToken");
    if (!currentToken) {
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com"}/api/admin/orders`,
        {
          headers: getAuthHeaders(),
        }
      );
      setOrders(res.data.orders || res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch love report orders:", err);
      setError("Failed to load love report orders. Please verify admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("adminToken");
    if (!currentToken) {
      navigate("/admin/login");
      return;
    }
    fetchReportOrders();
  }, []);

  const handleTriggerGenerate = async (e, orderId) => {
    e.stopPropagation();
    if (!window.confirm("Trigger PDF report generation for this order now?")) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com"}/api/admin/orders/${orderId}/generate`,
        {},
        { headers: getAuthHeaders() }
      );
      alert("Report generation triggered!");
      fetchReportOrders();
    } catch (err) {
      alert("Failed to trigger generation: " + (err.response?.data?.detail || err.message));
    }
  };

  const filteredOrders = orders.filter((o) => {
    const custName = (o.customers?.full_name || o.customer_name || "").toLowerCase();
    const custEmail = (o.customers?.email || o.email || "").toLowerCase();
    const refId = (o.reference_id || o.id || "").toLowerCase();
    const matchSearch =
      custName.includes(searchTerm.toLowerCase()) ||
      custEmail.includes(searchTerm.toLowerCase()) ||
      refId.includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "all" ||
      (o.order_status || o.status || "").toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && statusMatch;
  });

  const totalOrders = orders.length;
  const deliveredCount = orders.filter((o) =>
    ["delivered", "completed"].includes((o.order_status || o.status || "").toLowerCase())
  ).length;
  const pendingCount = orders.filter((o) =>
    ["pending", "generating", "processing", "paid"].includes((o.order_status || o.status || "").toLowerCase())
  ).length;
  const totalRevenue = totalOrders * 499;

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "paid" || s === "completed" || s === "delivered") {
      return "bg-emerald-100 text-emerald-800 border border-emerald-300";
    }
    if (s === "generating" || s === "processing") {
      return "bg-purple-100 text-purple-800 border border-purple-300";
    }
    if (s === "pending") {
      return "bg-amber-100 text-amber-800 border border-amber-300";
    }
    return "bg-gray-100 text-gray-800 border border-gray-300";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-purple-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mb-4"></div>
        <p className="text-sm font-semibold text-purple-800">Loading Cosmic Love Report Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* White Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">💕</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-purple-950">
                Cosmic Love Report Orders
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Click any order row to open the floating detail modal, edit birth details, rebuild PDFs &amp; view logs.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition text-xs flex items-center gap-2 border border-gray-300"
          >
            ← Back to Unified Portal
          </button>
        </div>

        {/* White Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Total Love Reports</span>
            <div className="text-3xl font-black text-gray-900 mt-1">{totalOrders}</div>
            <p className="text-[11px] text-gray-500 mt-1">Lifetime customer orders</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Delivered &amp; Ready</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{deliveredCount}</div>
            <p className="text-[11px] text-gray-500 mt-1">PDFs active on Supabase CDN</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Pending / Processing</span>
            <div className="text-3xl font-black text-amber-600 mt-1">{pendingCount}</div>
            <p className="text-[11px] text-gray-500 mt-1">Queued for compilation</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Gross Revenue</span>
            <div className="text-3xl font-black text-indigo-600 mt-1">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-[11px] text-gray-500 mt-1">@ ₹499 per compatibility report</p>
          </div>
        </div>

        {/* White Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="🔍 Search customer name, email, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {["all", "pending", "paid", "processing", "delivered"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                  statusFilter === st
                    ? "bg-purple-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs">
            {error}
          </div>
        )}

        {/* White Interactive Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-purple-50 text-purple-900 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Ref / Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Birth Coordinates</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Order Date</th>
                  <th className="px-6 py-4 text-center">Inspect / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400">
                      No report orders matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => setSelectedOrderId(o.id)}
                      className="hover:bg-purple-50/60 cursor-pointer transition group"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-purple-900 group-hover:text-purple-700">
                        #{o.reference_id || o.id?.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {o.customers?.full_name || o.customer_name || "N/A"}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate max-w-[200px]">
                          {o.customers?.email || o.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[11px]">
                        <div className="text-gray-800">📅 {o.p1_dob || o.dob || "N/A"} ⏰ {o.p1_tob || o.tob || ""}</div>
                        <div className="text-gray-500 truncate max-w-[180px]">📍 {o.p1_place || o.place || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(
                            o.order_status || o.status
                          )}`}
                        >
                          {o.order_status || o.status || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[11px] text-gray-500">
                        {o.created_at ? new Date(o.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedOrderId(o.id)}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 text-[11px] px-3 py-1.5 rounded-lg transition font-semibold"
                          >
                            🔍 Inspect
                          </button>
                          <button
                            onClick={(e) => handleTriggerGenerate(e, o.id)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 text-[11px] px-3 py-1.5 rounded-lg transition"
                          >
                            🔄 Rebuild
                          </button>
                          {o.pdf_url && (
                            <a
                              href={o.pdf_url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-[11px] px-3 py-1.5 rounded-lg transition font-semibold"
                            >
                              📄 PDF
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Center Modal */}
      {selectedOrderId && (
        <OrderDetailDrawer
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          onRefresh={fetchReportOrders}
        />
      )}
    </div>
  );
};

export default ReportOrders;
