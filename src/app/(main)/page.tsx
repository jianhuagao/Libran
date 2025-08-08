import BannerBetween from '@/components/partials/Banners';
import Features from '@/components/partials/Features';
import LogoCloud from '@/components/partials/LogoCloud';
import PictureWall from '@/components/partials/PictureWall';
import ProductPitch from '@/components/partials/ProductPitch';
import CustomerReviews from '@/components/partials/CustomerReviews';
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
        <CenterContent>
          <Features />
        </CenterContent>
        <CenterContent>
          <ProductPitch />
        </CenterContent>
        <PictureWall />
        <CustomerReviews />
        <CenterContent>
          <LogoCloud />
        </CenterContent>
      </div>
    </div>
  );
}
