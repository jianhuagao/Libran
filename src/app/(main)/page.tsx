import Link from 'next/link';
import BackgroundBlock from '@/components/ui/BackgroundBlock';

export default function Home() {
  return (
    <div>
      <BackgroundBlock />
      <div className="min-h-[1200px]">
        <h1 className="text-4xl font-bold">🏠️ Home</h1>
        <ul>
          <li>
            <Link href="/pricing">to Pricing</Link>
          </li>
          <li>
            <Link href="/signin">to Signin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
