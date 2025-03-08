import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TaskProgress = () => {
  const todos = useSelector((state) => state.todos.todos);
  const todayTasks = todos.filter(todo => {
    const taskDate = new Date(todo.createdAt).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });
  
  const completedTasks = todayTasks.filter(todo => todo.completed).length;
  const totalTasks = todayTasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  // SVG dimensions
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8F5E9"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
          {totalTasks}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {completedTasks} of {totalTasks} completed
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskProgress; 