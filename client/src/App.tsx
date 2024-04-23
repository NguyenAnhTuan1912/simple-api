import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TunangnModal } from 'tunangn-react-modal';

// Import classes
import { Theme } from './classes/Theme';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import HomePage from './pages/HomePage';
import TestAPIPage from './pages/TestAPIPage';
import DocumentPage from './pages/DocumentPage';

// Import components
import NavSideMenu from './components/side_menu/NavSideMenu';
import ContentSideMenu from './components/side_menu/ContentSideMenu';

import { __SideMenuNames } from './components/side_menu/SideMenu';

// Import route names
import { RouteNames } from './routenames';

function App() {
  // Enable theme
  React.useEffect(function() {
    Theme.enableTheme("light");
  }, []);

  return (
    <>
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
      <TunangnModal
        items={{
          [__SideMenuNames.ContentSide]: {
            element: ContentSideMenu,
            placeOn: "left",
            type: "side"
          },
          [__SideMenuNames.NavSide]: {
            element: NavSideMenu,
            placeOn: "right",
            type: "side"
          }
        }}
      />
    </>
  )
}

export default App
