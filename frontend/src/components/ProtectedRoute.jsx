import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
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
