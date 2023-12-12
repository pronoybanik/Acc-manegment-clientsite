import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://acc-management-serversite.vercel.app/api/v1",
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("token");

      if (token !== null) {
        const tokenParse = JSON.parse(token);
        headers.set("authorization", `Bearer ${tokenParse}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "getBrands",
    "getProduct",
    "getOrder",
    "getAllPayment",
    "getStock",
    "getSupplier",
    "user",
  ],
  endpoints: () => ({}),
});
