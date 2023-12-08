import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catList: [],
  selectedCat: {},
};
const catSlic = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatList: (state, { payload }) => {
      state.catList = payload;
    },
    setSelectedCat: (state, { payload }) => {
      state.selectedCat = payload;
    },
  },
});

const { reducer, actions } = catSlic;

export const { setCatList, setSelectedCat } = actions;

export default reducer;
