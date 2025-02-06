
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // Import your AuthProvider
import React  from 'react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider to provide context */}
      <App />
    </AuthProvider>
  </StrictMode>
);
