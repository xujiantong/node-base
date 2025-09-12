import { createBrowserRouter, Navigate } from 'react-router';
import Home from '@/pages/home';
import MainLayout from '@/layouts/main-layout';
import NotFound from '@/pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'dashboard',
        element: <Navigate to={'/'} />,
        children: []
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;
