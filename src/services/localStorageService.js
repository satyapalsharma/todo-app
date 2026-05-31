/**
 * @file Service for interacting with browser's localStorage to persist Todo data.
 * This service provides functions to load and save todo items, ensuring data
 * integrity and handling potential errors during storage operations.
 */

/**
 * The key used to store and retrieve todo items from localStorage.
 * This key is specific to the Todo App to avoid conflicts with other applications
 * or components that might use localStorage.
 * @type {string}
 */
const TODO_STORAGE_KEY = 'todo-app-todos';

/**
 * Loads todo items from localStorage.
 *
 * This function attempts to retrieve a serialized list of todos from localStorage,
 * parses it from JSON, and returns the resulting array. It includes error handling
 * for cases where data might be corrupted or localStorage operations fail.
 *
 * @returns {Array<Object>} An array of todo objects, or an empty array if no data
 *                          is found, data is invalid, or an error occurs during retrieval.
 */
export const loadTodos = () => {
  try {
    const serializedTodos = localStorage.getItem(TODO_STORAGE_KEY);

    if (serializedTodos === null) {
      // No data found for this key, which is normal for a first-time user.
      return [];
    }

    const todos = JSON.parse(serializedTodos);

    // Basic validation to ensure the retrieved data is an array.
    // This helps prevent issues if non-array data was accidentally stored.
    if (!Array.isArray(todos)) {
      console.warn('Data retrieved from localStorage for TODO_STORAGE_KEY is not an array. Returning empty array.');
      return [];
    }

    return todos;
  } catch (error) {
    // Catch potential errors during localStorage.getItem or JSON.parse,
    // e.g., malformed JSON, security errors, or storage access issues.
    console.error('Error loading todos from localStorage:', error);
    // Return an empty array to ensure the application can continue functioning
    // without crashing, even if persistence fails.
    return [];
  }
};

/**
 * Saves a list of todo items to localStorage.
 *
 * This function serializes the provided array of todo objects into a JSON string
 * and stores it in localStorage. It includes error handling for potential issues
 * like storage quota exceeding or other localStorage write failures.
 *
 * @param {Array<Object>} todos - The array of todo objects to save. Each object
 *                                should represent a todo item.
 */
export const saveTodos = (todos) => {
  try {
    const serializedTodos = JSON.stringify(todos);
    localStorage.setItem(TODO_STORAGE_KEY, serializedTodos);
  } catch (error) {
    // Catch potential errors during JSON.stringify or localStorage.setItem,
    // e.g., QuotaExceededError if storage limit is reached, or security errors.
    console.error('Error saving todos to localStorage:', error);
    // In a production environment, you might want to:
    // 1. Notify the user that data could not be saved.
    // 2. Log this error to a remote error tracking service.
    // 3. Implement a fallback mechanism (e.g., temporary in-memory storage).
  }
};