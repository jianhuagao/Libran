import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function Features() {
  const features = [
    {
      icon: '🌠',
      title: 'Smart Search',
      description: 'Quickly and accurately find the content you need with multiple search methods.'
    },
    {
      icon: '🔄',
      title: 'Real-time Sync',
      description: 'Automatically sync data across devices to ensure you access the latest information anywhere.'
    },
    {
      icon: '🔒',
      title: 'Secure Encryption',
      description: 'Advanced encryption technology to protect your privacy and data security.'
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Intuitive data visualization and in-depth analysis to help you make informed decisions.'
    },
    { icon: '⚙️', title: 'Custom Settings', description: 'Flexible personalization options to create your专属 experience.' },
    {
      icon: '📱',
      title: 'Mobile Optimization',
      description: 'Perfect support for various mobile devices to work efficiently anytime, anywhere.'
    }
  ];

  return (
    <AnimatedShow scale={0.7} inViewShow className="grid w-full grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="hover:border-primary/50 flex flex-col gap-3 rounded-4xl border border-gray-200 bg-white/80 p-5 transition-[border-color] dark:border-white/5 dark:bg-[#252529]/70"
        >
          <div className="rounded-primary flex size-10 items-center justify-center bg-[#f6f6f7]/80 text-lg dark:bg-black/80">
            {feature.icon}
          </div>
          <p className="text-base font-semibold opacity-80">{feature.title}</p>
          <p className="text-sm text-gray-800 dark:text-gray-400">{feature.description}</p>
        </div>
      ))}
    </AnimatedShow>
  );
}
