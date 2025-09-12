import { Outlet } from 'react-router/internal/react-server-client';
import './index.less';
import Brand from '@/assets/imgs/brand/brand.svg';
export default function index() {
  return (
    <section className="app-container">
      <aside className="app-sidebar">
        <div className="brand h-[var(--header-h)] bg-black flex justify-center items-center">
          <img src={Brand} alt="Brand" width={120} />
        </div>
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
