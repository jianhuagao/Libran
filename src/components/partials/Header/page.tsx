import DarkSwitch from '@/components/ui/DarkSwitch';
import GithubIcon from '@/components/ui/GithubIcon';
import LogoBlock from '@/components/ui/LogoBlock';

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex h-24 items-center px-5 sm:px-20">
        <LogoBlock />
        <div className="mr-3 ml-auto">
          <DarkSwitch />
        </div>
        <GithubIcon />
      </div>
    </header>
  );
}
