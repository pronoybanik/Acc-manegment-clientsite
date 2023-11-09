import { ApiSlice } from "../Api/ApiSlice";

const registerApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateAccountMutation } = registerApi;
