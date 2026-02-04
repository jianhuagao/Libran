'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UrlItem } from './page';
import clsx from 'clsx';

interface Props {
  urls: UrlItem[];
}

export default function NavLinks({ urls }: Props) {
  const pathname = usePathname();

  // 取当前路径的第一级
  const currentRoot = pathname.split('/')[1] ?? '';

  return (
    <nav className="hidden items-center gap-2 md:flex">
      {urls.map(item => {
        let isActive = false;
        //如果url是http或https开头，不处理
        if (item.href.startsWith('http')) {
          isActive = false;
        } else {
          const itemRoot = item.href.split('/')[1] ?? '';
          isActive = currentRoot === itemRoot;
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
            className={clsx(
              'rounded-primary cursor-pointer px-3 py-2 transition-all text-sm hover:bg-gray-500/15 dark:hover:bg-white/20',
              {
                'bg-gray-500/15 dark:bg-white/20': isActive
              }
            )}
          >
            {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
          </Link>
        );
      })}
    </nav>
  );
}