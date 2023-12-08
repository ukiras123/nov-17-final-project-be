import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectedProduct: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, { payload }) => {
      state.productList = payload;
    },
    setSelectedProduct: (state, { payload }) => {
      state.selectedProduct = payload;
    },
  },
});

const { reducer, actions } = productSlice;

export const { setProductList, setSelectedProduct } = actions;

export default reducer;
