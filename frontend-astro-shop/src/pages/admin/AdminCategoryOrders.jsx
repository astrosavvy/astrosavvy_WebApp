import { useEffect, useState } from "react";
import api from "../../utils/axios";

export default function AdminCategoryOrders({ category, title, color }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dispatchingId, setDispatchingId] = useState(null);

  // ===============================
  // FETCH ORDERS BY CATEGORY
  // ===============================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/shop/orders?category=${category}`);
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching category orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [category]);

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/api/shop/orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  // ===============================
  // DISPATCH VIA SHIPROCKET
  // ===============================
  const handleShiprocketDispatch = async (orderId) => {
    if (!window.confirm("Dispatch this order with Shiprocket? This will assign an AWB and schedule warehouse pickup.")) {
      return;
    }
    try {
      setDispatchingId(orderId);
      const res = await api.post(`/api/shop/shiprocket/create-shipment/${orderId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (res.data?.success) {
        const shipment = res.data.shipment || {};
        alert(`Dispatched successfully!\nCourier: ${shipment.courier_name || "Assigned"}\nAWB: ${shipment.awb_code || "Pending"}`);
        fetchOrders();
      }
    } catch (error) {
      console.error("Shiprocket dispatch error:", error);
      alert(error.response?.data?.detail || "Shiprocket dispatch failed. Please check order address and pincode.");
    } finally {
      setDispatchingId(null);
    }
  };

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-serif text-[#5D101D] animate-pulse">
        Loading {category} orders & logistics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* HEADER */}
      <div className={`mb-6 p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${color}`}>
        <div>
          <h1 className="text-3xl font-serif font-bold">
            {title}
          </h1>
          <p className="text-xs text-white/80 mt-1">
            Real-time customer purchases, Shiprocket logistics dispatch & AWB tracking
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur transition"
        >
          🔄 Refresh Orders
        </button>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
          No {category} orders found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
          <table className="min-w-full border-collapse text-sm">
            
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 text-left border-b">Customer & Contact</th>
                <th className="p-4 text-left border-b">Shipping Address</th>
                <th className="p-4 text-left border-b">Product & Price</th>
                <th className="p-4 text-left border-b">Payment</th>
                <th className="p-4 text-left border-b">Status</th>
                <th className="p-4 text-left border-b">Shiprocket Logistics</th>
                <th className="p-4 text-left border-b">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => {
                const orderId = order.id || order._id;
                const custName = order.customer_name || order.customerName || "Customer";
                const prodName = order.product_name || order.productName || "Product";
                const prodPrice = order.product_price ?? order.productPrice ?? 0;
                const orderStatus = order.order_status || order.orderStatus || "received";
                const paymentStatus = order.payment_status || order.paymentStatus || "paid";
                const createdAt = order.created_at || order.createdAt;
                const awbCode = order.awb_code;
                const courierName = order.courier_name;
                const labelUrl = order.label_url;
                const invoiceUrl = order.invoice_url;

                return (
                  <tr key={orderId} className="hover:bg-gray-50/80 transition">
                    
                    {/* CUSTOMER */}
                    <td className="p-4 align-top">
                      <div className="font-semibold text-gray-900">{custName}</div>
                      <div className="text-xs text-gray-600 mt-0.5">📞 {order.phone}</div>
                      {order.email && (
                        <div className="text-xs text-gray-500 mt-0.5">✉️ {order.email}</div>
                      )}
                    </td>

                    {/* ADDRESS */}
                    <td className="p-4 align-top max-w-xs">
                      <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                        {order.address || "Address not provided"}
                      </p>
                      {order.pincode && (
                        <span className="inline-block mt-1 text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                          PIN: {order.pincode}
                        </span>
                      )}
                    </td>

                    {/* PRODUCT */}
                    <td className="p-4 align-top">
                      <div className="font-medium text-gray-800">{prodName}</div>
                      <div className="font-bold text-[#8B0000] mt-1">
                        {localStorage.getItem("adminRole") === "store-manager"
                          ? "🔒 Restricted"
                          : `₹${Number(prodPrice).toLocaleString("en-IN")}`}
                      </div>
                    </td>

                    {/* PAYMENT */}
                    <td className="p-4 align-top">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {paymentStatus}
                      </span>
                      {order.payment_id && (
                        <div className="text-[10px] text-gray-400 font-mono mt-1 truncate max-w-[120px]" title={order.payment_id}>
                          {order.payment_id}
                        </div>
                      )}
                    </td>

                    {/* ORDER STATUS */}
                    <td className="p-4 align-top">
                      <select
                        value={orderStatus}
                        onChange={(e) => handleStatusChange(orderId, e.target.value)}
                        className="border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-medium bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      >
                        <option value="received">Received</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* SHIPROCKET LOGISTICS */}
                    <td className="p-4 align-top">
                      {awbCode ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-gray-800">
                              {courierName || "Courier Assigned"}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded inline-block">
                            AWB: {awbCode}
                          </div>
                          <div className="flex gap-2 pt-1 flex-wrap">
                            {labelUrl && (
                              <a
                                href={labelUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold px-2 py-0.5 rounded transition"
                              >
                                🏷️ Label
                              </a>
                            )}
                            {invoiceUrl && (
                              <a
                                href={invoiceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-[11px] font-semibold px-2 py-0.5 rounded transition"
                              >
                                🧾 Invoice
                              </a>
                            )}
                            <a
                              href={`https://shiprocket.co//tracking/${awbCode}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-[11px] font-semibold px-2 py-0.5 rounded transition"
                            >
                              📍 Track
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => handleShiprocketDispatch(orderId)}
                            disabled={dispatchingId === orderId}
                            className="bg-[#5D101D] hover:bg-[#3D0A13] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50 flex items-center gap-1.5"
                          >
                            <span>🚀</span>
                            {dispatchingId === orderId ? "Dispatching..." : "Ship via Shiprocket"}
                          </button>
                          <p className="text-[10px] text-gray-400 mt-1">1-Click Auto AWB & Label</p>
                        </div>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="p-4 align-top text-xs text-gray-500 whitespace-nowrap">
                      {createdAt ? new Date(createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      }) : "-"}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
