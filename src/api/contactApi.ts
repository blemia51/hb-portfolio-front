// src/features/contact/contactApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    sendContactEmail: builder.mutation({
      query: (contactData) => ({
        url: '/contact/send-email',
        method: 'POST',
        body: contactData,
      }),
    }),
  }),
});

export const { useSendContactEmailMutation } = contactApi;
