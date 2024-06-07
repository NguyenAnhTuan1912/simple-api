import { Navigate } from "react-router-dom";

// Import layouts
import MainLayout from "src/layouts/MainLayout";

// Import pages
import HomePage from "src/pages/HomePage";
import TestAPIPage from "src/pages/TestAPIPage";
import DocumentPage from "src/pages/DocumentPage";

// Import routes configuration
import { RouteNames } from "src/routes.config";

// Import types
import type { RouteObject } from "react-router-dom";

export const BASE_ROUTES: Array<RouteObject> = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: RouteNames.Home.Path,
        element: <HomePage />
      },
      {
        path: RouteNames.TestAPI.Path,
        element: <TestAPIPage />
      },
      {
        path: "/",
        element: <Navigate to={RouteNames.Home.Path} replace />
      }
    ]
  },
  {
    path: RouteNames.Document.Path + "/*",
    element: <DocumentPage />
  }
]