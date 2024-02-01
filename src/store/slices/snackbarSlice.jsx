import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    type: "success",
    visible: false,
    text: "",
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.type = action.payload.type;
      state.text = action.payload.text;
      state.visible = true;
    },
    hideSnackbar: (state) => {
      state.visible = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
