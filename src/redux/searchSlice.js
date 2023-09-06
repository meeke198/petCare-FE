import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearching: false,
    query: "",
  },
  reducers: {
    searchStart: (state, action) => {
      state.isSearching = action.payload;
    },
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});
export const { searchStart, updateQuery } = searchSlice.actions;

export default searchSlice.reducer;
