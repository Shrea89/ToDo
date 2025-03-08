import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button,
  Badge,
} from '@mui/material';
import {
  ViewList as ViewListIcon,
  Today as TodayIcon,
  Star as StarIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentView } from '../features/todosSlice';
import TaskProgress from './TaskProgress';

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { todos, currentView } = useSelector((state) => state.todos);
  const today = new Date().toDateString();

  const getCounts = () => {
    return {
      all: todos.length,
      today: todos.filter(todo => new Date(todo.createdAt).toDateString() === today).length,
      important: todos.filter(todo => todo.priority === 'high').length,
      planned: todos.filter(todo => todo.dueDate).length,
      assigned: todos.filter(todo => todo.assignedTo === user?.id).length,
    };
  };

  const counts = getCounts();

  const menuItems = [
    { id: 'all', icon: <ViewListIcon />, text: 'All Tasks', count: counts.all },
    { id: 'today', icon: <TodayIcon />, text: 'Today', count: counts.today },
    { id: 'important', icon: <StarIcon />, text: 'Important', count: counts.important },
    { id: 'planned', icon: <CalendarIcon />, text: 'Planned', count: counts.planned },
    { id: 'assigned', icon: <PersonIcon />, text: 'Assigned to me', count: counts.assigned },
  ];

  const handleViewChange = (viewId) => {
    dispatch(setCurrentView(viewId));
  };

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.avatar}
            alt={user?.username}
            sx={{ width: 48, height: 48 }}
          />
          <Typography variant="h6">
            Hey, {user?.username || 'ABCD'}
          </Typography>
        </Box>

        <List sx={{ width: '100%', mb: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              button
              selected={currentView === item.id}
              onClick={() => handleViewChange(item.id)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 40,
                  color: currentView === item.id ? 'primary.main' : 'inherit'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: { 
                    fontWeight: currentView === item.id ? 600 : 400,
                    color: currentView === item.id ? 'primary.main' : 'text.primary',
                  }
                }}
              />
              {item.count > 0 && (
                <Badge
                  badgeContent={item.count}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: currentView === item.id ? 'primary.main' : 'action.selected',
                      color: currentView === item.id ? 'primary.contrastText' : 'text.primary',
                    },
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>

        <Button
          startIcon={<AddIcon />}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: 'text.secondary',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          Add list
        </Button>
      </Box>

      <Box sx={{ mt: 'auto', p: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Today Tasks
        </Typography>
        <TaskProgress />
      </Box>
    </Box>
  );
};

export default Sidebar; 