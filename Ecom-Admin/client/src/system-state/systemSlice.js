import { createSlice } from "@reduxjs/toolkit";
// const [modalShow, setModalShow] = useState(true);
const initialState = {
  modalShow: false,
};
const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setModalShow: (state, { payload }) => {
      state.modalShow = payload;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { setModalShow } = actions;

export default reducer;
