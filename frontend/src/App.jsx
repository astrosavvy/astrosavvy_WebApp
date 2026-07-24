// ==============================
// REACT ROUTER IMPORTS
// ==============================
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// ==============================
// COMMON COMPONENTS
// ==============================
import Navbar from "./components/Navigation/navbar-temp.jsx";
import PromptBox from "./components/PromptBox/PromptBox";
import ConsultationPopup from "./components/ConsultationPopup";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

// ==============================
// PUBLIC PAGES
// ==============================
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Blogs from "./pages/Blogs.jsx";
import Shop from "./pages/Shop.jsx";
import Contact from "./pages/Contact.jsx";
import KundliAnalysis from "./pages/KundliAnalysis";
import ThankYou from "./pages/ThankYou";
import Mahashivratri from "./pages/Mahashivratri";

// ==============================
// SHOP / PRODUCT PAGES
// ==============================
import BraceletDetails from "./pages/BraceletDetails..jsx";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductPayment from "./pages/ProductPayment";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";
import ProductDetails from "./pages/ProductDetails";
import RudrakshaCategory from "./pages/RudrakshaCategory";
import RudrakshaDetails from "./pages/RudrakshaDeatils.jsx";
import Bracelets from "./pages/Bracelets";
import Rudraksha from "./pages/Rudraksha";
import Potli from "./pages/Potli";

// ==============================
// ADMIN PAGES
// ==============================
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AdminKundli from "./pages/admin/KundliOrders.jsx";
import ReportOrders from "./pages/admin/ReportOrders.jsx";
import AdminOrders from "./pages/admin/AdminOrders";
import KundliOrders from "./pages/admin/KundliOrders.jsx";
import RudrakshaOrders from "./pages/admin/RudrakshaOrders.jsx";
import BraceletOrders from "./pages/admin/BraceletOrders.jsx";
import PotliOrders from "./pages/admin/PotliOrders.jsx";
import AdminBlogs from "./pages/admin/AdminBlogs";
import CreateBlog from "./pages/admin/CreateBlog";
import EditBlog from "./pages/admin/EditBlog";
import BlogDetails from "./pages/BlogDetails";

// ── NEW: Product Admin Pages ──────────────────────────────────────────────────
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";

// ==============================
// META PIXEL TRACKING
// ==============================
import { trackPageView } from "./utils/metaPixel";

// ==============================
// LEGAL PAGES
// ==============================
import ReturnPolicy from "./pages/ReturnPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

/* =====================================================
   LAYOUT COMPONENT
===================================================== */
const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  useEffect(() => {
    const baseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
    fetch(`${baseUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => console.log("Backend Connected:", data))
      .catch((err) => console.log("Backend Offline:", err));
  }, []);

  return (
    <>
      {!isAdminRoute && <ConsultationPopup />}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/maha-shivratri" element={<Mahashivratri />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/kundli-analysis" element={<KundliAnalysis />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />

        {/* ================= SHOP ROUTES ================= */}
        <Route path="/shop/bracelets" element={<Bracelets />} />
        <Route path="/shop/rudraksha" element={<Rudraksha />} />
        <Route path="/shop/potli" element={<Potli />} />

        {/* ================= PRODUCT DETAIL ROUTES ================= */}
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/bracelet/:slug" element={<ProductDetails />} />
        <Route path="/rudraksha/:slug" element={<RudrakshaDetails />} />
        <Route path="/potli/:slug" element={<ProductDetails />} />

        {/* ================= CART / PAYMENT ================= */}
        <Route path="/bracelet-details" element={<BraceletDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-payment" element={<ProductPayment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ================= PROTECTED ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kundli"
          element={
            <ProtectedRoute>
              <AdminKundli />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bracelet-orders"
          element={
            <ProtectedRoute allowedRoles={["store-manager", "support"]}>
              <BraceletOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rudraksha-orders"
          element={
            <ProtectedRoute allowedRoles={["store-manager", "support"]}>
              <RudrakshaOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/potli-orders"
          element={
            <ProtectedRoute allowedRoles={["store-manager", "support"]}>
              <PotliOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kundli-orders"
          element={
            <ProtectedRoute allowedRoles={["support"]}>
              <KundliOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kundli"
          element={
            <ProtectedRoute allowedRoles={["support"]}>
              <KundliOrders />
            </ProtectedRoute>
          }
        />

        {/* ADMIN BLOGS */}
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute allowedRoles={["marketing", "blog-admin"]}>
              <AdminBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-blog"
          element={
            <ProtectedRoute allowedRoles={["marketing", "blog-admin"]}>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-blog/:id"
          element={
            <ProtectedRoute allowedRoles={["marketing", "blog-admin"]}>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        {/* ── NEW: ADMIN LOVE REPORT ORDERS ── */}
        <Route
          path="/admin/report-orders"
          element={
            <ProtectedRoute allowedRoles={["support"]}>
              <ReportOrders />
            </ProtectedRoute>
          }
        />

        {/* ── NEW: ADMIN PRODUCTS ── */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["store-manager"]}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute allowedRoles={["store-manager"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

      </Routes>

      {!isAdminRoute && !isHomePage && <Footer />}
      {!isAdminRoute && <PromptBox />}
    </>
  );
};

/* =====================================================
   APP WRAPPER
===================================================== */
function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Layout />
    </BrowserRouter>
  );
}

export default App;