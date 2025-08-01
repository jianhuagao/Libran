import Image from 'next/image';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function BannerBetween() {
  return (
    <div className="flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-2">
      <AnimatedShow inViewShow className="flex flex-col items-start gap-4">
        <h1 className="max-w-[500px] text-5xl font-bold">Innovate. Integrate. Elevate.</h1>
        <h3 className="mb-3 max-w-[500px] text-2xl opacity-80">
          A comprehensive platform demonstrating modern web development practices and user experience design
        </h3>
        <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-full bg-white/60 px-6 py-2 text-sm text-emerald-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
          <span className="relative z-10">START</span>
          <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-emerald-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-emerald-400/40"></span>
        </button>
      </AnimatedShow>

      <AnimatedShow
        inViewShow
        scale={0.6}
        className="group size-[400px] rounded-full border border-white/20 bg-white/5 p-2 shadow-2xl backdrop-blur dark:bg-black/10"
      >
        <div className="relative size-full rounded-full border border-white/10 bg-white/20 p-10 shadow-2xl transition-all duration-700 group-hover:saturate-200 dark:bg-black/80">
          <Image
            fill
            src="/img/wallpaper/c4.jpg"
            className="rounded-full object-cover shadow-2xl"
            alt="Abstract technology visualization"
          />
        </div>
      </AnimatedShow>
    </div>
  );
}
