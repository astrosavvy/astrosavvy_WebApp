import { useEffect, useState } from "react";
import api from "../../utils/axios";

export default function AdminCategoryOrders({ category, title, color }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // Refresh list after update
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading {category} orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* HEADER */}
      <div className={`mb-6 p-4 rounded-lg text-white ${color}`}>
        <h1 className="text-2xl font-semibold">
          {title}
        </h1>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
          No {category} orders found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border text-sm">
            
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Payment</th>
                <th className="p-3 border">Order Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  
                  <td className="p-3 border font-medium">
                    {order.customerName}
                  </td>

                  <td className="p-3 border">
                    {order.phone}
                  </td>

                  <td className="p-3 border">
                    {order.email || "-"}
                  </td>

                  <td className="p-3 border">
                    {order.productName}
                  </td>

                  <td className="p-3 border font-semibold">
                    {localStorage.getItem("adminRole") === "store-manager"
                      ? "🔒 Restricted"
                      : `₹${order.productPrice || order.product_price || 0}`}
                  </td>

                  <td className="p-3 border capitalize">
                    {order.paymentStatus}
                  </td>

                  <td className="p-3 border">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="received">Received</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-3 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
