import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoList.css'; // Assuming a dedicated CSS file for TodoList styling

/**
 * TodoList Component
 *
 * Displays a list of todo items. It maps over the `todos` array and renders a `TodoItem`
 * for each todo. It also handles the display of a message when there are no tasks.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.todos - An array of todo objects to display.
 * @param {function(string)} props.onToggleComplete - Callback function to toggle the completion status of a todo by its ID.
 * @param {function(string)} props.onDeleteTodo - Callback function to delete a todo by its ID.
 * @param {function(string, string)} props.onEditTodo - Callback function to edit a todo's text by its ID and new text.
 */
const TodoList = ({ todos, onToggleComplete, onDeleteTodo, onEditTodo }) => {
  // If there are no todos, display a friendly message.
  if (!todos || todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No tasks yet! Add your first task above.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {/* Map over the todos array and render a TodoItem for each todo */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Unique key for each item in the list, crucial for React's reconciliation
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
};

/**
 * Prop Types for TodoList component.
 * Ensures that the props passed to this component are of the expected type and shape,
 * which helps in catching bugs early and improving code maintainability.
 */
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      category: PropTypes.string, // Category is optional for now, but part of the project context
    })
  ).isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};

export default TodoList;