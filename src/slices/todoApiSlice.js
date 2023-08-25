import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL });
const TODOS_URL = '/api/todos';

export const todoApiSlice = createApi({
  reducerPath: 'todoApiSlice',
  baseQuery,
  tagTypes: ['Todo'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({
      getAllTodos: builder.query({
        query: () => `${TODOS_URL}`,
        providesTags: ['Todo'],
      }),
      
      addTodo: builder.mutation({
        query: (todo)=> ({
          url: `${TODOS_URL}`,
          method: 'POST',
          body: todo,
        }),
        invalidatesTags:["Todo"]
      }),
      updateTodo: builder.mutation({
        query:({_id,...todo}) => ({
          url: `${TODOS_URL}/${_id}`,
          method: 'PUT',
          body: todo,
        }),
        invalidatesTags: ['Todo']
      }),
      deleteTodo: builder.mutation({
        query:(_id) => ({
          url: `${TODOS_URL}/${_id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Todo']
      })
  }),
});

export const{
    useGetAllTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = todoApiSlice;