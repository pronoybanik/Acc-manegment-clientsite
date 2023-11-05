import { ApiSlice } from "../Api/ApiSlice";

const brandApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => "/brand",
    }),
    getBrandItem: builder.query({
      query: (id) => `/brand/${id}`,
    }),
  }),
});

export const { useGetBrandQuery, useGetBrandItemQuery } = brandApi;
