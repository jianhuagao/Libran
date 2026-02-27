'use client';

import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';
import type { ScrollCallback } from 'lenis';

type WallScrollContainerProps = {
  children: ReactNode;
  debug?: boolean;

  /** 横向滚动距离与纵向滚动距离的比例，1 = 1px 对 1px */
  scrollFactor?: number;

  /** 插值阻尼，越大越“跟手”，越小越“丝滑” */
  lerp?: number;

  /** 横向额外偏移（保留你原来的 +32 语义） */
  endOffset?: number;

  /** sticky 的 top，用于计算容器高度（不强制样式） */
  stickyTopPx?: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutQuad = (t: number) => t * (2 - t);

export default function WallScrollContainer({
  children,
  debug = false,
  scrollFactor = 1,
  lerp = 0.12,
  endOffset = 32,
  stickyTopPx = 0
}: WallScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const maxScrollXRef = useRef<number>(0);
  const containerTopRef = useRef<number>(0);
  const whRef = useRef<number>(0);

  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);

  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef<boolean>(false);

  const windowScrollHandlerRef = useRef<(() => void) | null>(null);

  const [containerHeight, setContainerHeight] = useState<string>('100vh');

  // lenis/react: useLenis() -> Lenis | undefined
  const lenis = useLenis() as Lenis | undefined;

  const log = useCallback(
    (msg: string, data?: Record<string, unknown>) => {
      if (!debug) return;
      if (data) console.info('[WallScroll]', msg, data);
      else console.info('[WallScroll]', msg);
    },
    [debug]
  );

  const applyTransform = useCallback(() => {
    const con = contentRef.current;
    if (!con) return;
    const x = easeOutQuad(currentRef.current) * maxScrollXRef.current;
    con.style.transform = `translate3d(${-x}px, 0, 0)`;
  }, []);

  const computeLayout = useCallback(() => {
    const cont = containerRef.current;
    const gal = galleryRef.current;
    const con = contentRef.current;
    if (!cont || !gal || !con) return;

    whRef.current = window.innerHeight;

    const contentWidth = con.scrollWidth;
    const galWidth = gal.clientWidth;
    const diff = contentWidth - galWidth;

    if (diff <= 0) {
      maxScrollXRef.current = 0;
      con.style.justifyContent = 'center';
    } else {
      maxScrollXRef.current = Math.max(0, diff + endOffset);
      con.style.justifyContent = 'flex-start';
    }

    const rect = cont.getBoundingClientRect();
    containerTopRef.current = rect.top + window.scrollY;

    // 根据横向需要滚动的距离，给足纵向滚动空间
    const extraY = maxScrollXRef.current / Math.max(0.0001, scrollFactor);
    const heightPx = Math.ceil(whRef.current + stickyTopPx + extraY);
    setContainerHeight(`${heightPx}px`);

    applyTransform();

    log('computeLayout', {
      contentWidth,
      galWidth,
      maxScrollX: maxScrollXRef.current,
      containerTop: containerTopRef.current,
      wh: whRef.current,
      containerHeight: heightPx
    });
  }, [applyTransform, endOffset, log, scrollFactor, stickyTopPx]);

  const updateTargetByScrollY = useCallback(
    (scrollY: number) => {
      const heightNum = Number.isFinite(Number.parseFloat(containerHeight))
        ? Number.parseFloat(containerHeight)
        : whRef.current;

      const start = containerTopRef.current - whRef.current / 2;
      const end = containerTopRef.current + heightNum - whRef.current / 2;
      const range = end - start;

      const raw = range > 0 ? clamp01((scrollY - start) / range) : scrollY >= end ? 1 : 0;
      targetRef.current = raw;

      if (debug) log('updateTarget', { scrollY, start, end, range, raw });
    },
    [containerHeight, debug, log]
  );

  const startRafIfNeeded = useCallback(() => {
    if (rafRef.current != null) return;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!inViewRef.current) return;

      const cur = currentRef.current;
      const tar = targetRef.current;
      const next = cur + (tar - cur) * lerp;

      if (Math.abs(next - cur) > 0.0001) {
        currentRef.current = next;
        applyTransform();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [applyTransform, lerp]);

  const stopRaf = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useLayoutEffect(() => {
    const cont = containerRef.current;
    const con = contentRef.current;
    if (!cont || !con) return;

    const r1 = requestAnimationFrame(() => computeLayout());
    const r2 = requestAnimationFrame(() => computeLayout());

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => computeLayout());
    });
    ro.observe(con);

    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        inViewRef.current = Boolean(entry?.isIntersecting);
        if (inViewRef.current) startRafIfNeeded();
      },
      { root: null, threshold: 0 }
    );
    io.observe(cont);

    let offLenis: (() => void) | undefined;

    if (lenis) {
      // Lenis.on('scroll', cb) => () => void
      const onLenisScroll: ScrollCallback = (l: Lenis) => {
        updateTargetByScrollY(l.scroll);
      };
      offLenis = lenis.on('scroll', onLenisScroll);
      log('using Lenis');
    } else {
      const handler = () => updateTargetByScrollY(window.scrollY || 0);
      windowScrollHandlerRef.current = handler;
      window.addEventListener('scroll', handler, { passive: true });
      log('using window scroll');
    }

    const onResize = () => requestAnimationFrame(() => computeLayout());
    window.addEventListener('resize', onResize);

    updateTargetByScrollY(window.scrollY || 0);
    startRafIfNeeded();

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);

      window.removeEventListener('resize', onResize);

      const handler = windowScrollHandlerRef.current;
      if (handler) {
        window.removeEventListener('scroll', handler);
        windowScrollHandlerRef.current = null;
      }

      if (offLenis) offLenis();

      io.disconnect();
      ro.disconnect();
      stopRaf();
    };
  }, [computeLayout, lenis, log, startRafIfNeeded, stopRaf, updateTargetByScrollY]);

  return (
    <div ref={containerRef} className="relative" style={{ height: containerHeight }}>
      <div
        ref={galleryRef}
        className="sticky top-[15%] w-full overflow-x-hidden px-4 py-20 md:top-[20%]"
        style={{ willChange: 'transform' }}
      >
        <div ref={contentRef} className="flex gap-8" style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
