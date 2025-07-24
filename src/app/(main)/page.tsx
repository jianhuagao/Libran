import BannerBetween from '@/components/partials/Banners/BannerBetween';
import Features from '@/components/partials/Features';
import LogoCloud from '@/components/partials/LogoCloud';
import PictureWall from '@/components/partials/PictureWall';
import BackgroundBlock from '@/components/ui/BackgroundBlock';
import CenterContent from '@/components/ui/CenterContent';

export default function Home() {
  return (
    <div>
      <BackgroundBlock />
      <div className="min-h-[1200px]">
        <CenterContent>
          <BannerBetween />
        </CenterContent>
        <PictureWall />
        <CenterContent>
          <Features />
        </CenterContent>
        <CenterContent>
          <LogoCloud />
        </CenterContent>
      </div>
    </div>
  );
}
