import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/Api/ApiSlice";
import AuthSlice from "../Features/Login/LoginSlice";

export const Store = configureStore({
    reducer: {
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        auth: AuthSlice
      },
    
      middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(ApiSlice.middleware),
});