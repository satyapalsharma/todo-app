import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import './App.css'; // Import global styles for the application

/**
 * src/index.js
 *
 * This is the entry point of the React application.
 * It's responsible for rendering the root `App` component into the DOM.
 *
 * Using React 18's `createRoot` API for concurrent mode features and better performance.
 */

// Find the root DOM element where the React app will be mounted.
// This element is typically defined in public/index.html with an id of 'root'.
const rootElement = document.getElementById('root');

// Create a React root. This is the new API for React 18 and later.
// It enables concurrent features and improved performance.
const root = ReactDOM.createRoot(rootElement);

// Render the main App component into the root.
// React.StrictMode is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants during development mode.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);