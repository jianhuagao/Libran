import Spin from '@/components/ui/Spin';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <Spin />
      </div>
    </div>
  );
}
