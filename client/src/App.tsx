// import React from 'react';
import { TunangnModal } from 'tunangn-react-modal';

// Import routes
import UserRoutes from './routes/UserRoutes';

// Import components
import NavSide from './components/sides/NavSide';
import ContentSide from './components/sides/ContentSide';
import { __SideMenuNames } from './components/sides/utils';

function App() {
  return (
    <>
      <UserRoutes />
      <TunangnModal
        items={{
          [__SideMenuNames.ContentSide]: {
            element: ContentSide,
            placeOn: "left",
            type: "side"
          },
          [__SideMenuNames.NavSide]: {
            element: NavSide,
            placeOn: "right",
            type: "side"
          }
        }}
      />
    </>
  )
}

export default App
