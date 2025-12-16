import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If not logged in → go to auth page
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
