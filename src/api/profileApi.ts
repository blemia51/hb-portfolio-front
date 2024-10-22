import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the Profile interface
interface Profile {
  map: any;
  id?: number;
  name: string;
  jobTitle: string;
  techStack: string[];
  linkedin: string;
  github: string;
  email: string;
  profilePic?: string;
}

// Create the API slice
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    verifyToken: builder.mutation<{ isValid: boolean }, { token: string }>({
      query: ({ token }) => ({
        url: 'auth/verify-token',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      }),
    }),
    getProfile: builder.query<Profile, void>({
      query: () => 'profile',
    }),
    updateProfile: builder.mutation<Profile, Partial<Profile>>({
      query: (profile) => ({
        url: `profile/${profile.id}`,
        method: 'PUT',
        body: profile,
      }),
    }),
    createProfile: builder.mutation<Profile, Omit<Profile, 'id'>>({
      query: (profile) => ({
        url: 'profile',
        method: 'POST',
        body: profile,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: 'files/upload',
        method: 'POST',
        body: data
      }),
    }),
    deleteProfile: builder.mutation<void, number>({
      query: (id) => ({
        url: `profile/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useVerifyTokenMutation,
  useGetProfileQuery, 
  useUpdateProfileMutation, 
  useCreateProfileMutation,
  useUploadImageMutation,
  useDeleteProfileMutation 
} = profileApi;
