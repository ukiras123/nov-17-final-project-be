import { createSlice } from "@reduxjs/toolkit";
import { isCheckQty, removeProduct } from "../../utility/Constant";
import { useDispatch } from "react-redux";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },

  reducers: {
    addProductToCart: (state, { payload }) => {
      console.log("id ", payload._id);
      const isProductExist = state.cart.find(
        (item) => item._id === payload._id
      );
      if (isProductExist) {
        const otherProducts = state.cart.filter(
          (item) => item._id !== payload._id
        );
        const updatedProduct = {
          ...isProductExist,
          cartQty: isProductExist.cartQty + 1,
        };

        state.cart = [...otherProducts, updatedProduct];
      } else {
        state.cart.push(payload);
      }
    },
    removeProductFromCart: (state, { payload }) => {
      const isProductExist = state.cart.find(
        (item) => item._id === payload._id
      );
      // console.log(isProductExist);
      if (isProductExist) {
        const otherProducts = state.cart.filter(
          (item) => item._id !== payload._id
        );
        // const remainingItems = state.cart.filter(
        //   (item) => item._id === payload._id
        // );

        state.cart = [...otherProducts];
      }
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

          cartQty:
            isProductExist.cartQty <= isProductExist.qty - 1
              ? isProductExist.cartQty + 1
              : isCheckQty(isProductExist.cartQty),
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

          cartQty:
            isProductExist.cartQty >= 1
              ? isProductExist.cartQty - 1
              : (isProductExist.cartQty = 0),
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
