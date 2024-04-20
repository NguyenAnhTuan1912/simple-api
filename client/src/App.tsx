import { Route, Routes, Navigate } from 'react-router-dom';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import HomePage from './pages/HomePage';
import TestAPIPage from './pages/TestAPIPage';
import DocumentPage from './pages/DocumentPage';

// Import route names
import { RouteNames } from './routenames';

function App() {
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
        <Route
          path={RouteNames.Document.Path}
          element={<DocumentPage />}
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  )
}

export default App
