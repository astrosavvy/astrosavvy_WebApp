import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReportOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const fetchReportOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
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
    if (!token) {
      navigate("/admin-login");
      return;
    }
    fetchReportOrders();
  }, []);

  const handleTriggerGenerate = async (orderId) => {
    if (!window.confirm("Trigger report generation for this order now?")) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/admin/orders/${orderId}/generate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
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

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "paid" || s === "completed" || s === "delivered") {
      return "bg-green-100 text-green-800";
    }
    if (s === "generating" || s === "processing") {
      return "bg-blue-100 text-blue-800";
    }
    if (s === "pending") {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-900">💕 Cosmic Love Report Orders</h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage report generation, customer details &amp; PDF deliveries ({orders.length} total orders)
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="mt-4 md:mt-0 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Admin
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by customer name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing / Generating</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-purple-50 text-purple-900 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Ref / ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Birth Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No report orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-purple-50/50 transition">
                      <td className="px-6 py-4 font-mono font-medium text-purple-900">
                        {o.reference_id || o.id?.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {o.customers?.full_name || o.customer_name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {o.customers?.email || o.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div>📅 {o.dob || "N/A"} ⏰ {o.tob || ""}</div>
                        <div className="text-gray-500">📍 {o.place || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusBadge(
                            o.order_status || o.status
                          )}`}
                        >
                          {o.order_status || o.status || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {o.created_at ? new Date(o.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleTriggerGenerate(o.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
                          >
                            Generate PDF
                          </button>
                          {o.pdf_url && (
                            <a
                              href={o.pdf_url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
                            >
                              View PDF
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
    </div>
  );
};

export default ReportOrders;
