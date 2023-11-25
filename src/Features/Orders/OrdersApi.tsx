import { ApiSlice } from "../Api/ApiSlice";

const orderApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getOrder"],
    }),
    getOrder: builder.query({
      query: () => "/order",
      providesTags: ["getOrder"],
    }),
    createOrderPayment: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
    }),
    getAllPayment: builder.query({
      query: () => "/payment",
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getOrder"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useDeleteOrderMutation,
  useCreateOrderPaymentMutation,
  useGetAllPaymentQuery,
} = orderApi;
