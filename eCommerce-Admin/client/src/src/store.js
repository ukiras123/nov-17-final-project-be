import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/registration-login/userSlice";
import catReducer from "./pages/category/catSlice";
import systemReducer from "./system-state/systemSlice";
import productReducer from "./pages/products/productSlice";
export default configureStore({
  reducer: {
    adminInfo: userReducer,
    categories: catReducer,
    system: systemReducer,
    products: productReducer,
  },
});
