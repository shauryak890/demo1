import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App'; // Import the main App component
import './index.css'; // Import global styles

// Get the root container
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);