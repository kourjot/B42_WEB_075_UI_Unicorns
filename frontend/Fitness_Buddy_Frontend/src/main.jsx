<<<<<<< HEAD
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // Import your AuthProvider
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React  from 'react'
>>>>>>> 88285fd2bf5a6003882b740984c7020071ddbb42

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider to provide context */}
      <App />
    </AuthProvider>
  </StrictMode>
);
