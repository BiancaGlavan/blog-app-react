import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface IImage {
    urls: {
        small: string;
        regular: string;
    }
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
        getImages: builder.query<IImageResponse, string>({
            query: (term: string) => `search/photos?page=1&query=${term}&client_id=HO07lfcaiJDURiwwAYNjB8ylo0NhsmzhQTbAvfjoIh8`,
        }),
    }),
  });
  export const {
    useGetImagesQuery,
  } = unsplashapi;
  
  export default unsplashapi;