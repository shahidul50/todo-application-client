import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Todo'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});