import { ApiSlice } from "../Api/ApiSlice";

const productsApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStock: builder.query({
      query: () => "/stock",
      providesTags: ["getStock"],
    }),

    createStock: builder.mutation({
      query: (data) => ({
        url: "/stock",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getStock"],
    }),
  }),
});

export const { useGetStockQuery, useCreateStockMutation } = productsApi;
