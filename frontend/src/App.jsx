import { Route, Routes } from "react-router-dom";
import Authlayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturn from "./pages/shopping-view/paypal-return";
import PaymentSuccess from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

function App() {
  
const{isAuthenticated, user, isLoading}= useSelector(state=>state.auth);

const dispatch =useDispatch();

useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);

if(isLoading)return <div className="flex justify-center items-center h-screen w-full">
  <Skeleton className="w-[800px] h-[600px] bg-black rounded-full" />
  </div>


  return (
    <>
      <div className="flex flex-col min-h-screen w-full overflow-hidden bg-white">
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
      </div>
    </>
  );
  J;
}

export default App;
