import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({isAuthenticated, user, children}) => {
  const location = useLocation();

  // If the user is not authenticated and not on the login or register page
  // redirect them to the login page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated and on the login page
  // redirect them to their dashboard based on their role
  if (isAuthenticated && location.pathname.includes("/login")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If the user is authenticated but has the wrong role
  // redirect them to the unauth-page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // If the user is authenticated and has the wrong role
  // redirect them to the admin dashboard
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If the user is authenticated and has the right role
  // render the children components
  return <>{children}</>;
  F;
};

export default CheckAuth;

