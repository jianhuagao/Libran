import Image from 'next/image';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

const logos = [
  {
    name: 'Vercel',
    url: '/img/logos/Vercel.svg'
  },
  {
    name: 'Nextjs',
    url: '/img/logos/Nextjs.svg'
  },
  {
    name: 'Prime',
    url: '/img/logos/Prime.svg'
  },
  {
    name: 'Trustpilot',
    url: '/img/logos/Trustpilot.svg'
  },
  {
    name: 'Webflow',
    url: '/img/logos/Webflow.svg'
  },
  {
    name: 'Airbnb',
    url: '/img/logos/Airbnb.svg'
  },
  {
    name: 'Tina',
    url: '/img/logos/Tina.svg'
  },
  {
    name: 'Stackoverflow',
    url: '/img/logos/Stackoverflow.svg'
  },
  {
    name: 'Mistral',
    url: '/img/logos/Mistral.svg'
  }
];

const LogoCloud = () => {
  return (
    <AnimatedShow scale={0.5} inViewShow className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage: 'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)'
          }}
        >
          {[1, 2, 3, 4, 5].map(index => (
            <div key={index} className="animate-logo-cloud flex shrink-0 flex-row justify-around gap-6">
              {logos.map((logo, key) => (
                <Image
                  key={key}
                  src={logo.url}
                  height={40}
                  width={112}
                  className="px-2 brightness-0 dark:invert"
                  alt={`${logo.name}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </AnimatedShow>
  );
};

export default LogoCloud;
