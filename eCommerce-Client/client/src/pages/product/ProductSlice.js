import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
};
const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProductList: (state, { payload }) => {
      state.productList = payload;
    },
  },
});

const { reducer, actions } = ProductSlice;

export const { setProductList } = actions;

export default reducer;
