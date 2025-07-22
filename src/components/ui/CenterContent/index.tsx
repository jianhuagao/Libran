import clsx from 'clsx';
import { ReactNode } from 'react';

export default function CenterContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('mx-auto mt-9 max-w-7xl p-3 sm:p-10', className)}>{children}</div>;
}
