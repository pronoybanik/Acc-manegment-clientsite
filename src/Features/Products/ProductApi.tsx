import { ApiSlice } from "../Api/ApiSlice";

const productsApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
    }),
    getProductItem: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductItemQuery } = productsApi;
