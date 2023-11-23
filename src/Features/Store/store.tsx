import { ApiSlice } from "../Api/ApiSlice";

const storeAPi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation({
      query: (data) => ({
        url: "/store",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateStoreMutation } = storeAPi;
