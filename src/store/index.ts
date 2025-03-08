import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import todosReducer from '../features/todosSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 