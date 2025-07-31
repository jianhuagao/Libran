'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function DynamicPictureWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyDivRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [stickyStartY, setStickyStartY] = useState(0);

  const ticking = useRef(false);

  const images = [
    { id: 1, src: '/img/wallpaper/c1.jpg', alt: 'Mountain Landscape' },
    { id: 2, src: '/img/wallpaper/c2.jpg', alt: 'Ocean Sunset' },
    { id: 3, src: '/img/wallpaper/c3.jpg', alt: 'Forest Pathway' },
    { id: 4, src: '/img/wallpaper/c4.jpg', alt: 'Desert Dunes' },
    { id: 5, src: '/img/wallpaper/c5.jpg', alt: 'City Skyline' },
    { id: 6, src: '/img/wallpaper/c6.jpg', alt: 'Northern Lights' },
    { id: 7, src: '/img/wallpaper/c7.jpg', alt: 'Tropical Beach' },
    { id: 8, src: '/img/wallpaper/c8.jpg', alt: 'Snowy Mountains' }
  ];

  const dynamicHeight = `${Math.max(images.length * 15, 100)}vh`;

  useLayoutEffect(() => {
    const calculateMaxScroll = () => {
      if (contentRef.current && galleryRef.current) {
        const contentWidth = contentRef.current.scrollWidth;
        const galleryWidth = galleryRef.current.clientWidth;
        setMaxScroll(Math.max(0, contentWidth - galleryWidth));
      }
    };

    const checkStickyStart = () => {
      if (stickyDivRef.current) {
        const rect = stickyDivRef.current.getBoundingClientRect();
        const isSticky = rect.top <= window.innerHeight * 0.2;
        if (isSticky) {
          setStickyStartY(window.scrollY);
        }
      }
    };

    const handleScroll = () => {
      if (!containerRef.current || !stickyDivRef.current) return;
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const container = containerRef.current!;
        const sticky = stickyDivRef.current!;
        const containerRect = container.getBoundingClientRect();
        const stickyRect = sticky.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const containerHeight = containerRect.height;
        const stickyHeight = stickyRect.height;
        const totalScrollRange = containerHeight - windowHeight + stickyHeight;

        const scrollY = window.scrollY;
        const stickyTopTrigger = stickyStartY || scrollY;
        const deltaY = scrollY - stickyTopTrigger;

        if (stickyRect.top <= windowHeight * 0.2 && stickyStartY === 0) {
          setStickyStartY(scrollY);
        }

        const progress = Math.min(1, Math.max(0, deltaY / totalScrollRange));
        setScrollProgress(prev => {
          if (Math.abs(prev - progress) > 0.001) return progress;
          return prev;
        });

        ticking.current = false;
      });
    };

    calculateMaxScroll();
    checkStickyStart();
    window.addEventListener('resize', calculateMaxScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始滚动计算
    setTimeout(() => {
      handleScroll();
    }, 50);

    return () => {
      window.removeEventListener('resize', calculateMaxScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stickyStartY]);

  const easeOutQuad = (t: number) => t * (2 - t);
  const scrollX = easeOutQuad(scrollProgress) * maxScroll;

  return (
    <div ref={containerRef} className="relative" style={{ height: dynamicHeight }}>
      <div ref={stickyDivRef} className="sticky top-[20%] flex items-center justify-center">
        <div ref={galleryRef} className="hiddenScrollbar w-full overflow-x-auto px-4 py-20">
          <div
            ref={contentRef}
            className="flex gap-8 will-change-transform"
            style={{
              transform: `translateX(-${scrollX}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            {images.map(image => (
              <div
                key={image.id}
                className="group relative flex-shrink-0"
                style={{
                  transform: `rotate(${image.id % 2 === 0 ? 4 : -4}deg)`
                }}
              >
                <div className="h-[400px] w-[300px] rounded-2xl border border-white/20 bg-white/5 p-2 shadow-lg backdrop-blur-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-0">
                  <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/90 shadow-2xl dark:bg-black/80">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={300}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-lg font-bold text-white">{image.alt}</h3>
                      <p className="text-sm text-gray-300">Image #{image.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
