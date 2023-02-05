import { useState, useEffect } from 'react';

/**
 * A custom React hook to persist state in localStorage.
 * It provides a similar API to `useState`, but automatically
 * stores and retrieves the value from localStorage.
 *
 * @param {string} key The key under which to store the value in localStorage.
 * @param {any} initialValue The initial value to use if no value is found in localStorage.
 * @returns {[any, Function]} A tuple containing the current value and a setter function.
 */
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [value, setValue] = useState(() => {
    // Check if window (and thus localStorage) is available.
    // This handles server-side rendering (SSR) environments where `window` might not exist.
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initialValue if not found or parsing fails
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If an error occurs (e.g., malformed JSON in localStorage),
      // log the error and return the initial value.
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect to update local storage whenever the value changes
  useEffect(() => {
    // Ensure window is available before interacting with localStorage
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Save state to localStorage.
      // We stringify the value to ensure it's stored as a string.
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // If an error occurs during writing (e.g., localStorage full), log it.
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]); // Dependency array: re-run effect only if key or value changes

  return [value, setValue];
}

export default useLocalStorage;