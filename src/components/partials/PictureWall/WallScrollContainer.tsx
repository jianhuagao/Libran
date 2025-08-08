'use client';

import { useLenis } from 'lenis/react';
import { useLayoutEffect, useRef, useState, useCallback, ReactNode } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);

export default function WallScrollContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyDivRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const isStickyActiveRef = useRef(false);
  const stickyStartScrollYRef = useRef(0);

  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);

  const lenis = useLenis();

  const calculateMaxScroll = useCallback(() => {
    if (contentRef.current && galleryRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const galleryWidth = galleryRef.current.clientWidth;
      setMaxScroll(Math.max(0, contentWidth - galleryWidth + 32));
    }
  }, []);

  const handleLenisScroll = useCallback(() => {
    if (!containerRef.current || !stickyDivRef.current || !lenis) return;

    const rect = stickyDivRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isStickyNow = rect.top <= windowHeight * 0.2;

    if (isStickyNow && !isStickyActiveRef.current) {
      isStickyActiveRef.current = true;
      stickyStartScrollYRef.current = lenis.scroll;
    } else if (!isStickyNow && isStickyActiveRef.current) {
      isStickyActiveRef.current = false;
    }

    if (isStickyActiveRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const stickyHeight = stickyDivRef.current.offsetHeight;
      const totalRange = containerHeight - windowHeight + stickyHeight;
      const scrolled = lenis.scroll - stickyStartScrollYRef.current;

      const rawProgress = Math.min(1, Math.max(0, scrolled / totalRange));
      targetProgressRef.current = rawProgress;
    }
  }, [lenis]);

  // 平滑动画：将 targetProgressRef 的值缓慢过渡到 scrollProgress
  useLayoutEffect(() => {
    let animationFrame: number;

    const update = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const alpha = 0.1;

      const newProgress = current + (target - current) * alpha;

      // 如果变化很小就不再更新
      if (Math.abs(newProgress - current) > 0.001) {
        progressRef.current = newProgress;
        setScrollProgress(newProgress);
      }

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // 初始化 scroll 监听 & resize 处理
  useLayoutEffect(() => {
    calculateMaxScroll();

    let resizeTimer: NodeJS.Timeout;

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        calculateMaxScroll();
      }, 150);
    };

    window.addEventListener('resize', onResize);

    const unsubscribe = lenis?.on('scroll', handleLenisScroll);

    setTimeout(() => {
      handleLenisScroll();
    }, 100);

    return () => {
      window.removeEventListener('resize', onResize);
      unsubscribe?.();
    };
  }, [calculateMaxScroll, handleLenisScroll, lenis]);

  // 应用缓动后的 scrollProgress 映射为 translateX
  const scrollX = maxScroll > 0 ? easeOutQuad(scrollProgress) * maxScroll : 0;

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      <div ref={stickyDivRef} className="sticky top-[20%] flex items-center justify-center">
        <div ref={galleryRef} className="w-full overflow-x-hidden px-4 py-20" style={{ willChange: 'transform' }}>
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
    </div>
  );
}
