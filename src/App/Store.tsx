import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/Api/ApiSlice";
import AuthSlice from "../Features/Login/LoginSlice";
import ProductSlice from "../Features/Products/ProductSlice";

export const Store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    auth: AuthSlice,
    productFilter: ProductSlice,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(ApiSlice.middleware),
});
