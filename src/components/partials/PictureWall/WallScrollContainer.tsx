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

    // 计算布局
    const computeLayout = () => {
      if (!con || !gal || !cont) return;

      const diff = con.scrollWidth - gal.clientWidth;
      if (diff <= 0) {
        maxScrollRef.current = 0;
        con.style.justifyContent = 'center';
      } else {
        maxScrollRef.current = diff + 32;
        con.style.justifyContent = 'flex-start';
      }

      maxScrollRef.current = Math.max(0, con.scrollWidth - gal.clientWidth + 32);
      containerTopRef.current = cont.offsetTop;
      containerHeightRef.current = cont.offsetHeight;
    };

    // 初始计算
    computeLayout();

    // resize 节流
    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(computeLayout, 150);
    };
    window.addEventListener('resize', onResize);

    // 页面加载完成时再计算一次（防止首次进入图片未加载完）
    window.addEventListener('load', computeLayout);

    // Lenis 滚动监听
    const off = lenis?.on('scroll', () => {
      const scrollY = lenis.scroll;

      // 触发开始/结束点
      const start = containerTopRef.current - wh / 2;
      const end = containerTopRef.current + containerHeightRef.current - wh / 2;
      const range = end - start;

      // rawProgress 从 0→1
      const raw = Math.min(1, Math.max(0, (scrollY - start) / range));
      targetProgressRef.current = raw;
    });

    // 动画循环
    let rafId: number;
    const tick = () => {
      const cur = progressRef.current;
      const tar = targetProgressRef.current;
      const alpha = 0.1;
      const next = cur + (tar - cur) * alpha;

      if (Math.abs(next - cur) >= 0.0001) {
        progressRef.current = next;
        const x = easeOutQuad(next) * maxScrollRef.current;
        if (contentRef.current) {
          contentRef.current.style.transform = `translateX(-${x}px)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    // 初始执行一次，避免 Lenis 没触发时 translateX 不更新
    tick();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', computeLayout);
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
