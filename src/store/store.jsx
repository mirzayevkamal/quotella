import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./slices/quotesSlice";
import snackbarSlice from "./slices/snackbarSlice";

export default configureStore({
  reducer: { quotes: quotesSlice, snackbar: snackbarSlice },
});
