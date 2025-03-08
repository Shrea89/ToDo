import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../types';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodoPriority: (state, action: PayloadAction<{ id: string; priority: Todo['priority'] }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodoPriority,
  setTodos,
} = todosSlice.actions;

export default todosSlice.reducer; 