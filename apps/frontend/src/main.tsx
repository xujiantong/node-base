import { createRoot } from 'react-dom/client';
import '@/assets/styles/global.css';
import '@ant-design/v5-patch-for-react-19';

import { RouterProvider } from 'react-router';
import router from '@/router';
import { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import en from 'antd/locale/en_US';

createRoot(document.getElementById('root')!).render(
  <Suspense>
    <ConfigProvider
      locale={en}
      theme={{
        token: {
          colorPrimary: '#1C1C1C'
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Suspense>
);
