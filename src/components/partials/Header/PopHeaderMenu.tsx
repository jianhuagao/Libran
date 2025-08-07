'use client';
import LogoBlock from '@/components/ui/LogoBlock';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { UrlItem } from './page';
import Link from 'next/link';

export default function PopHeaderMenu({ optionsBlock, urls }: { optionsBlock: React.ReactNode; urls: UrlItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div>
            {createPortal(
              <motion.div
                layout
                key="pop-header-menu"
                initial={{ opacity: 0, y: -50, scale: 0.5, origin: 'top' }}
                animate={{ opacity: 1, y: 0, scale: 1, origin: 'top' }}
                exit={{ opacity: 0, y: -50, scale: 0.9, origin: 'top' }}
                transition={{
                  type: 'spring',
                  duration: 0.6,
                  bounce: 0.5
                }}
                className="fixed inset-[12px] z-[9999] m-auto max-h-[calc(100vh-24px)] max-w-[calc(100vw-24px)] rounded-2xl bg-white/60 p-3 text-sm text-gray-700 shadow-2xl ring-1 ring-gray-400/10 backdrop-blur-2xl dark:bg-black/20 dark:text-white dark:ring-white/10"
              >
                <AnimatedShow className="" staggerChildren={0.1}>
                  <div className="flex items-center">
                    <div onClick={() => setIsOpen(false)}>
                      <LogoBlock />
                    </div>
                    <div className="ml-auto cursor-pointer p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        onClick={() => setIsOpen(false)}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-3">
                    {urls.map(item => (
                      <Link
                        key={item.label}
                        href={item.href}
                        target={item.target}
                        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                        onClick={() => setIsOpen(false)}
                        className="hover:text-primary rounded-primary cursor-pointer p-3 text-sm transition-all hover:bg-gray-500/15 dark:hover:bg-white/20"
                      >
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3">{optionsBlock}</div>
                </AnimatedShow>
              </motion.div>,
              document.body
            )}
          </div>
        )}
      </AnimatePresence>
      <div className="block cursor-pointer md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          onClick={() => setIsOpen(s => !s)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
    </>
  );
}
