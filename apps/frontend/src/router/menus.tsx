import {
  HomeOutlined,
  ProductOutlined,
  SettingOutlined
} from '@ant-design/icons';

export const menuItems = [
  {
    key: '/',
    label: 'Home',
    icon: <HomeOutlined />
  },

  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: <ProductOutlined />,
    children: [
      { key: '9', label: 'Report' },
      { key: '10', label: 'Task' },
      {
        key: '/monitor',
        label: 'Monitor',
        children: [
          { key: '/monitor/server-status', label: 'Server Status' },
          { key: '/monitor/alert', label: 'Alert' },
          { key: '/monitor/log-analysis', label: 'Log Analysis' }
        ]
      }
    ]
  },
  {
    key: '/system',
    label: 'System',
    icon: <SettingOutlined />
  }
];
