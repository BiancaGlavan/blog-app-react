import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface IImage {
  urls: {
    small: string;
    regular: string;
  };
}

export interface IImageResponse {
  results: IImage[];
  total_pages: number;
}

export const unsplashapi = createApi({
  reducerPath: "unsplashapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.unsplash.com/",
  }),
  endpoints: (builder) => ({
    getImages: builder.query<IImageResponse, { term: string; page?: number }>({
      query: ({ term, page = 1 }) =>
        `search/photos?query=${term}&page=${page}&client_id=HO07lfcaiJDURiwwAYNjB8ylo0NhsmzhQTbAvfjoIh8`,

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName + queryArgs.term;
      },


      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.term !== previousArg?.term || currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});
export const { useGetImagesQuery } = unsplashapi;

export default unsplashapi;
