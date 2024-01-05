import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catList: [],
};
const catSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatList: (state, { payload }) => {
      state.catList = payload;
    },
  },
});

const { reducer, actions } = catSlice;
export const { setCatList } = actions;
export default reducer;
