import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Flag as FlagIcon,
} from '@mui/icons-material';
import { addTodo } from '../features/todosSlice';

const priorityColors = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
};

const TaskInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo = {
        id: uuidv4(),
        title: title.trim(),
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTodo(newTodo));
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
        }}
      >
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="medium" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
            startAdornment={
              <InputAdornment position="start">
                <FlagIcon sx={{ color: priorityColors[priority] }} />
              </InputAdornment>
            }
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
        <Tooltip title="Add Task">
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              minWidth: 120,
              height: '56px',
            }}
          >
            Add Task
          </Button>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default TaskInput; 