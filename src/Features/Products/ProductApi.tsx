import { ApiSlice } from "../Api/ApiSlice";

const productsApi = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/v1/product'
        }),
      
    }),
});

export const {
  useGetProductsQuery
} = productsApi;