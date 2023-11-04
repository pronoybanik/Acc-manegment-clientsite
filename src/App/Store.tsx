import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/Api/ApiSlice";

export const Store = configureStore({
    reducer: {
        [ApiSlice.reducerPath]: ApiSlice.reducer,
      },
    
      middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(ApiSlice.middleware),
});