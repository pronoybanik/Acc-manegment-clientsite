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
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getOrder"],
    }),
    createOrderPayment: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllPayment"],
    }),
    getAllPayment: builder.query({
      query: () => "/payment",
      providesTags: ["getAllPayment"],
    }),
    deleteOrderPayment: builder.mutation({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllPayment"],
    }),
    editOrderPayment: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/payment/${orderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getAllPayment"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useDeleteOrderMutation,
  useCreateOrderPaymentMutation,
  useGetAllPaymentQuery,
  useDeleteOrderPaymentMutation,
  useEditOrderPaymentMutation,
} = orderApi;
