// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  category: "",
  price: "",
  pageNumber: 1,
};

// Create a slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = "";
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    clearPrice: (state) => {
      state.price = "";
    },
    changePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

// Export actions
export const {
  setCategory,
  clearCategory,
  setPrice,
  clearPrice,
  changePageNumber,
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;
