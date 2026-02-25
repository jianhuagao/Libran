import Image from 'next/image';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';
import { upPhotoList3 } from '@p/img/wallpaper/info';

export default function Cover() {
  return (
    <div>
      {upPhotoList3.map(s => (
        <div key={s.id} className="top-6 h-80 p-3 md:sticky md:h-screen md:p-28">
          <div className="relative size-full overflow-hidden rounded-4xl">
            <Image src={s.src} alt={s.alt} fill className="object-cover" priority={s.id === 1} />

            {/* ✅ 方案A：底部暗色渐变（主力：提对比，不洗白图片） */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent dark:from-black/85 dark:via-black/25" />

            {/* ✅ 左侧轻补暗：让左下角标题更稳，但范围很小 */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent dark:from-black/35" />

            {/* ✅ 底部局部轻 blur（可选，但只作用底部一段，避免灰脏） */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] mask-[linear-gradient(to_top,rgba(0,0,0,1),rgba(0,0,0,0))] backdrop-blur-md" />

            {/* ✅ 文字：绝对定位到底部，永远在遮罩之上 */}
            <AnimatedShow
              visibleDelay={0.4}
              inViewShow
              className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-2 p-4 md:gap-4 md:p-20"
            >
              <h1 className="max-w-[520px] text-xl font-bold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] md:text-5xl">
                {s.alt}
              </h1>

              <h3 className="mb-3 max-w-[560px] text-lg text-white/85 drop-shadow-[0_8px_22px_rgba(0,0,0,0.55)] md:text-2xl">
                A comprehensive platform demonstrating modern web development practices and user experience design
              </h3>

              <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-full bg-white/70 px-6 py-2 text-sm font-medium text-emerald-900 ring-1 shadow-black/10 ring-white/30 backdrop-blur-md transition-all duration-300 hover:bg-white/85 hover:shadow-lg dark:bg-white/15 dark:text-white dark:ring-white/20 dark:hover:bg-white/20">
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
