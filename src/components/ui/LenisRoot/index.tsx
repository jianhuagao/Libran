'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { frame, cancelFrame } from 'motion/react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import BackToTop from '../BackToTop';

function ScrollToTopInstant() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;

    // ✅ 有锚点时：什么都不做，交给浏览器处理
    if (hash) {
      return;
    }

    // ✅ 没有锚点：才执行真正的“回到顶部”
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // 同步重置 Lenis 内部状态，防止下一帧被拉回
    lenis?.stop();
    lenis?.start();
  }, [pathname, lenis]);

  return null;
}

export default function LenisProvider() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <ScrollToTopInstant />
      <BackToTop />
    </>
  );
}
