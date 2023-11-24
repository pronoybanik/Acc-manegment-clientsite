import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5050/api/v1",
    prepareHeaders: async (headers, { getState, endpoints }) => {
      const token = localStorage.getItem("token");
      const tokenParse = JSON.parse(token);

      if (tokenParse) {
        headers.set("authorization", `Bearer ${tokenParse}`);
      }
      return headers;
    },
  }),
  tagTypes:["getBrands", "getProduct"],
  endpoints: (builder) => ({}),
});
