'use client';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, ReactNode } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);

export default function WallScrollContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 缓存值
  const maxScrollRef = useRef(0);
  const containerTopRef = useRef(0);
  const containerHeightRef = useRef(0);

  // 平滑进度
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);

  const lenis = useLenis();

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current || !contentRef.current) return;

    const cont = containerRef.current;
    const gal = galleryRef.current;
    const con = contentRef.current;
    const wh = window.innerHeight;

    // 初始 & resize 时读取并缓存
    const computeLayout = () => {
      const diff = con.scrollWidth - gal.clientWidth;
      if (diff <= 0) {
        maxScrollRef.current = 0;
        // 居中
        contentRef.current!.style.justifyContent = 'center';
      } else {
        maxScrollRef.current = diff + 32;
        contentRef.current!.style.justifyContent = 'flex-start';
      }

      // 最大水平位移
      maxScrollRef.current = Math.max(0, con.scrollWidth - gal.clientWidth + 32);
      // 容器在文档中的位置和高度
      containerTopRef.current = cont.offsetTop;
      containerHeightRef.current = cont.offsetHeight;
    };
    computeLayout();

    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(computeLayout, 150);
    });

    // Lenis 滚动监听：计算 rawProgress
    const off = lenis?.on('scroll', () => {
      const scrollY = lenis.scroll;

      // 触发开始：容器顶端到达屏幕中点
      const start = containerTopRef.current - wh / 2;
      // 触发结束：容器底部到达屏幕中点
      const end = containerTopRef.current + containerHeightRef.current - wh / 2;
      const range = end - start;

      // rawProgress 从 0→1
      const raw = Math.min(1, Math.max(0, (scrollY - start) / range));
      targetProgressRef.current = raw;
    });

    // 动画循环：平滑追踪，并直接写 DOM
    let rafId: number;
    const tick = () => {
      const cur = progressRef.current;
      const tar = targetProgressRef.current;
      const alpha = 0.1;
      const next = cur + (tar - cur) * alpha;

      // 差值显著时才更新
      if (Math.abs(next - cur) >= 0.0001) {
        progressRef.current = next;
        const x = easeOutQuad(next) * maxScrollRef.current;
        // 添加空检查，确保 contentRef.current 不为 null
        if (contentRef.current) {
          contentRef.current.style.transform = `translateX(-${x}px)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', computeLayout);
      off?.();
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
    };
  }, [lenis]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      <div
        ref={galleryRef}
        className="sticky top-0 w-full overflow-x-hidden px-4 py-20 md:top-[20%]"
        style={{ willChange: 'transform' }}
      >
        <div ref={contentRef} className="flex gap-8 will-change-transform">
          {children}
        </div>
      </div>
    </div>
  );
}
