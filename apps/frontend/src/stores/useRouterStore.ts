import { create } from 'zustand';
type StoreConfig = {
  menus: any;
  menusFlatMap: any;
  activeMenu: string;
  parentMenus: any;
  updateMenus: (newMenus: any) => void;
  updateMenusFlatMap: (newMenusFlatMap: any) => void;
  tabArr: any[];
  updateTabArr: (newTabs: any) => void;
};

const useRouterStore = create<StoreConfig>((set) => ({
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
  menus: [
    {
      id: 1,
      label: 'Home',
      key: '/'
    },
    {
      id: 2,
      label: 'Dashboard',
      key: '/dashboard',
      children: [
        {
          id: 3,
          label: 'report',
          key: '/dashboard/report'
        },
        {
          id: 4,
          label: 'project',
          key: '/dashboard/task'
        },
        {
          id: 5,
          label: 'monitor',
          key: '/dashboard/monitor',
          children: [
            {
              id: 6,
              label: 'server-status',
              key: '/dashboard/monitor/server-status'
            },
            {
              id: 7,
              label: 'network-status',
              key: '/dashboard/monitor/network-status'
            }
          ]
        }
      ]
    },
    {
      id: 8,
      label: 'System',
      key: '/system',
      children: [
        {
          id: 9,
          label: 'user',
          key: '/system/user'
        },
        {
          id: 10,
          label: 'roles',
          key: '/system/role'
        },
        {
          id: 11,
          label: 'menu',
          key: '/system/menu'
        },
        {
          id: 12,
          label: 'log',
          key: '/system/log'
        }
      ]
    }
  ],
  menusFlatMap: {},
  activeMenu: '',
  parentMenus: [],
  tabArr: [
    {
      id: 1,
      key: '/',
      label: 'home'
    }
  ],
  updateMenus: (newMenus: any) => set({ menus: newMenus }),
  updateMenusFlatMap: (newMenusFlatMap: any) =>
    set({ menusFlatMap: newMenusFlatMap }),
  updateTabArr: (newTabs: any) => set({ tabArr: newTabs })
}));
export default useRouterStore;
