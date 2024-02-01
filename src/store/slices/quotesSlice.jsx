import { createSlice } from "@reduxjs/toolkit";

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    allQuotes: [],
    likedQuotes: [],
    selectedFonts: {
      quote: "System",
      author: "System",
    },
  },
  reducers: {
    setAllQuotes: (state, action) => {
      state.allQuotes = action.payload;
    },
    setLikedQuotes: (state, action) => {
      state.likedQuotes = action.payload.reverse();
    },
    setSelectedFonts: (state, action) => {
      console.log('payload', action.payload)
      state.selectedFonts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllQuotes, setLikedQuotes, setSelectedFonts } =
  quotesSlice.actions;

export default quotesSlice.reducer;
