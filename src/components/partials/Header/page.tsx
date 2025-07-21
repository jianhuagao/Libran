import LogoBlock from '@/components/ui/LogoBlock';
import DarkSwitch from '@/components/ui/DarkSwitch';
import GithubIcon from '@/components/ui/GithubIcon';
import HeaderClientWrapper from './HeaderClientWrapper';
import Link from 'next/link';

const urls = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/signin', label: 'Signin' }
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
                href={`${item.href}`}
                className="hover:text-primary/80 rounded-primary cursor-pointer px-3 py-2 text-sm transition-all hover:bg-gray-500/15 dark:hover:bg-white/20"
              >
                {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
              </Link>
            ))}
          </nav>
        }
        searchBlock={null}
        optionsBlock={
          <>
            <DarkSwitch />
            <GithubIcon />
          </>
        }
      />
    </header>
  );
}
