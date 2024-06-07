// import React from 'react';
import { useRoutes } from 'react-router-dom';

// Import base routes
import { BASE_ROUTES } from './baseRoutes'

export default function UserRoutes() {
  return useRoutes(BASE_ROUTES);
}