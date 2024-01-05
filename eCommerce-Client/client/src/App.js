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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProduct())
    dispatch(fetchAllCategories())
  }, [])
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='signin'
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
          path="category/:slug"
          element={<Product />}
        />
        {/* <Route
          path='navbar'
          element={<SideBarWithNav />}
        /> */}
        <Route
          path="product"
          element={<Product />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
