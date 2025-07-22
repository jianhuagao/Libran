import Image from 'next/image';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function BannerBetween() {
  return (
    <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-2">
      <AnimatedShow inViewShow className="flex flex-col items-start gap-4">
        <h1 className="text-5xl font-bold">Home</h1>
        <h3 className="mb-3 max-w-96 text-xl opacity-80">
          This is an example website where you can place the subtitle of your website
        </h3>
        <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/60 px-6 py-2 text-sm text-emerald-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
          <span className="relative z-10">START</span>
          <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-emerald-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-emerald-400/40"></span>
        </button>
      </AnimatedShow>

      <AnimatedShow
        inViewShow
        scale={0.6}
        className="w-[500px] rounded-2xl border border-white/20 bg-white/5 p-2 shadow-2xl backdrop-blur dark:bg-black/10"
      >
        <div className="flex w-full flex-col gap-1 rounded-xl border border-white/10 bg-white/90 p-4 shadow-2xl dark:bg-black/80">
          <div>
            <Image
              width={140}
              height={80}
              src="/img/wallpaper/c8.jpg"
              className="float-right ml-4 h-[80px] w-[140px] rounded-lg object-cover shadow-2xl"
              alt=""
            />
            <p className="text-justify text-sm leading-7 text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold dark:text-gray-300">
              Mars remains the primary target for near-future exploration. With missions like NASA’s Artemis program aiming to
              establish a sustainable presence on the Moon, Mars is seen as the next logical step. Plans are underway to send
              the first crewed mission to Mars in the 2030s, which will involve testing life-support systems, creating habitats
              using Martian soil, and generating oxygen from the planet’s atmosphere. These initiatives are not only scientific
              in nature but also serve as practice for longer, more distant missions.
            </p>
          </div>
        </div>
        <></>
      </AnimatedShow>
    </div>
  );
}
