import Link from 'next/link';

export default function Home() {
  return (
    <div>
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
  );
}
