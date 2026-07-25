import { useState, useEffect } from "react";
import axios from "axios";

const OrderDetailDrawer = ({ orderId, onClose, onRefresh }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [order, setOrder] = useState(null);
  const [emailLogs, setEmailLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingDetails, setSavingDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Editable birth details state
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [p1Name, setP1Name] = useState("");
  const [p1Gender, setP1Gender] = useState("Male");
  const [p1Dob, setP1Dob] = useState("");
  const [p1Tob, setP1Tob] = useState("");
  const [p1Place, setP1Place] = useState("");

  const [p2Name, setP2Name] = useState("");
  const [p2Gender, setP2Gender] = useState("Female");
  const [p2Dob, setP2Dob] = useState("");
  const [p2Tob, setP2Tob] = useState("");
  const [p2Place, setP2Place] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      Authorization: `Bearer ${token}`,
      "X-Admin-Token": token,
    };
  };

  const fetchOrderDetail = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      const res = await axios.get(`${API_URL}/api/admin/orders/${orderId}`, {
        headers: getAuthHeaders(),
      });

      const o = res.data.order;
      setOrder(o);
      setEmailLogs(res.data.email_logs || []);

      if (o) {
        setCustomerName(o.customers?.full_name || o.customer_name || "");
        setEmail(o.customers?.email || o.email || "");
        setMobile(o.customers?.mobile || o.mobile || "");

        setP1Name(o.p1_name || o.customers?.full_name || "Person A");
        setP1Gender(o.p1_gender || o.gender || "Male");
        setP1Dob(o.p1_dob || o.dob || "");
        setP1Tob(o.p1_tob || o.tob || "");
        setP1Place(o.p1_place || o.place || "");

        setP2Name(o.p2_name || "Person B");
        setP2Gender(o.p2_gender || "Female");
        setP2Dob(o.p2_dob || "");
        setP2Tob(o.p2_tob || "");
        setP2Place(o.p2_place || "");
      }
    } catch (err) {
      console.error("Failed to fetch order detail:", err);
      alert("Failed to load order detail.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const handleSaveDetails = async (rebuild = false) => {
    try {
      setSavingDetails(true);
      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/details`,
        {
          customer_name: customerName,
          email,
          mobile,
          p1_name: p1Name,
          p1_gender: p1Gender,
          p1_dob: p1Dob,
          p1_tob: p1Tob,
          p1_place: p1Place,
          p2_name: p2Name,
          p2_gender: p2Gender,
          p2_dob: p2Dob,
          p2_tob: p2Tob,
          p2_place: p2Place,
        },
        { headers: getAuthHeaders() }
      );

      if (rebuild) {
        await handleTriggerRegenerate();
      } else {
        alert("Order details saved successfully!");
        fetchOrderDetail();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Failed to save details: " + (err.response?.data?.detail || err.message));
    } finally {
      setSavingDetails(false);
    }
  };

  const handleTriggerRegenerate = async () => {
    try {
      setActionLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      await axios.post(
        `${API_URL}/api/admin/orders/${orderId}/generate`,
        {},
        { headers: getAuthHeaders() }
      );
      alert("PDF Regeneration triggered cleanly!");
      fetchOrderDetail();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert("Regeneration failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      setActionLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      await axios.post(
        `${API_URL}/api/admin/orders/${orderId}/resend-confirmation`,
        {},
        { headers: getAuthHeaders() }
      );
      alert("Order confirmation email resent via SendPulse!");
      fetchOrderDetail();
    } catch (err) {
      alert("Resend failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "paid" || s === "completed" || s === "delivered")
      return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
    if (s === "generating" || s === "processing")
      return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
    return "bg-gray-500/10 text-gray-600 border border-gray-500/20";
  };

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-purple-300 font-mono">
                Order #{order?.reference_id || orderId.slice(0, 8)}
              </h2>
              {order && (
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusBadge(
                    order.order_status || order.status
                  )}`}
                >
                  {order.order_status || order.status || "pending"}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Customer: <span className="text-white font-medium">{customerName || "N/A"}</span> • {email || "No email"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3">
          {[
            { id: "overview", label: "💳 Overview & Payment" },
            { id: "edit", label: "✏️ Edit Birth Details" },
            { id: "audit", label: "📜 Customer Audit Trail" },
            { id: "pdf", label: "📄 PDF Suite & Actions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-xs font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? "border-purple-700 text-purple-900 bg-white rounded-t-lg shadow-sm"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-purple-900">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700 mb-3"></div>
              <p className="text-xs font-semibold">Loading detailed order intelligence...</p>
            </div>
          ) : (
            <>
              {/* --- TAB 1: OVERVIEW & PAYMENT --- */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Customer Quick Launchpad */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      👤 Customer Profile & Contact Launchpad
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                        <span className="text-[10px] text-purple-700 font-bold uppercase">Full Name</span>
                        <p className="text-sm font-semibold text-slate-800">{customerName || "N/A"}</p>
                      </div>
                      <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                        <span className="text-[10px] text-purple-700 font-bold uppercase">Email Address</span>
                        <p className="text-sm font-semibold text-slate-800 truncate">{email || "N/A"}</p>
                      </div>
                      <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                        <span className="text-[10px] text-purple-700 font-bold uppercase">Mobile Number</span>
                        <p className="text-sm font-semibold text-slate-800">{mobile || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
                      {email && (
                        <a
                          href={`mailto:${email}`}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                        >
                          ✉️ Send Email
                        </a>
                      )}
                      {mobile && (
                        <a
                          href={`https://wa.me/${mobile.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                        >
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      💳 Transaction & Payment Details
                    </h3>
                    <div className="space-y-3">
                      {order?.payments && order.payments.length > 0 ? (
                        order.payments.map((p, idx) => (
                          <div
                            key={p.id || idx}
                            className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-purple-900">
                                  {p.razorpay_payment_id || "Razorpay Txn"}
                                </span>
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">
                                  {p.status || "Captured"}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 font-mono">
                                Order ID: {p.razorpay_order_id || "N/A"}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-bold text-slate-900">
                                ₹{p.amount || "499.00"}
                              </span>
                              <p className="text-[10px] text-slate-400">
                                {p.created_at ? new Date(p.created_at).toLocaleString() : ""}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-500">
                          Base Order Amount: <span className="font-bold text-slate-800">₹499.00 INR</span> (Standard Love Compatibility Report)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Operational SLAs */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      ⏱️ Fulfillment Turnaround & SLA
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Order Placed:</span>
                      <span className="font-medium text-slate-800">
                        {order?.created_at ? new Date(order.created_at).toLocaleString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mt-2">
                      <span>PDF Status:</span>
                      <span className="font-medium text-purple-700 uppercase">
                        {order?.pdf_url ? "Generated & Storage CDN Ready" : "Pending Overlay Compilation"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 2: EDIT BIRTH DETAILS & REBUILD --- */}
              {activeTab === "edit" && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                    <span>💡</span>
                    <div>
                      <strong>Need to correct birth coordinates?</strong>
                      <p className="mt-0.5">
                        Updating dates, times, or places below will update the database records. Click <strong>Save &amp; Rebuild PDF</strong> to instantly re-calculate planetary positions via VedAstro and generate a fresh PDF report!
                      </p>
                    </div>
                  </div>

                  {/* Person A Form */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-2">
                      <span>👦</span> Person A Details (Partner 1)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={p1Name}
                          onChange={(e) => setP1Name(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gender</label>
                        <select
                          value={p1Gender}
                          onChange={(e) => setP1Gender(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={p1Dob}
                          onChange={(e) => setP1Dob(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Time of Birth</label>
                        <input
                          type="time"
                          value={p1Tob}
                          onChange={(e) => setP1Tob(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Place of Birth</label>
                        <input
                          type="text"
                          value={p1Place}
                          onChange={(e) => setP1Place(e.target.value)}
                          placeholder="City, State, Country"
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Person B Form */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-pink-900 uppercase tracking-wider flex items-center gap-2">
                      <span>👧</span> Person B Details (Partner 2)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={p2Name}
                          onChange={(e) => setP2Name(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gender</label>
                        <select
                          value={p2Gender}
                          onChange={(e) => setP2Gender(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={p2Dob}
                          onChange={(e) => setP2Dob(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Time of Birth</label>
                        <input
                          type="time"
                          value={p2Tob}
                          onChange={(e) => setP2Tob(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Place of Birth</label>
                        <input
                          type="text"
                          value={p2Place}
                          onChange={(e) => setP2Place(e.target.value)}
                          placeholder="City, State, Country"
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleSaveDetails(false)}
                      disabled={savingDetails}
                      className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl text-xs transition"
                    >
                      {savingDetails ? "Saving..." : "💾 Save Details Only"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveDetails(true)}
                      disabled={savingDetails || actionLoading}
                      className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl text-xs shadow-md transition"
                    >
                      {savingDetails || actionLoading ? "Processing..." : "✨ Save & Rebuild PDF Report"}
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 3: CUSTOMER AUDIT TRAIL & LOGS --- */}
              {activeTab === "audit" && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      📜 Order Audit &amp; Communications Lifecycle
                    </h3>

                    <div className="relative border-l-2 border-purple-200 ml-4 space-y-6">
                      {/* Step 1: Order Placed */}
                      <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                          1
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">🛒 Order Created</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Order #{order?.reference_id || orderId.slice(0, 8)} registered in Supabase.
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {order?.created_at ? new Date(order.created_at).toLocaleString() : ""}
                        </span>
                      </div>

                      {/* Step 2: Payment Verified */}
                      <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                          2
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">💳 Payment Verified</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Razorpay payment status: <strong className="text-emerald-600">Captured</strong>
                        </p>
                      </div>

                      {/* Step 3: PDF Generation */}
                      <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                          3
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">⚙️ PDF Overlay Compilation</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          PyMuPDF overlay generated on <code className="text-purple-700 font-mono">Blank Report Revised.pdf</code> using VedAstro calculations.
                        </p>
                      </div>

                      {/* Step 4: Storage Upload */}
                      <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                          4
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">☁️ Supabase Storage CDN Upload</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Uploaded to public bucket <code className="text-slate-700">reports/</code>.
                        </p>
                        {order?.pdf_url && (
                          <a
                            href={order.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-purple-600 underline font-mono block mt-1"
                          >
                            View CDN File URL →
                          </a>
                        )}
                      </div>

                      {/* Step 5: Email Delivery */}
                      <div className="relative pl-6">
                        <div className="absolute -left-2.5 top-0.5 w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-bold">
                          5
                        </div>
                        <h4 className="text-xs font-bold text-slate-800">✉️ Email Delivery via SendPulse SMTP</h4>
                        {emailLogs.length > 0 ? (
                          emailLogs.map((l, i) => (
                            <div key={i} className="text-[11px] text-slate-600 mt-1 font-mono bg-slate-100 p-2 rounded">
                              Type: {l.email_type} • To: {l.recipient} • Status: <strong className="text-emerald-600">{l.status}</strong> ({new Date(l.sent_at).toLocaleString()})
                            </div>
                          ))
                        ) : (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Confirmation/Report email dispatched to {email}.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 4: PDF SUITE & ACTIONS --- */}
              {activeTab === "pdf" && (
                <div className="space-y-6">
                  {/* Action Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={handleTriggerRegenerate}
                      disabled={actionLoading}
                      className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>🔄</span> Regenerate PDF Report
                    </button>
                    <button
                      onClick={handleResendConfirmation}
                      disabled={actionLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-sm transition flex items-center justify-center gap-2"
                    >
                      <span>✉️</span> Resend Email Notification
                    </button>
                    {order?.pdf_url ? (
                      <a
                        href={order.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-sm transition flex items-center justify-center gap-2 text-center"
                      >
                        <span>📥</span> Download PDF Report
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-xl text-xs cursor-not-allowed text-center"
                      >
                        No PDF Available
                      </button>
                    )}
                  </div>

                  {/* Live PDF Viewer */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      📄 Live Report PDF Preview
                    </h3>
                    {order?.pdf_url ? (
                      <iframe
                        src={order.pdf_url}
                        title="Love Report PDF Preview"
                        className="w-full h-[500px] rounded-lg border border-slate-200"
                      />
                    ) : (
                      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg text-xs text-slate-400 border border-dashed border-slate-300">
                        No PDF has been generated yet. Click &ldquo;Regenerate PDF Report&rdquo; above to build it.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailDrawer;
