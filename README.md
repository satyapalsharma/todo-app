# React Todo App

A full-featured task manager built with React, offering robust task management capabilities including categorization, filtering, and local storage persistence for a seamless user experience. This application is designed to help users efficiently organize their daily tasks.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Project Structure](#project-structure)
-   [Future Enhancements](#future-enhancements)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Add Todos**: Easily add new tasks with a clear description.
-   **Edit Todos**: Modify existing task descriptions.
-   **Toggle Completion**: Mark tasks as complete or incomplete.
-   **Delete Todos**: Remove tasks that are no longer needed.
-   **Categorization**: Assign categories (e.g., Work, Personal, Shopping) to tasks for better organization.
-   **Filtering**:
    -   Filter tasks by status: `All`, `Active`, `Completed`.
    -   Filter tasks by category.
-   **Persistence**: All tasks are automatically saved to and loaded from the browser's local storage, ensuring your data is retained across sessions.
-   **Responsive Design**: A clean and intuitive user interface that adapts to different screen sizes.

## Tech Stack

-   **React**: A JavaScript library for building user interfaces.
-   **CSS**: For styling the application.
-   **Custom Hooks**: `useLocalStorage` for data persistence.
-   **Utility Functions**: Helper functions for common todo operations.

## Installation

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/react-todo-app.git
    cd react-todo-app
    ```

2.  **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Start the development server:**

    Using npm:
    ```bash
    npm start
    ```
    Or using yarn:
    ```bash
    yarn start
    ```

    The application will open in your browser at `http://localhost:3000`.

## Usage

-   **Adding a Todo**: Type your task into the input field at the top and click the "Add Todo" button.
-   **Editing a Todo**: Click the "Edit" button next to a todo item. An input field will appear, allowing you to modify the task description. Press Enter or click "Save" to confirm.
-   **Completing a Todo**: Click the checkbox next to a todo item to toggle its completion status.
-   **Deleting a Todo**: Click the "Delete" button next to a todo item to remove it permanently.
-   **Filtering by Status**: Use the "All", "Active", and "Completed" buttons to view tasks based on their status.
-   **Filtering by Category**: Use the category dropdown to filter tasks by their assigned category.

## Project Structure

The project follows a standard React application structure, organized for maintainability and scalability.

```
react-todo-app/
├── public/
│   └── index.html             # Main HTML file
├── src/
│   ├── components/
│   │   ├── TodoForm.js        # Component for adding/editing todos
│   │   ├── TodoList.js        # Component for displaying the list of todos
│   │   ├── TodoItem.js        # Component for a single todo item
│   │   └── FilterControls.js  # Component for status and category filters
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook for local storage persistence
│   ├── utils/
│   │   └── todoHelpers.js     # Utility functions for todo operations (e.g., ID generation)
│   ├── App.js                 # Main application component
│   ├── App.css                # Global styles for the App component
│   └── index.js               # Entry point of the React application
├── .gitignore                 # Specifies intentionally untracked files to ignore
├── package.json               # Project metadata and dependencies
└── README.md                  # This README file
```

## Future Enhancements

-   **Drag and Drop Reordering**: Allow users to reorder tasks within the list.
-   **Due Dates**: Add functionality to set and display due dates for tasks.
-   **Priority Levels**: Implement priority levels (e.g., High, Medium, Low) for tasks.
-   **User Authentication**: Integrate user authentication to store tasks on a backend server.
-   **Theming**: Provide options for light/dark mode or custom themes.
-   **Animations**: Add subtle animations for a more dynamic user experience.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.