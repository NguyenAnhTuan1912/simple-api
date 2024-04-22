import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Import classes
import { Theme } from './classes/Theme';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import HomePage from './pages/HomePage';
import TestAPIPage from './pages/TestAPIPage';
import DocumentPage from './pages/DocumentPage';

// Import route names
import { RouteNames } from './routenames';

function App() {
  // Enable theme
  React.useEffect(function() {
    Theme.enableTheme("light");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path={RouteNames.Home.Path}
          element={<HomePage />}
          
        />
        <Route
          path={RouteNames.TestAPI.Path}
          element={<TestAPIPage />}
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>
      <Route
        path={RouteNames.Document.Path}
        element={<DocumentPage />}
      />
    </Routes>
  )
}

export default App
