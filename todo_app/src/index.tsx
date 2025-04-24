import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global CSS
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Optional performance monitoring
import { UserProvider } from './context/UserProvider';

// Create the root element for the React app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Type assertion for TypeScript
);

// Render the App component inside React.StrictMode
root.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>
);

// Optional: Measure app performance
reportWebVitals();