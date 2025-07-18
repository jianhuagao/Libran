import '@/styles/globals.css';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow">{children}</main>
    </div>
  );
}
