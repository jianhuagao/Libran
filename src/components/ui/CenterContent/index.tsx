import { ReactNode } from 'react';

export default function CenterContent({ children }: { children: ReactNode }) {
  return <div className="mx-auto mt-9 flex max-w-7xl flex-col p-5 sm:p-16">{children}</div>;
}
