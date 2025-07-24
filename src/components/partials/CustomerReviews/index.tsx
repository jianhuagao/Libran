import BackgroundDots from '@/components/ui/BackgroundDots';
import CenterContent from '@/components/ui/CenterContent';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function CustomerReviews() {
  // 配置化虚拟评论数据
  const reviews = [
    {
      id: 1,
      comment:
        "The platform's intuitive interface transformed our workflow completely. Implementation took less than a week and we immediately saw productivity improvements across teams.",
      name: 'Sarah Johnson',
      date: 'May 15, 2024',
      position: 'CTO @ TechInnovate'
    },
    {
      id: 2,
      comment:
        'Enterprise-grade security features with the flexibility of a startup solution. Our compliance team was impressed with the documentation and audit capabilities.',
      name: 'Michael Chen',
      date: 'June 3, 2024',
      position: 'Security Director @ GlobalFin'
    },
    {
      id: 3,
      comment:
        'The analytics dashboard provides insights we never had access to before. The customizable reporting feature alone justified our investment within the first quarter.',
      name: 'Emily Rodriguez',
      date: 'July 11, 2024',
      position: 'Product Manager @ DataFlow'
    },
    {
      id: 4,
      comment:
        "Exceptional customer support combined with a robust API ecosystem. We've built three custom integrations without any technical hurdles.",
      name: 'David Wilson',
      date: 'August 2, 2024',
      position: 'Developer Relations @ CloudNex'
    }
  ];

  return (
    <div className="relative">
      <BackgroundDots fadeX />
      <CenterContent>
        <AnimatedShow inViewShow className="my-10 flex flex-col gap-5">
          <h1 className="text-center text-2xl font-semibold">Client Success Stories</h1>
          <h3 className="text-center opacity-90">
            Discover how organizations across industries have transformed their operations with our platform
          </h3>
        </AnimatedShow>
        <AnimatedShow inViewShow className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map(review => (
            <div
              key={review.id}
              className="group flex h-[300px] cursor-pointer flex-col drop-shadow-xl transition-all duration-600 hover:drop-shadow-2xl"
            >
              <div className="h-[200px] shrink rounded-t-2xl bg-[#f5f5f7]/80 p-[18px] dark:bg-gray-600/40">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <div key={s} className="text-[#fbb040]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="mt-4 line-clamp-4" title={review.comment}>
                  “{review.comment}”
                </p>
              </div>
              <div className="relative grow overflow-hidden rounded-b-2xl bg-white/80 px-[18px] py-[24px] transition-all duration-300 group-hover:pb-[80px] dark:dark:bg-[#252529]/70">
                <div>
                  <p className="mb-[16px] text-[18px] font-semibold">{review.name}</p>
                  <p className="text-xs">{review.date}</p>
                </div>

                <p className="invisible absolute mt-[16px] text-xs opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  {review.position}
                </p>
              </div>
            </div>
          ))}
        </AnimatedShow>
      </CenterContent>
    </div>
  );
}
