import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/user/SignIn";
import Login from "./components/user/Login";
import Category from "./pages/category/Category";
import { SideBarWithNav } from "./components/Layout/navBar/SideBarWithNav";
import Product from "./pages/product/Product";
import { useDispatch } from "react-redux";
import { fetchAllProduct } from "./pages/product/ProductAction";
import { fetchAllCategories } from "./pages/category/CatAction";
import Cart from "./pages/cart/Cart";
import { getClientUserInfo } from "./pages/user/UserAction";
import Order from "./pages/order/Order";
import ShippingForm from "./components/form/ShippingForm";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getClientUserInfo({ email: "nirajlimbu49@gmail.com" }));
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='login'
          element={<SignIn />}
        ></Route>
        <Route
          path='login'
          element={<Login />}
        ></Route>
        <Route
          path='category'
          element={<Category />}
        />
        <Route
          path='category/:slug'
          element={<Product />}
        />
        {/* <Route
          path='navbar'
          element={<SideBarWithNav />}
        /> */}
        <Route
          path='/cart'
          element={<Cart />}
        />
        <Route
          path='/order'
          element={<Order />}
        />
        <Route
          path='/product'
          element={<Product />}
        />
        <Route
          path='/shipping'
          element={<ShippingForm />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
