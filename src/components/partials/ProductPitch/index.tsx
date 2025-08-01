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
    <AnimatedShow scale={0.6} inViewShow className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold">Modern Solutions for Tomorrow&apos;s Digital Landscape</h1>
        <h3 className="my-8 max-w-2xl text-xl opacity-80">
          Discover a versatile platform showcasing cutting-edge development techniques and innovative user experience design
          principles
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
      <div className="relative ml-auto hidden h-[300px] w-[400px] lg:block">
        <Image
          src="/img/productPitch.svg"
          alt="Modern application dashboard interface"
          width={400}
          height={300}
          className="object-contain"
        />
      </div>
    </AnimatedShow>
  );
}
