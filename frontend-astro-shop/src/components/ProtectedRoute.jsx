import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const logoutDueToInactivity = () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      alert("🔒 Session expired due to 5 minutes of inactivity. Please log in again.");
      navigate("/admin/login", { replace: true });
    };

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logoutDueToInactivity, INACTIVITY_LIMIT_MS);
    };

    // Initial timer setup
    resetTimer();

    // Event listeners to detect user activity
    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = role === "super-admin" || allowedRoles.includes(role);
    if (!isAllowed) {
      alert(`Access denied for role '${role}'. Required role: ${allowedRoles.join(" or ")}.`);
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
