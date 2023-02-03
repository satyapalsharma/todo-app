import React, { useState } from 'react';

/**
 * TodoForm Component
 *
 * A form for adding new todo items. It allows users to input the todo text
 * and an optional category.
 *
 * @param {object} props - The component props.
 * @param {function} props.onAddTodo - Callback function to add a new todo.
 *                                     Expected to receive an object:
 *                                     `{ text: string, category: string }`.
 */
function TodoForm({ onAddTodo }) {
  // State to manage the input value for the new todo item's text
  const [todoText, setTodoText] = useState('');
  // State to manage the input value for the new todo item's category
  const [categoryText, setCategoryText] = useState('');

  /**
   * Handles the form submission event.
   * Prevents default form behavior, validates inputs, and calls the onAddTodo prop.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission and page reload

    // Trim whitespace from inputs to ensure valid data
    const trimmedTodoText = todoText.trim();
    const trimmedCategoryText = categoryText.trim();

    // Only add a todo if the text is not empty
    if (trimmedTodoText) {
      onAddTodo({
        text: trimmedTodoText,
        category: trimmedCategoryText || 'General' // Use 'General' as default if no category is provided
      });
      // Clear the input fields after successful submission for a fresh start
      setTodoText('');
      setCategoryText('');
    } else {
      // Provide user feedback if the todo text is empty
      // In a more complex app, this might be a visual error message instead of an alert
      alert('Todo description cannot be empty!');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        {/* Visually hidden label for accessibility, screen readers will still announce it */}
        <label htmlFor="todo-text-input" className="sr-only">Todo Description</label>
        <input
          id="todo-text-input"
          type="text"
          className="todo-input"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="Todo description" // Provides an accessible name for the input
          maxLength={200} // Limit input length for practicality and database constraints
          required // Make the todo text a required field
        />
      </div>

      <div className="form-group">
        {/* Visually hidden label for accessibility */}
        <label htmlFor="todo-category-input" className="sr-only">Category (optional)</label>
        <input
          id="todo-category-input"
          type="text"
          className="todo-category-input"
          value={categoryText}
          onChange={(e) => setCategoryText(e.target.value)}
          placeholder="Category (e.g., Work, Home)"
          aria-label="Todo category" // Provides an accessible name for the input
          maxLength={50} // Limit input length
        />
      </div>

      <button type="submit" className="add-todo-button">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;