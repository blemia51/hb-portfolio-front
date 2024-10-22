// src/api/languageApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Language {
  id: number;
  name: string;
  proficiency: string;
  userId: number;
}


export const languageApi = createApi({
  reducerPath: 'languageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }), // Adjust the base URL to match your backend
  endpoints: (builder) => ({
    getLanguagesByUserId: builder.query<Language[], number>({
      query: (userId) => `languages/${userId}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetLanguagesByUserIdQuery } = languageApi;
