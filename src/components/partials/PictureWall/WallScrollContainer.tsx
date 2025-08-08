'use client';

import { useLenis } from 'lenis/react';
import { useLayoutEffect, useRef, useState, useCallback, ReactNode } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);

export default function WallScrollContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);

  const lenis = useLenis();

  // 计算最大可滚动距离
  const calculateMaxScroll = useCallback(() => {
    if (!galleryRef.current || !contentRef.current) return;
    const contentWidth = contentRef.current.scrollWidth;
    const galleryWidth = galleryRef.current.clientWidth;
    setMaxScroll(Math.max(0, contentWidth - galleryWidth + 32));
  }, []);

  // 根据容器在视口的位置，计算 0~1 的滚动进度目标值
  const handleLenisScroll = useCallback(() => {
    const cont = containerRef.current;
    if (!cont || !lenis) return;

    const rect = cont.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 触发开始：rect.top <= windowHeight/2
    // 触发结束：rect.bottom <= windowHeight/2
    const startTrigger = windowHeight / 2;
    const endTrigger = -rect.height + windowHeight / 2;

    // 以窗口中点为参照，计算当前进度
    const rawProgress = Math.min(1, Math.max(0, (startTrigger - rect.top) / (startTrigger - endTrigger)));

    targetProgressRef.current = rawProgress;
  }, [lenis]);

  // 平滑过渡动画：progressRef → scrollProgress
  useLayoutEffect(() => {
    let rafId: number;
    const tick = () => {
      const cur = progressRef.current;
      const tar = targetProgressRef.current;
      const alpha = 0.1;
      const next = cur + (tar - cur) * alpha;

      if (Math.abs(next - cur) > 0.0005) {
        progressRef.current = next;
        setScrollProgress(next);
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 挂载 Lenis 监听 & 计算初始值 & 窗口 resize
  useLayoutEffect(() => {
    calculateMaxScroll();

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateMaxScroll, 150);
    };
    window.addEventListener('resize', onResize);

    const off = lenis?.on('scroll', handleLenisScroll);
    // 初始化一次
    setTimeout(handleLenisScroll, 100);

    return () => {
      window.removeEventListener('resize', onResize);
      off?.();
    };
  }, [calculateMaxScroll, handleLenisScroll, lenis]);

  // 应用缓动后的进度到 transform
  const scrollX = maxScroll > 0 ? easeOutQuad(scrollProgress) * maxScroll : 0;

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      <div
        ref={galleryRef}
        className="sticky top-0 w-full overflow-x-hidden px-4 py-20 md:top-[20%]"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={contentRef}
          className="flex gap-8"
          style={{
            transform: `translateX(-${scrollX}px)`,
            willChange: 'transform'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
