import BackgroundGrid from '@/components/ui/BackgroundGrid';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function PitchCard() {
  return (
    <AnimatedShow
      inViewShow
      className="relative overflow-hidden rounded-4xl border border-gray-200 bg-white/60 px-10 py-14 shadow-xl backdrop-blur-md transition-[border-color] dark:border-white/30 dark:bg-[#252529]/70"
    >
      <BackgroundGrid fade={false} color="#cccccc20" cellSize="35px" />
      <div className="mb-6 text-center">
        <div className="group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white/60 px-3 py-1.5 text-xs ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          Try our tool for Free
        </div>
      </div>
      <h2 className="mb-6 text-center text-4xl font-bold opacity-90">What are you waiting for?</h2>
      <p className="mx-auto mb-10 max-w-2/3 text-center text-sm opacity-70">
        Build powerful SaaS AI applications with OpenAI and Next.js using Libran. Our flexible library comes with pre-configured
        examples and ready-to-use components, making it easier to quickly launch your AI startup.
      </p>
      <div className="text-center">
        <button className="group text-primary relative inline-flex w-56 cursor-pointer items-center justify-center rounded-xl bg-white/60 px-4 py-2 text-sm ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
          <span className="relative z-10">Get Started</span>
          <span className="bg-primary/50 dark:bg-primary/40 pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full blur-[14px] transition-transform duration-300 ease-in-out group-hover:translate-1/2"></span>
        </button>
      </div>
      <span className="bg-primary/25 dark:bg-primary/40 pointer-events-none absolute bottom-0 left-1/2 z-0 size-[80%] -translate-x-1/2 translate-y-2/3 rounded-full blur-[200px] transition-transform duration-300 ease-in-out group-hover:translate-1/2"></span>
    </AnimatedShow>
  );
}
