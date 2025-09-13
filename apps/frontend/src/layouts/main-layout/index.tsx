import { Outlet, useNavigate } from 'react-router';
import './index.less';
import Brand from '@/assets/imgs/brand/brand.svg';
import Logo from '@/assets/imgs/brand/logo.svg';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import McHeaderTabs from '@/components/tabs/McHeaderTabs.tsx';
import useRouterStore from '@/stores/useRouterStore.ts';
import { buildFlatMap } from '@/utils/router.util.ts';

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { menus, updateMenusFlatMap } = useRouterStore((state) => state);

  useEffect(() => {
    const map = buildFlatMap(menus);
    updateMenusFlatMap(map);
  }, []);

  return (
    <section className="app-container">
      <aside
        className={clsx('app-sidebar ', collapsed ? 'w-[80px]' : 'w-[220px]')}
      >
        <div
          className="brand h-[var(--header-h)]  flex justify-center items-center cursor-pointer "
          onClick={() => setCollapsed(!collapsed)}
        >
          <img
            src={collapsed ? Logo : Brand}
            alt="Brand"
            width={collapsed ? 24 : 98}
          />
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={menus}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </aside>
      <section className="app-main">
        <header className="app-header">
          <div className={'font-bold text-lg'}>Home</div>
          <section>Admin</section>
        </header>
        <McHeaderTabs />
        <main className="app-content p-2">
          <Outlet /> {/* 路由渲染内容 */}
        </main>
        <footer className="app-footer">版权所有 鲁ICP备17053414号-3</footer>
      </section>
    </section>
  );
}
