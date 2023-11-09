import { ApiSlice } from "../Api/ApiSlice";

const loginApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAccount: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginAccountMutation } = loginApi;
