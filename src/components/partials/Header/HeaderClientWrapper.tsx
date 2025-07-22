'use client';

import { useEffect, useState } from 'react';
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
    <div
      className={clsx(
        'rounded-primary mx-auto flex items-center',
        isScrolled
          ? 'h-16 w-[calc(100%-2rem)] translate-y-4 bg-white/50 px-5 ring-1 ring-gray-400/20 backdrop-blur-md dark:bg-black/50 dark:ring-white/20'
          : 'h-24 w-full bg-transparent px-5 ring-0 backdrop-blur-none lg:px-20 dark:bg-transparent',
        'will-change-backdrop-filter transition-[height,width,translate,padding] duration-500 ease-in-out will-change-transform'
      )}
    >
      {logoBlock}
      {menuBlock && <div className="ml-4">{menuBlock}</div>}
      <div className="ml-auto"></div>
      {searchBlock && <div>{searchBlock}</div>}
      <div className="ml-3 flex items-center gap-3 lg:ml-12">{optionsBlock}</div>
    </div>
  );
}
