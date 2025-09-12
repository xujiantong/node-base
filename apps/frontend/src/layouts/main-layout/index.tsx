import { Outlet, useNavigate } from 'react-router';
import './index.less';
import Brand from '@/assets/imgs/brand/brand.svg';
import { Menu } from 'antd';
import { useState } from 'react';
import { menuItems } from '@/router/menus.tsx';

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="app-container">
      <aside className="app-sidebar">
        <div
          className="brand h-[var(--header-h)] bg-black flex justify-center items-center cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <img src={Brand} alt="Brand" width={98} />
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={menuItems}
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
        <main className="app-content">
          <Outlet /> {/* 路由渲染内容 */}
        </main>
        <footer className="app-footer">版权所有 鲁ICP备17053414号-3</footer>
      </section>
    </section>
  );
}
