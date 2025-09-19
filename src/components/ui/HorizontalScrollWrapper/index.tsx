import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  /**
   * 每次点击箭头滚动的像素（默认 300）
   */
  scrollAmount?: number;
  /**
   * 容器额外类名
   */
  className?: string;
  /**
   * 是否显示箭头
   */
  showArrows?: boolean;
};

export default function HorizontalScroller({ children, scrollAmount = 300, className = '', showArrows = true }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateButtons = () => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateButtons();
    const el = railRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    el.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateButtons());
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (delta: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className={`relative w-full overflow-y-visible ${className}`}>
      {/* 左箭头 */}
      {showArrows && (
        <button
          aria-label="向左滚动"
          onClick={() => scrollBy(-Math.abs(scrollAmount))}
          disabled={!canLeft}
          className={`absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full p-2 shadow-md transition-opacity ${canLeft ? 'opacity-100' : 'pointer-events-none opacity-40'} bg-white/80 backdrop-blur-md dark:bg-black/60`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* 横向滚动区域 */}
      <div ref={railRef} className="no-scrollbar overflow-x-auto overflow-y-visible scroll-smooth px-6 py-2 whitespace-nowrap">
        <div className="inline-flex items-stretch gap-4">{children}</div>
      </div>

      {/* 右箭头 */}
      {showArrows && (
        <button
          aria-label="向右滚动"
          onClick={() => scrollBy(Math.abs(scrollAmount))}
          disabled={!canRight}
          className={`absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full p-2 shadow-md transition-opacity ${canRight ? 'opacity-100' : 'pointer-events-none opacity-40'} bg-white/80 backdrop-blur-md dark:bg-black/60`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
