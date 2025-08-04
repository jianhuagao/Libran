import Link from 'next/link';
import Image from 'next/image';
import BackgroundDots from '@/components/ui/BackgroundDots';
import DarkSwitch from '@/components/ui/DarkSwitch';
import AnimatedInitial from '@/components/ui/motions/AnimatedInitial';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function SigninPage() {
  return (
    <form className="flex min-h-screen flex-col justify-center overflow-hidden p-4">
      <BackgroundDots fadeX />
      <AnimatedInitial className="relative mx-auto flex h-full w-full max-w-[460px] grow flex-col rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-lg backdrop-blur-2xl transition-[border-color] md:max-h-[600px] dark:border-white/5 dark:bg-[#252529]/70">
        <AnimatedShow itemClassNames={['', '', '', '', '', 'mt-auto']} className="flex h-full grow flex-col">
          <h1 className="flex items-center justify-center gap-4 py-18 text-3xl font-semibold">
            <Image src="/img/logo.svg" width={26} height={26} alt="" />
            Log in to Web
          </h1>
          <div className="text-center">
            <input
              type="text"
              aria-label="inputtext"
              name="inputtext"
              className="w-64 rounded-lg border border-gray-300/50 bg-white/40 px-3 py-1.5 text-sm/6 backdrop-blur-2xl focus:border-black/5 focus:ring-2 focus:ring-gray-50/50 focus:outline-hidden dark:text-white dark:placeholder:text-white/80 focus:dark:ring-white/50"
              placeholder="Username or Email"
              // value=""
            />
          </div>
          <div className="mt-4 text-center">
            <input
              type="password"
              aria-label="inputtext"
              name="inputtext"
              className="w-64 rounded-lg border border-gray-300/50 bg-white/40 px-3 py-1.5 text-sm/6 backdrop-blur-2xl focus:border-black/5 focus:ring-2 focus:ring-gray-50/50 focus:outline-hidden dark:text-white dark:placeholder:text-white/80 focus:dark:ring-white/50"
              placeholder="Password"
              // value=""
            />
          </div>
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="group relative inline-flex w-64 cursor-pointer items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm text-purple-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50"
            >
              <span className="relative z-10">Continue with Email</span>
              <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-purple-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-purple-400/40"></span>
            </button>
          </div>
          <p className="mt-10 border-t border-gray-200 pt-4 text-center text-xs opacity-80 dark:border-white/5">
            Don&apos;t have an account?{' '}
            <Link className="underline" href="#">
              Sign Up
            </Link>
          </p>
          <div className="flex items-center gap-3 border-t border-gray-200 pt-3 dark:border-white/5">
            <Link
              href="/"
              className="group relative inline-flex cursor-pointer items-center justify-center rounded-full bg-white/60 p-2 text-xs text-emerald-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50"
            >
              <span className="relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M23 9.195V6.923L12 1L1 6.923v2.272l11-5.923zM5 11v10h14V11h2v12H3V11z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
            <div className="ml-auto"></div>
            <DarkSwitch />
          </div>
        </AnimatedShow>
        <span className="pointer-events-none absolute -top-10 -right-10 z-0 size-25 rounded-full bg-emerald-400/50 blur-[80px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-emerald-400/40"></span>
        <span className="pointer-events-none absolute -bottom-10 -left-10 z-0 size-30 rounded-full bg-purple-400/50 blur-[80px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-purple-400/40"></span>
      </AnimatedInitial>
    </form>
  );
}
