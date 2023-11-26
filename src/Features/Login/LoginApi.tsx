import { ApiSlice } from "../Api/ApiSlice";
import { userLoggedIn } from "./LoginSlice";

const loginApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAccount: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("token", JSON.stringify(result.data.data.token));

          localStorage.setItem(
            "userId",
            JSON.stringify(result.data.data.user._id)
          );
          
          dispatch(
            userLoggedIn({
              token: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getUser: builder.query({
      query: () => "/user/me",
    }),
    getAllUser: builder.query({
      query: () => "/user",
    }),
  }),
});

export const { useLoginAccountMutation, useGetUserQuery, useGetAllUserQuery } = loginApi;
