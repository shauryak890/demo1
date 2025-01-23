import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: If you have global styles

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <App /> {/* No <Router> here */}
  </React.StrictMode>
);