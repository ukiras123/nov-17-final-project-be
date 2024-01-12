import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderList: [],
};
const orderList = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderList: (state, { payload }) => {
      state.productList = payload;
    },
  },
});

const { reducer, actions } = orderList;

export const { setOrderList } = actions;

export default reducer;
