import BackgroundBlock from '@/components/ui/BackgroundBlock';

export default function Home() {
  return (
    <div>
      <BackgroundBlock />
      <div className="min-h-[1200px]">
        <h1 className="mb-8 text-4xl font-bold">Home</h1>
        <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/60 px-6 py-2 text-sm text-emerald-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
          <span className="relative z-10">START</span>
          <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-emerald-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-emerald-400/40"></span>
        </button>
      </div>
    </div>
  );
}
