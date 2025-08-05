import BackgroundGrid from '@/components/ui/BackgroundGrid';
import CenterContent from '@/components/ui/CenterContent';
import AnimatedShow from '@/components/ui/motions/AnimatedShow';

export default function PricingPage() {
  return (
    <CenterContent>
      <BackgroundGrid />
      <AnimatedShow className="mb-20 flex flex-col gap-6">
        <h1 className="text-center text-4xl font-bold">Fair pricing, unfair advantage.</h1>
        <h1 className="text-center text-xl opacity-80">
          Get started with Libran today and take your business to the next level.
        </h1>
        <div className="mt-6 mb-2 flex items-center justify-center gap-2">
          <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/60 px-4 py-2 text-sm text-emerald-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
            <span className="relative z-10">Monthly</span>
            <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-emerald-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-emerald-400/40"></span>
          </button>
          <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/60 px-4 py-2 text-sm text-red-800 ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
            <span className="relative z-10">Annual</span>
            <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-red-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-red-400/40"></span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <PricingItemBlock
            title="Basic"
            price={19}
            currency="$"
            period="monthly"
            description="Start with essential tools to boost your online presence."
            buttonText="Get Started"
            features={[
              'SEO Strategy & Topic Recommendations',
              'Competitor Analysis to stand out',
              'Built-in Keyword Research',
              'Target latest Google trends'
            ]}
          />
          <PricingItemBlock
            title="Professional"
            price={49}
            currency="$"
            period="monthly"
            description="Ideal for small teams and projects."
            buttonText="Get Started"
            features={[
              'Everything in Basic plan',
              'Get 25 premium blogs',
              'Index upto 1000 pages',
              'Premium support',
              'Local SEO',
              'SEO Agent'
            ]}
            isPopular={true}
          />
          <PricingItemBlock
            title="Premium"
            price={99}
            currency="$"
            period="monthly"
            description="Ideal for small teams and projects."
            buttonText="Get Started"
            features={[
              'Everything in Professional plan',
              'Get Unlimited premium blogs',
              'Add your own AI Model key',
              'Premium support & training sessions'
            ]}
          />
        </div>
      </AnimatedShow>
    </CenterContent>
  );
}

// 定义props接口
interface PricingItemBlockProps {
  title: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  buttonText: string;
  features: string[];
  isPopular?: boolean;
}

function PricingItemBlock({
  title,
  price,
  currency,
  period,
  description,
  buttonText,
  features,
  isPopular = false
}: PricingItemBlockProps) {
  return (
    <div
      className={`relative mx-auto flex h-full w-full max-w-[460px] grow flex-col gap-3 rounded-2xl border border-gray-200 bg-white/80 px-6 py-8 backdrop-blur-2xl transition-[border-color] md:max-h-[600px] dark:border-white/5 dark:bg-[#252529]/70 ${isPopular ? 'ring-primary ring-2' : ''}`}
    >
      {isPopular && (
        <div
          className={`bg-primary absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white`}
        >
          POPULAR
        </div>
      )}
      <p className="text-2xl font-semibold">{title}</p>
      <div>
        <span className="align-top text-lg">{currency}</span> <span className="mr-1 text-5xl font-semibold">{price}</span>{' '}
        {period}
      </div>
      <p className="truncate pb-4 text-sm opacity-80" title={description}>
        {description}
      </p>
      <button
        className={`group text-primary relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/60 px-4 py-2 text-sm ring-1 shadow-black/10 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50`}
      >
        <span className="relative z-10">{buttonText}</span>
        <span
          className={`bg-primary/50 dark:bg-primary/40 pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2`}
        ></span>
      </button>
      <ul className="list-none pt-4 opacity-80 *:leading-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon />
            <p>{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckIcon() {
  return (
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
  );
}
