import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Paper,
} from '@mui/material';
import {
  NotificationsNone as BellIcon,
  Repeat as RepeatIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, updateTodoPriority, selectTodo } from '../features/todosSlice';
import { v4 as uuidv4 } from 'uuid';

const VIEW_TITLES = {
  all: 'All Tasks',
  today: 'Today',
  important: 'Important',
  planned: 'Planned',
  assigned: 'Assigned to me',
};

const TaskView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { todos, selectedTodo, currentView } = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState('');
  const [status, setStatus] = useState('todo');
  const [showAddTask, setShowAddTask] = useState(false);

  const filteredTodos = useMemo(() => {
    const today = new Date().toDateString();
    let filtered = [...todos];

    // First filter by status
    filtered = filtered.filter(todo => todo.status === status || !todo.status);

    // Then filter by current view
    switch (currentView) {
      case 'today':
        return filtered.filter(todo => 
          new Date(todo.createdAt).toDateString() === today
        );
      case 'important':
        return filtered.filter(todo => todo.priority === 'high');
      case 'planned':
        return filtered.filter(todo => todo.dueDate);
      case 'assigned':
        return filtered.filter(todo => todo.assignedTo === user?.id);
      case 'all':
      default:
        return filtered;
    }
  }, [todos, currentView, status, user?.id]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const todo = {
        id: uuidv4(),
        title: newTask.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        steps: [],
        status: status,
      };
      dispatch(addTodo(todo));
      setNewTask('');
      setShowAddTask(false);
      dispatch(selectTodo(todo.id));
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleToggleImportant = (id) => {
    const todo = todos.find(t => t.id === id);
    dispatch(updateTodoPriority({
      id,
      priority: todo.priority === 'high' ? 'medium' : 'high'
    }));
  };

  const handleSelectTodo = (id) => {
    dispatch(selectTodo(id));
  };

  return (
    <Box sx={{ flex: 1, p: 3, maxWidth: 800 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight="600">
          {VIEW_TITLES[currentView]}
        </Typography>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          size="small"
          sx={{
            minWidth: 150,
            '& .MuiSelect-select': {
              py: 1,
              bgcolor: 'background.paper',
            }
          }}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </Box>

      {!showAddTask ? (
        <Button
          startIcon={<AddIcon />}
          onClick={() => setShowAddTask(true)}
          sx={{
            mb: 3,
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Add a task
        </Button>
      ) : (
        <Paper
          component="form"
          onSubmit={handleAddTask}
          elevation={2}
          sx={{
            mb: 3,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            autoFocus
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What do you want to do?"
            variant="standard"
            sx={{
              '& .MuiInput-underline:before': { borderBottom: 'none' },
              '& .MuiInput-underline:hover:before': { borderBottom: 'none' },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" color="primary">
              <BellIcon />
            </IconButton>
            <IconButton size="small" color="primary">
              <RepeatIcon />
            </IconButton>
            <IconButton size="small" color="primary">
              <CalendarIcon />
            </IconButton>
            <Box sx={{ flex: 1 }} />
            <Button
              size="small"
              onClick={() => setShowAddTask(false)}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="small"
              disabled={!newTask.trim()}
            >
              Add task
            </Button>
          </Box>
        </Paper>
      )}

      <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
        {filteredTodos.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No tasks found
          </Typography>
        ) : (
          filteredTodos.map((todo) => (
            <React.Fragment key={todo.id}>
              <ListItem
                sx={{
                  py: 1.5,
                  bgcolor: selectedTodo?.id === todo.id ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  cursor: 'pointer',
                  borderRadius: 1,
                }}
                onClick={() => handleSelectTodo(todo.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggle(todo.id);
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {todo.title}
                    </Typography>
                  }
                  secondary={todo.dueDate && (
                    <Typography variant="caption" color="text.secondary">
                      Due {new Date(todo.dueDate).toLocaleDateString()}
                    </Typography>
                  )}
                />
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleImportant(todo.id);
                  }}
                >
                  {todo.priority === 'high' ? (
                    <StarIcon color="primary" />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
};

export default TaskView; 