import { ApiSlice } from "../Api/ApiSlice";

const productsApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/product`,
      providesTags: ["getProduct"],
    }),
    getProductsCategory: builder.query({
      query: (data) => `/product?category=${data}&sort=price`,
      providesTags: ["getProduct"],
    }),
    getProductsFilers: builder.query({
      query: ({ data, data2 }) => `/product?category=${data}&sort=${data2}`,
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
  useGetProductsCategoryQuery,
  useGetProductsFilersQuery,
} = productsApi;
