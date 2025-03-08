import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  NotificationsNone as BellIcon,
  CalendarToday as CalendarIcon,
  Repeat as RepeatIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  updateTodoNotes,
  addTodoStep,
  toggleTodoStep,
  setTodoReminder,
  setTodoDueDate,
  setTodoRepeat,
} from '../features/todosSlice';

const TaskDetails = () => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const [newStep, setNewStep] = useState('');

  if (!selectedTodo) {
    return null;
  }

  const handleAddStep = () => {
    if (newStep.trim()) {
      dispatch(addTodoStep({
        todoId: selectedTodo.id,
        stepId: uuidv4(),
        title: newStep.trim(),
      }));
      setNewStep('');
    }
  };

  const handleToggleStep = (stepId) => {
    dispatch(toggleTodoStep({
      todoId: selectedTodo.id,
      stepId,
    }));
  };

  const handleNotesChange = (e) => {
    dispatch(updateTodoNotes({
      id: selectedTodo.id,
      notes: e.target.value,
    }));
  };

  const handleSetReminder = () => {
    // For demo, just set a reminder for 1 hour from now
    dispatch(setTodoReminder({
      id: selectedTodo.id,
      reminder: new Date(Date.now() + 3600000).toISOString(),
    }));
  };

  const handleSetDueDate = () => {
    // For demo, set due date to tomorrow
    dispatch(setTodoDueDate({
      id: selectedTodo.id,
      dueDate: new Date(Date.now() + 86400000).toISOString(),
    }));
  };

  const handleSetRepeat = () => {
    dispatch(setTodoRepeat({
      id: selectedTodo.id,
      repeat: 'daily',
    }));
  };

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <IconButton size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Add a step"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            variant="standard"
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={handleAddStep}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          {selectedTodo.steps && selectedTodo.steps.length > 0 && (
            <List>
              {selectedTodo.steps.map((step) => (
                <ListItem key={step.id} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={step.completed}
                      onChange={() => handleToggleStep(step.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={step.title}
                    sx={{
                      textDecoration: step.completed ? 'line-through' : 'none',
                      color: step.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Button
          startIcon={<BellIcon />}
          onClick={handleSetReminder}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: selectedTodo.reminder ? 'primary.main' : 'text.primary',
            mb: 2,
          }}
        >
          {selectedTodo.reminder ? 'Reminder set' : 'Set Reminder'}
        </Button>

        <Button
          startIcon={<CalendarIcon />}
          onClick={handleSetDueDate}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: selectedTodo.dueDate ? 'primary.main' : 'text.primary',
            mb: 2,
          }}
        >
          {selectedTodo.dueDate ? 'Due date set' : 'Add Due Date'}
        </Button>

        <Button
          startIcon={<RepeatIcon />}
          onClick={handleSetRepeat}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: selectedTodo.repeat ? 'primary.main' : 'text.primary',
            mb: 2,
          }}
        >
          {selectedTodo.repeat ? 'Repeats daily' : 'Repeat'}
        </Button>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Notes
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Add your notes here..."
          variant="outlined"
          value={selectedTodo.notes || ''}
          onChange={handleNotesChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.default',
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 'auto', p: 2, bgcolor: 'background.default' }}>
        <Typography variant="caption" color="text.secondary">
          Created {new Date(selectedTodo.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskDetails; 