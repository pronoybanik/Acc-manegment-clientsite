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
        } finally {
          if (queryFulfilled && queryFulfilled.invalidateQueries) {
            queryFulfilled.invalidateQueries(["user"]);
          }
        }
      },
    }),
    getUser: builder.query({
      query: () => "/user/me",
      providesTags: ["user"],
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: () => "/user",
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"]
    }),
    editUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginAccountMutation,
  useGetUserQuery,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = loginApi;
