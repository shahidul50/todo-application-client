import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { todoApiSlice } from './slices/todoApiSlice';
const store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [todoApiSlice.reducerPath]: todoApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware,todoApiSlice.middleware),
    devTools: true
});

export default store;