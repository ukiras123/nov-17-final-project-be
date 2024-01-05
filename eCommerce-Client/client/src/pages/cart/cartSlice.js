import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    addProductToCart: (state, { payload }) => {
      const isProductExist = state.cart.find(
        (item) => item._id === payload._id
      );
      if (isProductExist) {
        const otherProducts = state.cart.filter(
          (item) => item._id !== payload._id
        );
        const updatedProduct = {
          ...isProductExist,
          qty: isProductExist.qty + 1,
        };
        state.cart = [...otherProducts, updatedProduct];
      } else {
        state.cart.push(payload);
      }
    },
    removeProductFromCart: (state, { payload }) => {
      const remainingItems = state.cart.filter(
        (item) => item._id === payload._id
      );
      state.cart = remainingItems;
    },
    increaseProductQty: (state, { payload }) => {
      const isProductExist = state.cart.find(
        (item) => item._id === payload._id
      );
      if (isProductExist) {
        const otherProducts = state.cart.filter(
          (item) => item._id !== payload._id
        );
        const updatedProduct = {
          ...isProductExist,
          qty: isProductExist.qty + 1,
        };
        state.cart = [...otherProducts, updatedProduct];
      }
    },
    decreaseProductQty: (state, { payload }) => {
      const isProductExist = state.cart.find(
        (item) => item._id === payload._id
      );
      if (isProductExist) {
        const otherProducts = state.cart.filter(
          (item) => item._id !== payload._id
        );
        const updatedProduct = {
          ...isProductExist,
          qty: isProductExist.qty - 1,
        };
        state.cart = [...otherProducts, updatedProduct];
      }
    },
  },
});

const { reducer, actions } = cartSlice;

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQty,
  decreaseProductQty,
} = actions;

export default reducer;
