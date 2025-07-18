import DarkSwitch from '@/components/ui/DarkSwitch';
import Link from 'next/link';

export default function SigninPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="m-3 grow rounded-xl border border-dashed p-10">
        <h1 className="flex items-center justify-between text-4xl font-bold">
          ✏️ Signin
          <DarkSwitch />
        </h1>
        <ul>
          <li>
            <Link href="/">to Home</Link>
          </li>
          <li>
            <Link href="/pricing">to Pricing</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
