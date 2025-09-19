import Image from 'next/image';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';
import { upPhotoList3 } from '@p/img/wallpaper/info';

export default function Cover() {
  return (
    <div>
      {upPhotoList3.map(s => (
        <div key={s.id} className="top-6 h-80 p-3 md:sticky md:h-screen md:p-28">
          <div className="relative grid size-full grid-rows-[1fr_auto] overflow-hidden rounded-4xl">
            <Image src={s.src} alt={s.alt} fill className="rounded-4xl object-cover" />

            {/* 底部：颜色渐变 */}
            <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-tr from-white/60 to-transparent to-40% dark:from-black/60" />

            {/* 底部：模糊渐变层 */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full mask-[linear-gradient(to_top_right,_rgba(0,0,0,1)_30%,_rgba(0,0,0,0)_55%)] backdrop-blur-2xl" />
            <div></div>

            <AnimatedShow visibleDelay={0.4} inViewShow className="flex flex-col items-start gap-2 p-4 md:gap-4 md:p-20">
              <h1 className="max-w-[500px] text-xl font-bold md:text-5xl">{s.alt}</h1>
              <h3 className="mb-3 max-w-[500px] text-lg opacity-80 md:text-2xl">
                A comprehensive platform demonstrating modern web development practices and user experience design
              </h3>
              <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-full bg-white/60 px-6 py-2 text-sm text-emerald-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
                <span className="relative z-10">START</span>
                <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-emerald-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-emerald-400/40"></span>
              </button>
            </AnimatedShow>
          </div>
        </div>
      ))}
    </div>
  );
}
