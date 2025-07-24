import Image from 'next/image';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function BannerBetween() {
  return (
    <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-2">
      <AnimatedShow inViewShow className="flex flex-col items-start gap-4">
        <h1 className="max-w-96 text-4xl font-bold">Innovate. Integrate. Elevate.</h1>
        <h3 className="mb-3 max-w-96 text-xl opacity-80">
          A comprehensive platform demonstrating modern web development practices and user experience design
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
              alt="Abstract technology visualization"
            />
            <p className="text-justify text-sm leading-7 text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold dark:text-gray-300">
              Modern digital platforms require integrated solutions that balance performance, scalability, and user experience.
              Our framework combines cutting-edge technologies with intuitive design principles to create systems that adapt to
              evolving business needs. With modular architecture and cloud-native capabilities, organizations can accelerate
              development cycles while maintaining robust security standards across all touchpoints.
            </p>
          </div>
        </div>
      </AnimatedShow>
    </div>
  );
}
