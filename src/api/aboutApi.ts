import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface AboutOnly {
  id: number;
  about: string;
}
export const aboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: fetchBaseQuery({ baseUrl:  'http://localhost:8000/',
    prepareHeaders: (headers) => {
      // Include the token if it's available in local storage
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  tagTypes: ['About'],
  endpoints: (builder) => ({
    getAbout: builder.query<AboutOnly, void>({
      query: () => 'about',
      providesTags: ['About']
    }),
    updateAbout: builder.mutation({
      query: ({id, updatedText}) => ({
        url: `about/${id}`,
        method: 'PUT',
        body: { about: updatedText },
      }),
      invalidatesTags: ['About']
      
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
