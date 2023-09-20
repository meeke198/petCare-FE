import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearching: false,
    query: "",
    reload: false
  },
  reducers: {
    searchStart: (state, action) => {
      state.isSearching = action.payload;
    },
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});
export const { searchStart, updateQuery, updateReload } = searchSlice.actions;

export default searchSlice.reducer;
