import { ApiSlice } from "../Api/ApiSlice";

const brandApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => "/brand",
      keepUnusedDataFor: 600,
      providesTags: ["getBrands"],
    }),
    getBrandItem: builder.query({
      query: (id) => `/brand/${id}`,
    }),
    getBrandName: builder.query({
      query: (data) => `/brand?name=${data}`,
      providesTags: ["getBrands"],
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getBrands"],
    }),
    getBrandPagination: builder.query({
      query: ({ pageNumber, limit }) =>
        `/brand?page=${pageNumber}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetBrandQuery,
  useGetBrandItemQuery,
  useCreateBrandMutation,
  useGetBrandNameQuery,
  useGetBrandPaginationQuery,
} = brandApi;
