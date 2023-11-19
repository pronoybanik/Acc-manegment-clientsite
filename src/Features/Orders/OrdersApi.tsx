import { ApiSlice } from "../Api/ApiSlice";

const orderApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),
    getOrder: builder.query({
      query: () => "/order",
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderQuery } = orderApi;
