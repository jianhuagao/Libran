'use client';

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
  const rafRef = useRef<number | null>(null);

  const calculateMaxScroll = useCallback(() => {
    if (contentRef.current && galleryRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const galleryWidth = galleryRef.current.clientWidth;
      setMaxScroll(Math.max(0, contentWidth - galleryWidth + 32));
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !stickyDivRef.current) return;

      const rect = stickyDivRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isStickyNow = rect.top <= windowHeight * 0.2;

      if (isStickyNow && !isStickyActiveRef.current) {
        isStickyActiveRef.current = true;
        stickyStartScrollYRef.current = window.scrollY;
      } else if (!isStickyNow && isStickyActiveRef.current) {
        isStickyActiveRef.current = false;
      }

      if (isStickyActiveRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const stickyHeight = stickyDivRef.current.offsetHeight;
        const totalRange = containerHeight - windowHeight + stickyHeight;
        const scrolled = window.scrollY - stickyStartScrollYRef.current;

        const progress = Math.min(1, Math.max(0, scrolled / totalRange));
        setScrollProgress(progress);
      }
    });
  }, []);

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
    window.addEventListener('scroll', handleScroll, { passive: true });

    setTimeout(handleScroll, 100); // 初始化滚动状态

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calculateMaxScroll, handleScroll]);

  const scrollX = maxScroll > 0 ? easeOutQuad(scrollProgress) * maxScroll : 0;

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      <div ref={stickyDivRef} className="sticky top-[20%] flex items-center justify-center">
        <div ref={galleryRef} className="w-full overflow-x-hidden px-4 py-20" style={{ willChange: 'transform' }}>
          <div
            ref={contentRef}
            className="flex gap-8 transition-transform duration-300 ease-out"
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
