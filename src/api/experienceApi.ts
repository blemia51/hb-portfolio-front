import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Experience {
  id?: number;
  title: string;
  company: string;
  place: string;
  start_date: string;
  end_date: string ;
  stack: string[];
  details: string;
}

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  tagTypes: ['Experience'],
  endpoints: (builder) => ({
    getExperiences: builder.query<Experience[], void>({
      query: () => 'experience',
      providesTags: (result) => 
        result ? 
          result.map(({ id }) => ({ type: 'Experience', id })) : 
          ['Experience'],
    }),
    getExperience: builder.query<Experience, number>({
      query: (id) => `experience/${id}`,
      providesTags: (result, error, id) => [{ type: 'Experience', id }], 
    }),
    createExperience: builder.mutation<void, Experience>({
      query: (newExperience) => ({
        url: 'experience',
        method: 'POST',
        body: newExperience,
      }),
      invalidatesTags: [{ type: 'Experience' }], // Invalidate cache to refetch
    }),
    updateExperience: builder.mutation<void, { id: number; data: Experience }>({
      query: ({ id, data }) => ({
        url: `experience/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Experience', id }], // Invalidate the tag for the specific experience to trigger refetch
    }),
    deleteExperience: builder.mutation<void, number>({
      query: (id) => ({
        url: `experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Experience' }], // Invalidate cache after deletion
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
