import React, { useState } from 'react';

/**
 * TodoItem Component
 *
 * Represents a single todo item in the list. It allows users to view,
 * toggle completion, edit text/category, and delete a todo.
 *
 * @param {object} props - The component's props.
 * @param {object} props.todo - The todo object containing id, text, completed, and category.
 * @param {function(string): void} props.onToggleComplete - Callback to toggle the completion status of a todo.
 * @param {function(string): void} props.onDelete - Callback to delete a todo.
 * @param {function(string, string, string): void} props.onEdit - Callback to edit a todo's text and category.
 */
function TodoItem({ todo, onToggleComplete, onDelete, onEdit }) {
  // State to manage whether the todo item is currently in edit mode.
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the text value during editing. Initialized with current todo text.
  const [editText, setEditText] = useState(todo.text);
  // State to hold the category value during editing. Initialized with current todo category (or empty string if none).
  const [editCategory, setEditCategory] = useState(todo.category || '');

  /**
   * Handles the submission of the edit form.
   * Prevents default form submission, validates input, and calls the onEdit prop.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleEditSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation: ensure todo text is not empty.
    if (editText.trim() === '') {
      alert('Todo text cannot be empty.');
      return;
    }

    // Call the onEdit prop with the todo's ID and the new text/category.
    // Trim whitespace from inputs before saving.
    onEdit(todo.id, editText.trim(), editCategory.trim());
    setIsEditing(false); // Exit edit mode after saving.
  };

  return (
    // The main list item for a todo.
    // Applies 'completed' class if the todo is marked as complete for styling purposes.
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // Render the edit form when in edit mode.
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            aria-label="Edit todo text" // Accessibility label
            required // Make text input required
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            placeholder="Category (optional)"
            className="edit-category-input"
            aria-label="Edit todo category" // Accessibility label
          />
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </form>
      ) : (
        // Render the display mode when not editing.
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              className="todo-checkbox"
              // Accessibility label dynamically changes based on completion status.
              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className="todo-text">{todo.text}</span>
            {/* Display category only if it exists */}
            {todo.category && <span className="todo-category">[{todo.category}]</span>}
          </div>
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
              aria-label={`Edit "${todo.text}"`} // Accessibility label
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="delete-button"
              aria-label={`Delete "${todo.text}"`} // Accessibility label
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;