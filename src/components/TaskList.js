import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Flag as FlagIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { removeTodo, toggleTodo, updateTodoPriority } from '../features/todosSlice';

const priorityColors = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
};

const TaskList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handlePriorityChange = (id, priority) => {
    dispatch(updateTodoPriority({ id, priority }));
  };

  const filteredAndSortedTodos = React.useMemo(() => {
    let result = [...todos];

    // Apply filter
    if (filter !== 'all') {
      result = result.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        if (filter === 'high') return todo.priority === 'high';
        if (filter === 'medium') return todo.priority === 'medium';
        if (filter === 'low') return todo.priority === 'low';
        return true;
      });
    }

    // Apply sort
    result.sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return result;
  }, [todos, filter, sort]);

  return (
    <Paper elevation={0} sx={{ mt: 2 }}>
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="high">High Priority</MenuItem>
            <MenuItem value="medium">Medium Priority</MenuItem>
            <MenuItem value="low">Low Priority</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort"
            startAdornment={
              <InputAdornment position="start">
                <SortIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
            <MenuItem value="priority">By Priority</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {filteredAndSortedTodos.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography color="text.secondary" align="center">
                  No tasks found
                </Typography>
              }
            />
          </ListItem>
        ) : (
          filteredAndSortedTodos.map((todo) => (
            <React.Fragment key={todo.id}>
              <ListItem
                sx={{
                  borderLeft: `4px solid ${priorityColors[todo.priority]}`,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  sx={{
                    color: priorityColors[todo.priority],
                    '&.Mui-checked': {
                      color: priorityColors[todo.priority],
                    },
                  }}
                />
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
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Chip
                        size="small"
                        icon={<FlagIcon sx={{ color: priorityColors[todo.priority] }} />}
                        label={todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        sx={{
                          bgcolor: `${priorityColors[todo.priority]}15`,
                          color: priorityColors[todo.priority],
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(todo.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select
                      value={todo.priority}
                      onChange={(e) => handlePriorityChange(todo.id, e.target.value)}
                      variant="standard"
                      sx={{ '&:before': { borderBottom: 'none' } }}
                    >
                      <MenuItem value="low">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FlagIcon sx={{ color: priorityColors.low }} />
                          Low
                        </Box>
                      </MenuItem>
                      <MenuItem value="medium">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FlagIcon sx={{ color: priorityColors.medium }} />
                          Medium
                        </Box>
                      </MenuItem>
                      <MenuItem value="high">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FlagIcon sx={{ color: priorityColors.high }} />
                          High
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete Task">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(todo.id)}
                        sx={{
                          color: 'error.light',
                          '&:hover': { color: 'error.main' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
};

export default TaskList; 