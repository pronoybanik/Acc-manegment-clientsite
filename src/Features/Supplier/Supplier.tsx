import { ApiSlice } from "../Api/ApiSlice";

const supplierApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/supplier",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getSupplier"],
    }),
    getAllSupplier: builder.query({
      query: () => "/supplier",
      providesTags: ["getSupplier"],
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/supplier/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getSupplier"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useGetAllSupplierQuery,
} = supplierApi;
