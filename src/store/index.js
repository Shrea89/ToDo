import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';
import authReducer from '../features/authSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todoAppState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoAppState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
  preloadedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
}); 