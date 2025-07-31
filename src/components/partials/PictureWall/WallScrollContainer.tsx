'use client';

import { useLayoutEffect, useRef, useState, useCallback, ReactNode } from 'react';

// 缓动函数移至组件外部避免重复创建
const easeOutQuad = (t: number) => t * (2 - t);

export default function WallScrollContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyDivRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isStickyActive, setIsStickyActive] = useState(false);
  const [stickyStartScrollY, setStickyStartScrollY] = useState(0);

  // 使用requestAnimationFrame的引用
  const rafRef = useRef<number | null>(null);

  // 计算动态高度（基于图片数量）
  // const dynamicHeight = `${Math.max(images.length * 15, 100)}vh`;

  // 缓存尺寸计算
  const calculateMaxScroll = useCallback(() => {
    if (contentRef.current && galleryRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const galleryWidth = galleryRef.current.clientWidth;
      setMaxScroll(Math.max(0, contentWidth - galleryWidth) + 32);
    }
  }, []);

  // 使用requestAnimationFrame优化滚动处理
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !stickyDivRef.current) return;

      // 检测sticky状态
      const rect = stickyDivRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isCurrentlySticky = rect.top <= 0.2 * windowHeight;

      // 状态变化时更新
      if (isCurrentlySticky && !isStickyActive) {
        setIsStickyActive(true);
        setStickyStartScrollY(window.scrollY);
      } else if (!isCurrentlySticky && isStickyActive) {
        setIsStickyActive(false);
      }

      // 仅当sticky激活时计算进度
      let progress = 0;
      if (isStickyActive) {
        const containerHeight = containerRef.current.offsetHeight;
        const stickyHeight = stickyDivRef.current.offsetHeight;
        const totalScrollRange = containerHeight - windowHeight + stickyHeight;
        const scrollPositionInRange = window.scrollY - stickyStartScrollY;

        progress = Math.min(1, Math.max(0, scrollPositionInRange / totalScrollRange));
      }

      setScrollProgress(progress);
    });
  }, [isStickyActive, stickyStartScrollY]);

  // 初始化
  useLayoutEffect(() => {
    calculateMaxScroll();

    // 添加防抖的resize监听
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calculateMaxScroll();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始检查
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [calculateMaxScroll, handleScroll]);

  // 计算水平滚动位置
  const scrollPosition = maxScroll > 0 ? easeOutQuad(scrollProgress) * maxScroll : 0;

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      <div ref={stickyDivRef} className="sticky top-[20%] flex items-center justify-center">
        <div
          ref={galleryRef}
          className="hiddenScrollbar w-full overflow-x-auto px-4 py-20"
          style={{ willChange: 'transform' }} // 提升性能
        >
          <div
            ref={contentRef}
            className="flex gap-8 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              willChange: 'transform' // 提升性能
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
