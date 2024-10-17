import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: fetchBaseQuery({ baseUrl:  'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getAbout: builder.query<string, void>({
      query: () => 'about',
    }),
    updateAbout: builder.mutation({
      query: ({id, updatedText}) => ({
        url: `about/${id}`,
        method: 'PUT',
        body: { text: updatedText }, 
      }),
    }),
    deleteAbout: builder.mutation<void, void>({
      query: () => ({
        url: 'about',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation, useDeleteAboutMutation } = aboutApi;
