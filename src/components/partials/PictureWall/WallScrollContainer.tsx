'use client';

import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

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

/** Lenis scroll 事件常见形态：不同版本可能字段有增减，这里只取我们需要的最小集合 */
type LenisScrollEvent = {
  scroll: number;
  // 其它字段不关心就不声明，避免 any
};

/** 我们在组件中真正用到的 Lenis 实例能力（最小接口，不用 any） */
type LenisLike = {
  scroll: number;
  on: (event: 'scroll', handler: (e: LenisScrollEvent) => void) => void | (() => void);
};

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

  const maxScrollXRef = useRef(0);
  const containerTopRef = useRef(0);
  const whRef = useRef(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);

  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);

  // 给 window 上挂一个私有字段时也别用 any：用接口扩展
  const windowScrollHandlerRef = useRef<(() => void) | null>(null);

  // 动态容器高度：让纵向滚动足够长，驱动完整横向位移
  const [containerHeight, setContainerHeight] = useState<string>('100vh');

  // lenis/react 的返回类型在不同版本可能为 Lenis | null | undefined
  // 这里用 unknown 接住，再做类型守卫，不用 any
  const lenis = useLenis() as unknown;

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

    // 关键：根据 maxScrollX 设置“需要的纵向滚动距离”
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
      const heightNum = Number.parseFloat(containerHeight) || whRef.current;
      const start = containerTopRef.current - whRef.current / 2;
      const end = containerTopRef.current + heightNum - whRef.current / 2;
      const range = end - start;

      const raw = range > 0 ? clamp01((scrollY - start) / range) : scrollY >= end ? 1 : 0;
      targetRef.current = raw;

      if (debug) {
        log('updateTarget', { scrollY, start, end, range, raw });
      }
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

  // Lenis 类型守卫：不用 any，安全收窄到 LenisLike
  const isLenisLike = (v: unknown): v is LenisLike => {
    if (typeof v !== 'object' || v === null) return false;
    const obj = v as Record<string, unknown>;
    return typeof obj.on === 'function' && typeof obj.scroll === 'number';
  };

  useLayoutEffect(() => {
    const cont = containerRef.current;
    const con = contentRef.current;
    if (!cont || !con) return;

    // 首次测量合帧
    const r1 = requestAnimationFrame(() => computeLayout());
    const r2 = requestAnimationFrame(() => computeLayout());

    // ResizeObserver：内容尺寸变化（图片、字体、响应式）触发
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => computeLayout());
    });
    ro.observe(con);

    // IntersectionObserver：只在可见时跑 rAF
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        inViewRef.current = Boolean(entry?.isIntersecting);
        if (inViewRef.current) startRafIfNeeded();
      },
      { root: null, threshold: 0 }
    );
    io.observe(cont);

    // scroll 更新（Lenis 优先，否则 window scroll）
    let offLenis: (() => void) | undefined;

    if (isLenisLike(lenis)) {
      const maybeOff = lenis.on('scroll', (e: LenisScrollEvent) => {
        const scrollY =
          typeof e.scroll === 'number' ? e.scroll : typeof lenis.scroll === 'number' ? lenis.scroll : window.scrollY || 0;

        updateTargetByScrollY(scrollY);
      });

      if (typeof maybeOff === 'function') offLenis = maybeOff;

      log('using Lenis');
    } else {
      const handler = () => updateTargetByScrollY(window.scrollY || 0);
      windowScrollHandlerRef.current = handler;
      window.addEventListener('scroll', handler, { passive: true });

      log('using window scroll');
    }

    const onResize = () => requestAnimationFrame(() => computeLayout());
    window.addEventListener('resize', onResize);

    // 初始化
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
