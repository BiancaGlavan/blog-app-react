import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IUser } from "./authSlice";

interface ICreateArticleResponse {
  article: IArticle[];
}

export interface IArticle {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image?: string;
  imageThumb?: string;
  user: {
    _id?: string;
    name: string;
    subscribers: number;
  }
  createdAt?: Date;
  updatedAt?: Date;
  tags: string[];
  category: {
    _id?: string;
    title: string;
  };
  likes: string[];
}

interface IArticlesResponse {
  articles: IArticle[];
  totalPages: number;
  currentPage: number;
}

interface ILoginResponse {
  access_token: string;
}

interface IMyProfileResponse {
  profile: IUser;
}

interface ICategory {
  id?: string;
  _id?: string;
  title: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  articles: string[];
}

interface IArticlePayload {
    category: string;
    _id?: string;
    title: string;
    image?: string;
    description: string;
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
    createArticle: builder.mutation<ICreateArticleResponse, { article: IArticlePayload }>({
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
    getCategories: builder.query<ICategory[], void>({
      query: () => "categories",
    }),
    getArticles: builder.query<IArticlesResponse, void>({
      query: () => "articles",
    }),
    uploadImage: builder.mutation<string, FormData>({
      query: (data) => ({
        url: "upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useCreateArticleMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useGetCategoriesQuery,
  useUploadImageMutation,
  useGetArticlesQuery,
} = backendApi;

export default backendApi;
