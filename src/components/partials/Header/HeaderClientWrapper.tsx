'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  logoBlock: React.ReactNode;
  menuBlock?: React.ReactNode;
  searchBlock?: React.ReactNode;
  optionsBlock: React.ReactNode;
}

export default function HeaderClientWrapper({ logoBlock, menuBlock, searchBlock, optionsBlock }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll(); // 初始化

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={{
        top: {
          backdropFilter: 'blur(0px)',
          margin: 0,
          height: '96px',
          padding: '0 80px',
          transition: { duration: 0.3, ease: 'easeOut' }
        },
        scrolled: {
          backdropFilter: 'blur(10px)',
          margin: '20px',
          height: '60px',
          padding: '0 20px',
          transition: { duration: 0.3, ease: 'easeOut' }
        }
      }}
      className={clsx(
        'rounded-primary relative mx-auto flex items-center',
        'will-change-backdrop-filter will-change-transform'
      )}
    >
      {isScrolled && (
        <div className="rounded-primary absolute inset-0 -z-10 bg-white/50 ring-1 ring-gray-400/20 dark:bg-black/50 dark:ring-white/20"></div>
      )}
      {logoBlock}
      {menuBlock && <div className="ml-4">{menuBlock}</div>}
      <div className="ml-auto"></div>
      {searchBlock && <div>{searchBlock}</div>}
      <div className="ml-3 flex items-center gap-3 lg:ml-12">{optionsBlock}</div>
    </motion.div>
  );
}
