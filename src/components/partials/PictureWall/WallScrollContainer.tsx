'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { useLenis } from 'lenis/react';

type WallScrollContainerProps = {
  children: ReactNode;
  /** 线上排查时可临时打开打印信息，部署后建议关闭 */
  debug?: boolean;
};

const easeOutQuad = (t: number) => t * (2 - t);

export default function WallScrollContainer({ children, debug = false }: WallScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const maxScrollRef = useRef<number>(0);
  const containerTopRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);
  const whRef = useRef<number>(typeof window !== 'undefined' ? window.innerHeight : 0);

  const targetProgressRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  const lenis = useLenis();

  useEffect(() => {
    const cont = containerRef.current;
    const gal = galleryRef.current;
    const con = contentRef.current;
    if (!cont || !gal || !con) {
      if (debug) console.warn('[WallScroll] missing refs', { cont, gal, con });
      return;
    }

    // 计算布局（尽量使用 getBoundingClientRect + window.scrollY）
    const computeLayout = () => {
      if (!con || !gal || !cont) return;
      whRef.current = window.innerHeight;
      const contentWidth = con.scrollWidth;
      const galWidth = gal.clientWidth;
      const diff = contentWidth - galWidth;
      if (diff <= 0) {
        maxScrollRef.current = 0;
        con.style.justifyContent = 'center';
      } else {
        maxScrollRef.current = Math.max(0, diff + 32); // 保持你原来的偏移
        con.style.justifyContent = 'flex-start';
      }

      const rect = cont.getBoundingClientRect();
      containerTopRef.current = rect.top + window.scrollY;
      containerHeightRef.current = rect.height;

      // 保证 transform 随 maxScroll 更新（避免旧值超出新 max）
      const x = easeOutQuad(progressRef.current) * maxScrollRef.current;
      con.style.transform = `translateX(-${x}px)`;

      if (debug) {
        console.info('[WallScroll] computeLayout', {
          contentWidth,
          galWidth,
          maxScroll: maxScrollRef.current,
          containerTop: containerTopRef.current,
          containerHeight: containerHeightRef.current,
          wh: whRef.current
        });
      }
    };

    // 初始计算 + 在下一帧再计算以防首帧图片尚未布局
    computeLayout();
    let initRaf = requestAnimationFrame(() => {
      computeLayout();
      initRaf = requestAnimationFrame(() => {
        computeLayout();
      });
    });

    // Resize 节流
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        computeLayout();
        resizeTimer = null;
      }, 120);
    };
    window.addEventListener('resize', onResize);

    // 页面 load 兜底（资源完全加载后再算一次）
    window.addEventListener('load', computeLayout);

    // ResizeObserver：当内容尺寸（图片）变化时触发
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(() => {
        computeLayout();
      });
      ro.observe(con);
    } catch (err) {
      if (debug) console.warn('[WallScroll] ResizeObserver not available', err);
    }

    // scroll 更新：优先使用 lenis，否则回退到 window.scroll
    type LenisLike = { on: (event: string, fn: () => void) => (() => void) | void; scroll?: number };
    const l = lenis as LenisLike | undefined;

    const updateProgressFromScroll = (scrollY: number) => {
      const start = containerTopRef.current - whRef.current / 2;
      const end = containerTopRef.current + containerHeightRef.current - whRef.current / 2;
      const range = end - start;
      const raw = range > 0 ? Math.min(1, Math.max(0, (scrollY - start) / range)) : scrollY >= end ? 1 : 0;
      targetProgressRef.current = raw;
      if (debug) {
        // 打开 debug 时可能会很频繁，线上请谨慎开启
        console.info('[WallScroll] updateProgress', { scrollY, start, end, range, raw });
      }
    };

    const onWindowScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      updateProgressFromScroll(scrollY);
    };

    let offLenis: (() => void) | undefined;
    if (l && typeof l.on === 'function') {
      const maybeOff = l.on('scroll', () => {
        const scrollVal = typeof l.scroll === 'number' ? l.scroll : window.scrollY || 0;
        updateProgressFromScroll(scrollVal);
      });
      if (typeof maybeOff === 'function') offLenis = maybeOff;
      if (debug) console.info('[WallScroll] using Lenis');
    } else {
      window.addEventListener('scroll', onWindowScroll, { passive: true });
      if (debug) console.info('[WallScroll] using window scroll fallback');
    }

    // animation loop
    let rafId = 0;
    const tick = () => {
      const cur = progressRef.current;
      const tar = targetProgressRef.current;
      const alpha = 0.12;
      const next = cur + (tar - cur) * alpha;
      if (Math.abs(next - cur) > 0.0001) {
        progressRef.current = next;
        const x = easeOutQuad(next) * maxScrollRef.current;
        con.style.transform = `translateX(-${x}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', computeLayout);
      window.removeEventListener('scroll', onWindowScroll);
      if (offLenis) offLenis();
      if (ro) {
        try {
          ro.disconnect();
        } catch {}
        ro = null;
      }
      if (rafId) cancelAnimationFrame(rafId);
      if (initRaf) cancelAnimationFrame(initRaf);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [lenis, debug]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      <div
        ref={galleryRef}
        className="sticky top-0 w-full overflow-x-hidden px-4 py-20 md:top-[20%]"
        style={{ willChange: 'transform' }}
      >
        <div ref={contentRef} className="flex gap-8" style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
