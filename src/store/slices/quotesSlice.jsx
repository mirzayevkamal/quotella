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
    selectedBgImage: require("../../../assets/bgs/sky/2.jpg"),
    quoteBgOpacity: 0.5,
    quoteBgColor: "#000000",
  },
  reducers: {
    setAllQuotes: (state, action) => {
      state.allQuotes = action.payload;
    },
    setLikedQuotes: (state, action) => {
      state.likedQuotes = action.payload.reverse();
    },
    setSelectedFonts: (state, action) => {
      state.selectedFonts = action.payload;
    },
    setSelectedBgImage: (state, action) => {
      state.selectedBgImage = action.payload;
    },
    setQuoteBgOpacity: (state, action) => {
      state.quoteBgOpacity = action.payload;
    },
    setQuoteBgColor: (state, action) => {
      state.quoteBgColor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllQuotes,
  setLikedQuotes,
  setSelectedFonts,
  setSelectedBgImage,
  setQuoteBgOpacity,
  setQuoteBgColor,
} = quotesSlice.actions;

export default quotesSlice.reducer;
