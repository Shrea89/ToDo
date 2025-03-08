import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  selectedTodo: null,
  currentView: 'today', // 'all', 'today', 'important', 'planned', 'assigned'
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      if (state.selectedTodo?.id === action.payload) {
        state.selectedTodo = null;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodoPriority: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },
    selectTodo: (state, action) => {
      state.selectedTodo = state.todos.find(todo => todo.id === action.payload) || null;
    },
    updateTodoNotes: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.notes = action.payload.notes;
      }
    },
    addTodoStep: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        if (!todo.steps) todo.steps = [];
        todo.steps.push({
          id: action.payload.stepId,
          title: action.payload.title,
          completed: false,
        });
      }
    },
    toggleTodoStep: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo && todo.steps) {
        const step = todo.steps.find(step => step.id === action.payload.stepId);
        if (step) {
          step.completed = !step.completed;
        }
      }
    },
    setTodoReminder: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.reminder = action.payload.reminder;
      }
    },
    setTodoDueDate: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.dueDate = action.payload.dueDate;
      }
    },
    setTodoRepeat: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.repeat = action.payload.repeat;
      }
    },
    assignTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.todoId);
      if (todo) {
        todo.assignedTo = action.payload.userId;
      }
    },
    updateTodoStatus: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.status = action.payload.status; // 'todo', 'in-progress', 'done'
      }
    },
  },
});

export const {
  setCurrentView,
  setLoading,
  setError,
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodoPriority,
  selectTodo,
  updateTodoNotes,
  addTodoStep,
  toggleTodoStep,
  setTodoReminder,
  setTodoDueDate,
  setTodoRepeat,
  assignTodo,
  updateTodoStatus,
} = todosSlice.actions;

export default todosSlice.reducer; 