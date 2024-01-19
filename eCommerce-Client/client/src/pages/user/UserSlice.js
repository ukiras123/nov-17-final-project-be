import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  client: [],
};
const clientuser = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, { payload }) => {
      state.client = payload;
    },
  },
});

const { reducer, actions } = clientuser;
export const { setClient } = actions;
export default reducer;
