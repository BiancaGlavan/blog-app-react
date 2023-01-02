import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IUser } from "./authSlice";

interface ICreateArticleResponse {

}

interface IArticle {

}

interface ILoginResponse {
    access_token: string;
}

interface IMyProfileResponse {
    profile: IUser;
}

export const backendApi = createApi({
  reducerPath: "backendapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eager-dog-tie.cyclic.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createArticle: builder.mutation<ICreateArticleResponse, { article: Partial<IArticle> }>({
      query({ article }) {
        return {
          url: `articles`,
          method: "POST",
          body: article,
        };
      },
    }),
    loginUser: builder.mutation<ILoginResponse, { data: Partial<IUser> }>({
        query: ({ data }) => ({
          url: "auth/login",
          method: "POST",
          body: data,
        }),
      }),
      registerUser: builder.mutation<IUser, { data: Partial<IUser> }>({
        query: ({ data }) => ({
          url: "auth/register",
          method: "POST",
          body: data,
        }),
      }),
      getMyProfile: builder.query<IMyProfileResponse, {}>({
        query: () => "auth/profile",
      }),
  }),
});
export const {
    useCreateArticleMutation,
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetMyProfileQuery,
} = backendApi;

export default backendApi;
