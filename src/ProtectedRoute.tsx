import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');

  
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // If token exists, render the child routes (Dashboard, Tax, etc.)
  return <Outlet />;
};

export default ProtectedRoute;