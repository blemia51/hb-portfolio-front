import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Token {
    token: string;
  }

export const loginApi = createApi({
	reducerPath: 'loginApi',
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/"}),
		endpoints: (builder) => ({
			login: builder.mutation<{ access_token: string }, { email: string; password: string}>({
				query: (credential) => ({
          url: 'auth/login',
					method: 'POST',
					body: credential,
        })
			}),
		}),
	});

export const { useLoginMutation } = loginApi;
