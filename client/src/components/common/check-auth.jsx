import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("CheckAuth:", { 
    pathname: location.pathname, 
    isAuthenticated, 
    userRole: user?.role 
  });

  // Root path handling
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Authentication required paths
  if (!isAuthenticated && 
      !location.pathname.includes("/login") && 
      !location.pathname.includes("/register")) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  // Authenticated user trying to access auth pages
  if (isAuthenticated && 
      (location.pathname.includes("/login") || 
       location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Role-based access control
  if (isAuthenticated && user?.role !== "admin" && 
      location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  if (isAuthenticated && user?.role === "admin" && 
      location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Protected routes that require authentication
  if (!isAuthenticated && 
      (location.pathname.includes("/account") || 
       location.pathname.includes("/checkout"))) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  return children;
}

export default CheckAuth;
