import { ApiSlice } from "../Api/ApiSlice";

const supplierApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/supplier",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateSupplierMutation } = supplierApi;
