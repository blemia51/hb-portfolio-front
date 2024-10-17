import { BaseQueryFn, createApi, EndpointBuilder, EndpointDefinitions, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';


export interface Projects {
    id: number,
    name: string;
    description: string;
    stack: string;
		link: string;
  }

export const portfolioApi = createApi({
	reducerPath: 'portfolioApi',
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/"}),
		endpoints: (builder) => ({
			getPortfolioItems: builder.query<Projects[], void>({
				query: () => 'projects',
			}),
		}),
	});

export const { useGetPortfolioItemsQuery } = portfolioApi;

