import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import CheckAuth from "./components/common/check-auth";
import { Skeleton } from "./components/ui/skeleton";
import AllUsersList from "./components/admin-view/all-users-list";
import Analytics from "./pages/admin-view/analaytics";

// Lazy-loaded components
const Authlayout = lazy(() => import("./components/auth/layout"));
const AuthLogin = lazy(() => import("./pages/auth/login"));
const AuthRegister = lazy(() => import("./pages/auth/register"));
const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/products"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features"));
const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/account"));
const NotFound = lazy(() => import("./pages/not-found"));
const UnauthPage = lazy(() => import("./pages/unauth-page"));
const PaypalReturn = lazy(() => import("./pages/shopping-view/paypal-return"));
const PaymentSuccess = lazy(() =>
  import("./pages/shopping-view/payment-success")
);
const SearchProducts = lazy(() => import("./pages/shopping-view/search"));

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Skeleton className="w-full h-full bg-gray-200 " />
      </div>
    );

  return (
    <>
      <div className="flex flex-col min-h-screen w-full overflow-hidden bg-white">
        <Suspense
          fallback={<Skeleton className="w-full h-full bg-gray-200 " />}
        >
          <Routes>
            {/* auth routes */}

            <Route
              path="/"
              element={
                <CheckAuth
                  isAuthenticated={isAuthenticated}
                  user={user}
                ></CheckAuth>
              }
            />

            <Route
              path="/auth"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <Authlayout />
                </CheckAuth>
              }
            >
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
            </Route>

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="features" element={<AdminFeatures />} />
              <Route path="users" element={<AllUsersList />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>

            {/* shopview routes */}
            <Route
              path="/shop"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout />
                </CheckAuth>
              }
            >
              <Route path="listing" element={<ShoppingListing />} />
              <Route path="checkout" element={<ShoppingCheckout />} />
              <Route path="home" element={<ShoppingHome />} />
              <Route path="account" element={<ShoppingAccount />} />
              <Route path="paypal-return" element={<PaypalReturn />} />
              <Route path="paypal-success" element={<PaymentSuccess />} />
              <Route path="search" element={<SearchProducts />} />
            </Route>

            {/* unauthorized route */}
            <Route path="/unauth-page" element={<UnauthPage />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
  J;
}

export default App;
