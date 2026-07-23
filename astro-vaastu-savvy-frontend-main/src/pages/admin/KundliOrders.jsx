import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [kundlis, setKundlis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }

    const fetchKundlis = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/shop/kundli/paid",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setKundlis(res.data.data || []);
      } catch (err) {
        console.error("Admin fetch error:", err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          setError(
            `Auth failed (${err.response.status}): Token may be expired or your role is not super-admin. Try logging out and back in.`
          );
        } else if (err.response?.status === 404) {
          setError(
            "404: Route /api/kundli/paid not found. Check your backend routes and server.js."
          );
        } else if (!err.response) {
          setError(
            `Network error: Cannot reach ${import.meta.env.VITE_API_URL}. Check VITE_API_URL in your .env file.`
          );
        } else {
          setError(
            `Error ${err.response?.status}: ${err.response?.data?.message || err.message}`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKundlis();
  }, [navigate, token]);

  // 📊 EXPORT TO EXCEL
  const exportToExcel = () => {
    if (!kundlis.length) return;
    const worksheet = XLSX.utils.json_to_sheet(kundlis);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Paid Kundlis");
    XLSX.writeFile(workbook, "paid_kundlis.xlsx");
  };

  // 📄 EXPORT TO PDF
  const exportToPDF = () => {
    if (!kundlis.length) return;
    const doc = new jsPDF();
    doc.text("Paid Kundli Consultations", 14, 15);
    const tableData = kundlis.map((k, index) => [
      index + 1,
      k.fullName || "-",
      k.email || "-",
      k.phone || "-",
      k.razorpayPaymentId || "-",
      k.dateOfBirth || "-",
      k.timeOfBirth || "-",
      k.placeOfBirth || "-",
      k.gender || "-",
      new Date(k.createdAt).toLocaleDateString(),
    ]);
    doc.autoTable({
      head: [[
        "#", "Name", "Email", "Phone", "Payment ID",
        "DOB", "Birth Time", "Birth Place", "Gender", "Submitted On",
      ]],
      body: tableData,
      startY: 25,
      styles: { fontSize: 8 },
    });
    doc.save("paid_kundlis.pdf");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin-login");
  };

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading kundli consultations...</p>
        </div>
      </div>
    );
  }

  // ── ERROR STATE (shows exactly what went wrong instead of silent redirect) ──
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            Failed to Load Data
          </h2>
          <p className="text-gray-600 text-sm bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left font-mono">
            {error}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
            >
              Retry
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Logout & Re-login
            </button>
          </div>

          {/* DEBUG INFO */}
          <div className="mt-6 text-left bg-gray-50 border rounded-lg p-4 text-xs text-gray-500">
            <p className="font-semibold mb-2 text-gray-700">Debug Info:</p>
            <p>
              VITE_API_URL:{" "}
              <span className="font-mono">
                {import.meta.env.VITE_API_URL || "❌ NOT SET"}
              </span>
            </p>
            <p>
              Token in localStorage:{" "}
              <span className="font-mono">
                {token ? "✅ Present" : "❌ Missing"}
              </span>
            </p>
            <p>
              Expected endpoint:{" "}
              <span className="font-mono">
                {import.meta.env.VITE_API_URL}/api/kundli/paid
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🔍 FILTER LOGIC
  const filteredKundlis = kundlis.filter((k) => {
    const matchesSearch =
      k.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.phone?.includes(searchTerm);

    const matchesDate = selectedDate
      ? new Date(k.createdAt).toISOString().slice(0, 10) === selectedDate
      : true;

    return matchesSearch && matchesDate;
  });

  // ── MAIN UI ──
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-purple-700">
            Paid Kundli Consultations
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {kundlis.length} total record{kundlis.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            ← Back
          </button>
          <button
            onClick={exportToExcel}
            disabled={!kundlis.length}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export Excel
          </button>
          <button
            onClick={exportToPDF}
            disabled={!kundlis.length}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export PDF
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button
          onClick={() => { setSearchTerm(""); setSelectedDate(""); }}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      {/* RESULTS COUNT */}
      {(searchTerm || selectedDate) && (
        <p className="text-sm text-gray-500 mb-3">
          Showing {filteredKundlis.length} of {kundlis.length} records
        </p>
      )}

      {/* TABLE */}
      {filteredKundlis.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
          {kundlis.length === 0
            ? "No paid consultations found. No paid entries exist yet in the database."
            : "No results match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Birth Time</th>
                <th className="p-3 text-left">Birth Place</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Payment ID</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredKundlis.map((k, index) => (
                <tr
                  key={k._id}
                  className="border-b hover:bg-purple-50 text-sm transition-colors"
                >
                  <td className="p-3 text-gray-400">{index + 1}</td>
                  <td className="p-3 font-medium">{k.fullName}</td>
                  <td className="p-3 text-gray-600">{k.email}</td>
                  <td className="p-3">{k.phone}</td>
                  <td className="p-3">{k.dateOfBirth}</td>
                  <td className="p-3">{k.timeOfBirth}</td>
                  <td className="p-3">{k.placeOfBirth}</td>
                  <td className="p-3">{k.gender || "-"}</td>
                  <td className="p-3 font-mono text-xs text-gray-500">
                    {k.razorpayPaymentId || "-"}
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(k.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;