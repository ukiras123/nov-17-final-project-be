import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./pages/category/CatSlice";
import productReducer from "./pages/product/ProductSlice";
import cartReducer from "./pages/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import clientReducer from "./pages/user/UserSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "Ecommerce",
  storage,
};

const allReducers = combineReducers({
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  client: clientReducer,
});
const persistedReducer = persistReducer(persistConfig, allReducers);

const store = configureStore({
  // reducer: {
  //   category: categoryReducer,
  //   product: productReducer,
  //   cart: cartReducer,
  // },
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);
