import { createSlice } from "@reduxjs/toolkit";

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    allQuotes: [],
    likedQuotes: [],
  },
  reducers: {
    setAllQuotes: (state, action) => {
      state.allQuotes = action.payload;
    },
    setLikedQuotes: (state, action) => {
      state.likedQuotes = action.payload.reverse();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllQuotes, setLikedQuotes } = quotesSlice.actions;

export default quotesSlice.reducer;
