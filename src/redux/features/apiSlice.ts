import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IUser } from "./authSlice";

interface ICreateArticleResponse {
  article: IArticle[];
}

export interface IArticle {
  id?: string;
  _id: string;
  title: string;
  description: string;
  image?: string;
  imageThumb?: string;
  user: {
    _id?: string;
    name: string;
    subscribers: number;
  };
  createdAt?: string;
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

export interface ICategory {
  id?: string;
  _id: string;
  title: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  articles: string[];
}

export interface IArticlePayload {
  category: string;
  _id?: string;
  title: string;
  image?: string;
  description: string;
  user?: string;
}

interface ICreateCategoryResponse {
  category: ICategory;
}

interface ICategoryPayload {
  title: string;
  image?: string;
}

interface ILikeArticleResponse {
  message: string;
}

export interface IComment {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
    image?: string;
  };
  article: string;
  createdAt: string;
}

interface ICreateCommentResponse {
  comment: IComment;
}

export interface ICommentPayload {
  text: string;
  article: string;
}

export interface ICommentsResponse {
  comments: IComment[];
  currentPage: number;
  totalPages: number;
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
  tagTypes: ["Profile", "Articles", "Categories", "Article", "Comments"],

  endpoints: (builder) => ({
    createArticle: builder.mutation<ICreateArticleResponse, { article: IArticlePayload }>({
      query({ article }) {
        return {
          url: `articles`,
          method: "POST",
          body: article,
        };
      },
      invalidatesTags: ["Articles"],
    }),
    createCategory: builder.mutation<ICreateCategoryResponse, { category: ICategoryPayload }>({
      query({ category }) {
        return {
          url: `categories`,
          method: "POST",
          body: category,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    createComment: builder.mutation<ICreateCommentResponse, { comment: ICommentPayload}>({
      query({ comment }) {
        return {
          url: `comments/add`,
          method: "POST",
          body: comment,
        };
      },
      invalidatesTags: ["Comments"],
    }),
    updateCategory: builder.mutation<ICreateCategoryResponse, { category: ICategoryPayload; id: string }>({
      query({ category, id }) {
        return {
          url: `categories/${id}`,
          method: "PUT",
          body: category,
        };
      },
      invalidatesTags: ["Categories"],
    }),
    updateArticle: builder.mutation<ICreateArticleResponse, { article: IArticlePayload, id: string}>({
      query({ article, id }) {
        return {
          url: `articles/${id}`,
          method: "PUT",
          body: article,
        };
      },
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation<IArticle, string>({
      query: (articleId) => ({
        url: `articles/${articleId}/delete`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["Articles"],
    }),
    deleteCategory: builder.mutation<ICategory, string>({
      query: (categoryId) => ({
        url: `categories/${categoryId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteComment: builder.mutation<IComment, string>({
      query: (commentId) => ({
        url: `comments/${commentId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    likeArticle: builder.mutation<ILikeArticleResponse, string>({
      query( articleId ) {
        return {
          url: `articles/like/${articleId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Article"],
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
      providesTags: ["Profile"],
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    getArticles: builder.query<IArticlesResponse, void>({
      query: () => "articles",
      providesTags: ["Articles"],
    }), 
    getArticleById: builder.query<IArticle, number | string>({
      query: (articleId: number | string) => `articles/${articleId}`,
      providesTags: ["Article"]
    }),
    getCategoryArticles: builder.query<IArticlesResponse, number | string>({
      query: (categoryId: number | string) => `categories/${categoryId}/articles`,
    }),
    getArticleComments: builder.query<ICommentsResponse, number | string>({
      query: ( articleId: number | string ) => `comments/article/${articleId}`,
      providesTags: ["Comments"],
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
  useGetArticleByIdQuery,
  useGetCategoryArticlesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useDeleteCategoryMutation,
  useCreateCommentMutation,
  useGetArticleCommentsQuery,
  useDeleteCommentMutation,
} = backendApi;

export default backendApi;
