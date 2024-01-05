import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./pages/category/CatSlice";
import productReducer from "./pages/product/ProductSlice";

const Store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});
export default Store;
