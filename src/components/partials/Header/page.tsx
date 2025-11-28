import LogoBlock from '@/components/ui/LogoBlock';
import DarkSwitch from '@/components/ui/DarkSwitch';
import GithubIcon from '@/components/ui/GithubIcon';
import HeaderClientWrapper from './HeaderClientWrapper';
import Link from 'next/link';
import PopHeaderMenu from './PopHeaderMenu';

export interface UrlItem {
  href: string;
  label: string;
  target?: string;
}

const urls: UrlItem[] = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/signin', label: 'Signin' },
  { href: 'https://taurus.jhub.space', label: 'TaurusUI', target: '_blank' }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <HeaderClientWrapper
        logoBlock={<LogoBlock />}
        menuBlock={
          <nav className="hidden items-center gap-2 md:flex">
            {urls.map(item => (
              <Link
                key={item.label}
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="rounded-primary cursor-pointer px-3 py-2 text-sm transition-all hover:bg-gray-500/15 dark:hover:bg-white/20"
              >
                {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
              </Link>
            ))}
          </nav>
        }
        searchBlock={
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                aria-label="inputtext"
                name="inputtext"
                className="max-w-80 rounded-full border border-black/5 bg-white/40 py-1.5 pr-14 pl-3 text-sm/6 backdrop-blur-2xl focus:border-black/5 focus:ring-2 focus:ring-gray-50/50 focus:outline-hidden dark:text-white dark:placeholder:text-white/80 focus:dark:ring-white/50"
                placeholder="Search..."
              />
              <div className="group absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full px-2 py-1.5 opacity-40 transition-all hover:bg-black/10 hover:px-4 hover:shadow active:scale-90 dark:hover:bg-white/20">
                <svg
                  className="size-4 group-hover:scale-105 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        }
        optionsBlock={
          <>
            <div className="hidden items-center gap-4 md:flex">
              <DarkSwitch />
              <GithubIcon />
            </div>
            <PopHeaderMenu
              urls={urls}
              optionsBlock={
                <>
                  <GithubIcon />
                  <DarkSwitch />
                </>
              }
            />
          </>
        }
      />
    </header>
  );
}
