import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; // Main application styles

// Import components
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterControls from './components/FilterControls';

// Import custom hooks and utility functions
import useLocalStorage from './hooks/useLocalStorage';
import { filterAndSortTodos } from './utils/todoHelpers';

/**
 * App Component - The main container for the Todo application.
 * Manages global state for todos, categories, filters, and search.
 * Handles CRUD operations for todos and orchestrates data flow to child components.
 */
function App() {
  // State for todos, persisted using the useLocalStorage hook.
  // Each todo object typically includes: { id, text, category, isCompleted, createdAt, dueDate }
  const [todos, setTodos] = useLocalStorage('todos', []);

  // State for categories, also persisted.
  // This allows users to define and reuse categories.
  const [categories, setCategories] = useLocalStorage('categories', ['Work', 'Personal', 'Shopping']);

  // State for current filtering and sorting options.
  // - status: 'all', 'active', 'completed'
  // - category: 'all' or a specific category string
  // - sortBy: 'createdAt', 'dueDate', 'category', 'text'
  // - sortOrder: 'asc', 'desc'
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // State for the search term entered by the user.
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Adds a new todo item to the list.
   * @param {string} text - The description of the todo.
   * @param {string} category - The category of the todo.
   * @param {string} dueDate - The due date of the todo (ISO string or null).
   */
  const addTodo = (text, category, dueDate) => {
    if (!text.trim()) return; // Prevent adding empty todos

    const newTodo = {
      id: Date.now(), // Simple unique ID generation
      text,
      category: category || 'Uncategorized', // Default category if none provided
      isCompleted: false,
      createdAt: new Date().toISOString(), // Timestamp for creation
      dueDate: dueDate ? new Date(dueDate).toISOString() : null, // Store as ISO string or null
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);

    // Automatically add new category to the categories list if it doesn't exist
    if (category && !categories.includes(category)) {
      setCategories(prevCategories => [...prevCategories, category]);
    }
  };

  /**
   * Toggles the completion status of a todo item.
   * @param {number} id - The unique ID of the todo to toggle.
   */
  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  /**
   * Updates an existing todo item with new text, category, and/or due date.
   * @param {number} id - The unique ID of the todo to update.
   * @param {string} newText - The new description for the todo.
   * @param {string} newCategory - The new category for the todo.
   * @param {string} newDueDate - The new due date for the todo (ISO string or null).
   */
  const updateTodo = (id, newText, newCategory, newDueDate) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              category: newCategory,
              dueDate: newDueDate ? new Date(newDueDate).toISOString() : null,
            }
          : todo
      )
    );

    // Automatically add new category to the categories list if it doesn't exist
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prevCategories => [...prevCategories, newCategory]);
    }
  };

  /**
   * Deletes a todo item from the list.
   * @param {number} id - The unique ID of the todo to delete.
   */
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  /**
   * Memoized computation for filtered and sorted todos.
   * This prevents re-running the filtering/sorting logic on every render
   * unless `todos`, `filter`, or `searchTerm` actually change.
   * Uses the `filterAndSortTodos` utility function.
   */
  const filteredAndSortedTodos = useMemo(() => {
    return filterAndSortTodos(todos, filter, searchTerm);
  }, [todos, filter, searchTerm]);

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>

      {/* Component for adding new todos */}
      <TodoForm addTodo={addTodo} categories={categories} />

      {/* Component for controlling filters and search */}
      <FilterControls
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories} // Pass categories for category filtering dropdown
      />

      {/* Component for displaying the list of todos */}
      <TodoList
        todos={filteredAndSortedTodos}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        categories={categories} // Pass categories for dropdown in TodoItem edit mode
      />
    </div>
  );
}

export default App;