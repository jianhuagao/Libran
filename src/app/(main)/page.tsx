import BannerBetween from '@/components/partials/Banners';
import Features from '@/components/partials/Features';
import LogoCloud from '@/components/partials/LogoCloud';
import PictureWall from '@/components/partials/PictureWall';
import ProductPitch from '@/components/partials/ProductPitch';
import CustomerReviews from '@/components/partials/CustomerReviews';
import BackgroundBlock from '@/components/ui/BackgroundBlock';
import CenterContent from '@/components/ui/CenterContent';
import PitchCard from '@/components/partials/PitchCard';
import Cover from '@/components/partials/Cover';
import ShowArea from '@/components/partials/ShowArea';

export default function Home() {
  return (
    <div>
      <BackgroundBlock />
      <div className="min-h-[1200px]">
        <CenterContent>
          <BannerBetween />
        </CenterContent>
        <CenterContent>
          <Features />
        </CenterContent>
        <ProductPitch />
        <Cover />
        <PictureWall />
        <CustomerReviews />
        <ShowArea />
        <CenterContent>
          <PitchCard />
        </CenterContent>
        <CenterContent>
          <LogoCloud />
        </CenterContent>
      </div>
    </div>
  );
}
