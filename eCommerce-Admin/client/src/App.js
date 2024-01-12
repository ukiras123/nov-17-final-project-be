import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/registration-login/Register";
import Login from "./pages/registration-login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Products from "./pages/products/Products";
import PaymentOptions from "./pages/payment-option/PaymentOptions";
import Orders from "./pages/order/Orders";
import Buyers from "./pages/buyer/Buyers";
import Reviews from "./pages/review/Reviews";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/profile/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./pages/registration-login/userAction";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import AddProduct from "./pages/products/AddProduct";
import { useEffect } from "react";
import { fetchAllCategoryAction } from "./pages/category/catAction";
import { fetchAllProductAction } from "./pages/products/productAction";
import AdminVerification from "./pages/registration-login/AdminVerification";

function App() {
  const dispatch = useDispatch();

  //fetch anything you need in the multipl places of the app
  useEffect(() => {
    dispatch(fetchAllCategoryAction());
    dispatch(fetchAllProductAction());
  }, []);
  
  return (
    <div className=''>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/admin-verification'
          element={<AdminVerification />}
        />

        {/* // private routes  */}
        <Route
          path='/registration'
          element={
            // <PrivateRoute>
            <Register />
            // </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/categories'
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path='/products'
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path='/product/new'
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path='/payment-options'
          element={
            <PrivateRoute>
              <PaymentOptions />
            </PrivateRoute>
          }
        />
        <Route
          path='/orders'
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path='/buyers'
          element={
            <PrivateRoute>
              <Buyers />
            </PrivateRoute>
          }
        />
        <Route
          path='/reviews'
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
