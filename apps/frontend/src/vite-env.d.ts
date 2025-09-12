/// <reference types="vite/client" />

// -----------------------------
// 静态资源类型声明
// -----------------------------
declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const Component: FC<SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.ico';

// -----------------------------
// CSS / 样式文件类型声明
// -----------------------------
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';
declare module '*.module.less';

// -----------------------------
// Vite 环境变量类型声明
// -----------------------------
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_NODE_ENV: 'development' | 'production' | 'test';
  // 可根据项目需要扩展其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
