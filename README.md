# Todo List App

A simple Todo List built with **Vite + React**. You can add, edit, finish and delete tasks. A **Bootstrap Offcanvas** (side panel) is used for the add and edit form.

## Features

- **Add, edit, delete**: manage tasks from the side panel and list.
- **Checkbox**: mark a task as done (text gets a line through it).
- **Priority tags**: High, Medium, Low in different colors.
- **Due date**: shows the date, and turns red when the task is overdue.
- **Progress bar**: shows how many tasks are completed and the percentage.
- **Filters**: All, Pending, Completed, each with a count.
- **Search box**: find a task by typing its name.
- **Clear Completed**: removes all finished tasks at once.
- **Auto save**: tasks stay after refresh (localStorage).

## Tech Used

- **React (Vite)**: fast setup and build tool for the app.
- **Bootstrap**: ready-made styles for layout and forms.
- **React-Bootstrap**: gives the Offcanvas component.
- **Bootstrap Icons**: small icons for buttons.

## Getting Started

```bash
# 1. Create the project
npm create vite@latest todo-app -- --template react
cd todo-app

# 2. Install packages
npm install
npm install bootstrap react-bootstrap bootstrap-icons

# 3. Run the app
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
todo-app/
├── src/
│   ├── App.jsx      # todo logic and UI
│   ├── Todo.css     # custom styles
│   └── main.jsx     # Bootstrap and icon imports
├── package.json
└── README.md
```

- **App.jsx**: holds the task list, filter, search, form and all functions.
- **Todo.css**: colors, task card, priority tags, progress bar and search styles.
- **main.jsx**: loads Bootstrap and icon CSS for the whole app.

## Setup Notes

Add these two lines at the top of `src/main.jsx`:

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
```

These load the Bootstrap styles and the icons. Without them the app will look plain.

## How It Works

| Feature | What happens |
| ------- | ------------ |
| Add Task | Opens the Offcanvas. Save adds the task. |
| Edit | The pencil icon opens the Offcanvas with the task filled in. |
| Delete | The trash icon removes the task. |
| Checkbox | Marks the task as done or not done. |
| Filter | Shows All, Pending or Completed tasks. |
| Search | Shows only tasks that match the typed text. |
| Clear Completed | Removes all finished tasks. |
| Overdue | A task is overdue if its due date is before today and it is not done. |

Tasks are saved in the browser's `localStorage`, so they stay after a refresh.

## Future Improvements

- **Drag and drop**: change the order of tasks.
- **Dark mode**: a dark theme switch.
- **Delete confirmation**: ask before deleting.
- **API connection**: save tasks on a server.

## Author

Bhanusri Manukonda
