import BannerBetween from '@/components/partials/Banners/BannerBetween';
import LogoCloud from '@/components/partials/LogoCloud';
import PictureWall from '@/components/partials/PictureWall';
import BackgroundBlock from '@/components/ui/BackgroundBlock';

export default function Home() {
  return (
    <div>
      <BackgroundBlock />
      <div className="min-h-[1200px]">
        <div className="mx-auto mt-9 flex max-w-7xl flex-col p-5 sm:p-20">
          <BannerBetween />
        </div>
        <PictureWall />
        <LogoCloud />
      </div>
    </div>
  );
}
