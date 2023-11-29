// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  category: "",
  price: "",
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
  },
});

// Export actions
export const { setCategory, clearCategory, setPrice, clearPrice } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
