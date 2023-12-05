import { ApiSlice } from "../Api/ApiSlice";

const productsApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/product`,
      providesTags: ["getProduct"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getProduct"],
    }),
    getProductsCategory: builder.query({
      query: (data) => `/product?category=${data}&sort=price`,
      providesTags: ["getProduct"],
    }),
    getProductsFilers: builder.query({
      query: ({ data, data2 }) => `/product?category=${data}&sort=${data2}`,
      providesTags: ["getProduct"],
    }),
    getProductsByName: builder.query({
      query: (data) => `/product?brand.name=${data}`,
      providesTags: ["getProduct"],
    }),
    getProductItem: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getProductPagination: builder.query({
      query: ({ pageNumber, limit }) =>
        `/product?page=${pageNumber}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductItemQuery,
  useCreateProductMutation,
  useGetProductsCategoryQuery,
  useGetProductsFilersQuery,
  useGetProductsByNameQuery,
  useGetProductPaginationQuery,
} = productsApi;
