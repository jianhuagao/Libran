import CenterContent from '@/components/ui/CenterContent';
import AnimatedScrollMove from '@/components/ui/motions/AnimatedScrollMove';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';
import Image from 'next/image';

export default function ProductPitch() {
  const features = [
    'Responsive design optimized for all devices',
    'Lightning-fast page loads with optimized assets',
    'Intuitive user interface with accessibility support',
    'Secure authentication and data protection',
    'Seamless third-party service integrations',
    'Comprehensive analytics and reporting tools'
  ];

  return (
    <div className="overflow-hidden">
      <CenterContent>
        <AnimatedShow
          scale={0.6}
          inViewShow
          className="grid grid-cols-1 items-center justify-center gap-24 py-15 lg:grid-cols-2"
        >
          <div>
            <h1 className="max-w-2xl text-4xl font-bold">Modern Solutions for Tomorrow&apos;s Digital Landscape</h1>
            <h3 className="my-8 max-w-2xl text-xl opacity-80">
              Discover Libran: A powerful, flexible library showcasing cutting-edge Next.js development techniques and
              innovative user experience design principles for modern web applications
            </h3>
            <div className="mt-12 grid grid-cols-2 gap-4 font-semibold opacity-80">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-500/20 dark:bg-gray-500/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="group relative mt-20 ml-auto min-h-[200px] pb-30 sm:pb-80 lg:mt-0 lg:pb-0">
            <Image
              className="absolute -top-20 left-0 w-full max-w-[200px] -rotate-15 rounded-lg shadow-2xl sm:max-w-sm md:max-w-md"
              src="/img/screenshot/t2.jpg"
              alt="libran"
              width={400}
              height={200}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
            />
            <AnimatedScrollMove x={30} y={30}>
              <Image
                className="absolute -top-10 left-20 w-full max-w-[200px] -rotate-5 rounded-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:translate-2 sm:max-w-sm md:max-w-md"
                src="/img/screenshot/t3.jpg"
                alt="libran"
                width={400}
                height={200}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </AnimatedScrollMove>
            <AnimatedScrollMove x={50} y={50} delay={0.1}>
              <Image
                className="absolute top-0 left-40 w-full max-w-[200px] rounded-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:translate-4 sm:max-w-sm md:max-w-md"
                src="/img/screenshot/t1.png"
                alt="libran"
                width={400}
                height={200}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </AnimatedScrollMove>
          </div>
        </AnimatedShow>
      </CenterContent>
    </div>
  );
}
