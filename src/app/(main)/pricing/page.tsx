import Link from 'next/link';

export default function PricingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">💰 Pricing</h1>
      <ul>
        <li>
          <Link href="/">to Home</Link>
        </li>
        <li>
          <Link href="/signin">to Signin</Link>
        </li>
      </ul>
    </div>
  );
}
