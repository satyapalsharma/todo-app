/**
 * src/utils/todoHelpers.js
 *
 * This file contains a collection of utility functions designed to assist with
 * common operations related to managing todo items in the Todo App.
 * These functions promote immutability by returning new arrays/objects
 * rather than modifying existing ones directly.
 */

/**
 * Generates a unique ID for a new todo item.
 * This simple ID generation method is suitable for client-side applications
 * where uniqueness across sessions or multiple users is not a strict requirement.
 * For more robust ID generation (e.g., across distributed systems),
 * consider libraries like 'uuid'.
 *
 * @returns {string} A unique string ID.
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Adds a new todo item to the list of todos.
 * The new todo is initialized with a unique ID, the provided text and category,
 * a 'completed' status of false, and a creation timestamp.
 *
 * @param {Array<Object>} todos - The current array of todo items.
 * @param {string} text - The text content for the new todo.
 * @param {string} category - The category for the new todo.
 * @returns {Array<Object>} A new array containing all original todos plus the new todo.
 */
export const addTodo = (todos, text, category) => {
  const newTodo = {
    id: generateUniqueId(),
    text: text.trim(),
    completed: false,
    category: category,
    createdAt: Date.now(), // Timestamp for creation
  };
  return [...todos, newTodo];
};

/**
 * Updates an existing todo item in the list.
 * It finds the todo by its ID and merges the provided updates into it.
 *
 * @param {Array<Object>} todos - The current array of todo items.
 * @param {string} id - The ID of the todo item to update.
 * @param {Object} updates - An object containing properties to update (e.g., { text: 'New text', completed: true }).
 * @returns {Array<Object>} A new array with the specified todo updated.
 */
export const updateTodo = (todos, id, updates) => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, ...updates } : todo
  );
};

/**
 * Deletes a todo item from the list based on its ID.
 *
 * @param {Array<Object>} todos - The current array of todo items.
 * @param {string} id - The ID of the todo item to delete.
 * @returns {Array<Object>} A new array without the deleted todo item.
 */
export const deleteTodo = (todos, id) => {
  return todos.filter(todo => todo.id !== id);
};

/**
 * Filters a list of todo items based on their completion status and category.
 *
 * @param {Array<Object>} todos - The array of todo items to filter.
 * @param {'all' | 'active' | 'completed'} filterStatus - The completion status to filter by.
 *   - 'all': Returns all todos regardless of completion status.
 *   - 'active': Returns only incomplete todos.
 *   - 'completed': Returns only completed todos.
 * @param {string} categoryFilter - The category to filter by.
 *   - 'all': Returns todos regardless of category.
 *   - Any other string: Returns todos matching that specific category.
 * @returns {Array<Object>} A new array containing the filtered todo items.
 */
export const filterTodos = (todos, filterStatus, categoryFilter) => {
  let filtered = todos;

  // Apply completion status filter
  if (filterStatus === 'active') {
    filtered = filtered.filter(todo => !todo.completed);
  } else if (filterStatus === 'completed') {
    filtered = filtered.filter(todo => todo.completed);
  }

  // Apply category filter, if a specific category is selected
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(todo => todo.category === categoryFilter);
  }

  return filtered;
};

/**
 * Extracts all unique categories from a list of todo items.
 * This is useful for populating category filter dropdowns.
 * It always includes 'all' as a default option for filtering.
 *
 * @param {Array<Object>} todos - The array of todo items.
 * @returns {Array<string>} An array of unique category strings, including 'all'.
 */
export const getUniqueCategories = (todos) => {
  const categories = todos.map(todo => todo.category);
  // Use a Set to get unique categories, then convert back to array.
  // 'all' is added as a default filter option.
  // filter(Boolean) removes any potential empty string categories if they exist.
  return ['all', ...new Set(categories)].filter(Boolean);
};