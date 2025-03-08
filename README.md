# Modern React Todo Application

A feature-rich, modern Todo application built with React, Redux Toolkit, and Material-UI. This application provides a clean and intuitive interface for managing tasks with advanced features like task categorization, filtering, and progress tracking.

## Features

### Task Management
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Flag tasks as important
- Add detailed steps to tasks
- Set due dates and reminders
- Add notes to tasks
- Repeat task options
- Assign tasks to users

### Views and Organization
- Multiple task views:
  - All Tasks
  - Today's Tasks
  - Important Tasks
  - Planned Tasks
  - Assigned Tasks
- Task status tracking:
  - To Do
  - In Progress
  - Done
- Progress visualization
- Task filtering and sorting

### User Interface
- Modern Material Design
- Responsive layout
- Sidebar navigation
- Task progress tracking
- Clean and intuitive UI
- Dark/Light mode support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PRojectReact
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
PRojectReact/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.js      # Navigation sidebar
│   │   ├── TaskView.js     # Main task view
│   │   ├── TaskDetails.js  # Task details panel
│   │   └── TaskProgress.js # Progress visualization
│   ├── features/           # Redux slices and logic
│   │   └── todosSlice.js  # Todo state management
│   ├── App.js             # Root component
│   └── index.js           # Entry point
└── package.json           # Dependencies and scripts
```

## Usage Guide

### Adding Tasks
1. Click the "Add a task" button
2. Enter your task description
3. (Optional) Use quick action buttons to:
   - Set a reminder (Bell icon)
   - Set repeat options (Repeat icon)
   - Set a due date (Calendar icon)
4. Click "Add task" to create the task

### Managing Tasks
- Click the checkbox to mark a task as complete
- Click the star icon to mark a task as important
- Click on a task to view/edit its details
- Use the status dropdown to filter tasks by their status

### Using Different Views
- **All Tasks**: View all tasks regardless of status or date
- **Today**: View tasks created or due today
- **Important**: View tasks marked as important
- **Planned**: View tasks with due dates
- **Assigned to me**: View tasks assigned to you

### Task Status Management
Use the status dropdown to filter tasks by:
- To Do
- In Progress
- Done

## Development

### Key Dependencies
- React
- Redux Toolkit
- Material-UI
- UUID

### State Management
The application uses Redux Toolkit for state management:
- `todosSlice.js` handles all todo-related actions and state
- Local storage persistence for data retention
- Optimized performance with Redux selectors

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **Tasks not saving:**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and reload

2. **UI not updating:**
   - Check Redux DevTools for state changes
   - Verify component re-rendering

3. **Performance issues:**
   - Check browser console for warnings
   - Verify React DevTools for unnecessary re-renders

### Support
For additional support or questions, please open an issue in the repository. 