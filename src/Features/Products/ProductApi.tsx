import { ApiSlice } from "../Api/ApiSlice";

const productsApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
      providesTags: ["getProduct"],
    }),
    getProductItem: builder.query({
      query: (id) => `/product/${id}`,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getProduct"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductItemQuery,
  useCreateProductMutation,
} = productsApi;
