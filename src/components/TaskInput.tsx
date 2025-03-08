import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { addTodo } from '../features/todosSlice';
import { Todo } from '../types';

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo: Todo = {
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        variant="outlined"
        size="small"
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo['priority'])}
          label="Priority"
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ minWidth: 100 }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskInput; 