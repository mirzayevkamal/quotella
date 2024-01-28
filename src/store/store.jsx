import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./slices/quotesSlice";

export default configureStore({
  reducer: { quotes: quotesSlice },
});
