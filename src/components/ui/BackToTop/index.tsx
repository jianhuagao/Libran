'use client';

import { useEffect, useState, useCallback } from 'react';

// 定义 Lenis 实例的类型接口（匹配常用的 Lenis 库 API）
interface LenisInstance {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      offset?: number;
    }
  ) => void;
  // 可根据项目实际使用的 Lenis API 扩展其他属性/方法
}

// 扩展 Window 接口，添加 lenis 属性的类型定义
declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

interface BackToTopProps {
  /** 滚动多少距离后出现按钮（默认 200px） */
  showAfter?: number;
}

export default function BackToTop({ showAfter = 200 }: BackToTopProps) {
  const [visible, setVisible] = useState<boolean>(false);
  // 将 any 替换为精确的 LenisInstance 类型，初始值为 null
  const [lenis, setLenis] = useState<LenisInstance | null>(null);

  // 尝试读取 Lenis 实例
  useEffect(() => {
    const checkLenis = () => {
      // 不再需要 (window as any)，因为已扩展 Window 接口
      const instance = window.lenis;
      if (instance) {
        setLenis(instance);
      }
    };

    checkLenis();
    const id = setInterval(checkLenis, 300);
    return () => clearInterval(id);
  }, []);

  // 控制显示/隐藏
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollTop > showAfter);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  // 回到顶部方法
  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [lenis]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 z-100 rounded-full cursor-pointer bg-white/80 dark:bg-white/20 p-3 shadow-lg backdrop-blur-lg transition-all hover:bg-white dark:hover:bg-white/30 active:scale-95 ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
      aria-label="back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-black dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}