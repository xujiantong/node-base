import { createRoot } from 'react-dom/client';
import '@/assets/styles/global.css';
import { RouterProvider } from 'react-router';
import router from '@/router';
import { Suspense } from 'react';
createRoot(document.getElementById('root')!).render(
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>
);
