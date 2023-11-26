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
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getBrands"],
    }),
  }),
});

export const {
  useGetBrandQuery,
  useGetBrandItemQuery,
  useCreateBrandMutation,
} = brandApi;
