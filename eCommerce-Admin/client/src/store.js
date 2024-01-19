import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./pages/registration-login/userSlice";
import catReducer from "./pages/category/catSlice";
import systemReducer from "./system-state/systemSlice";
import productReducer from "./pages/products/productSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export default configureStore({
  reducer: {
    adminInfo: persistedReducer,
    categories: catReducer,
    system: systemReducer,
    products: productReducer,
  },
});
