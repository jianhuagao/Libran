import Image from 'next/image';
import WallScrollContainer from './WallScrollContainer';

// 图片数据
const images = [
  { id: 1, src: '/img/wallpaper/c1.jpg', alt: 'Mountain Landscape' },
  { id: 2, src: '/img/wallpaper/c2.jpg', alt: 'Ocean Sunset' },
  { id: 3, src: '/img/wallpaper/c3.jpg', alt: 'Forest Pathway' },
  { id: 4, src: '/img/wallpaper/c4.jpg', alt: 'Desert Dunes' },
  { id: 5, src: '/img/wallpaper/c5.jpg', alt: 'City Skyline' },
  { id: 6, src: '/img/wallpaper/c6.jpg', alt: 'Northern Lights' },
  { id: 7, src: '/img/wallpaper/c7.jpg', alt: 'Tropical Beach' },
  { id: 8, src: '/img/wallpaper/c8.jpg', alt: 'Snowy Mountains' }
];

export default function DynamicPictureWall() {
  return (
    <WallScrollContainer>
      {images.map(image => (
        <div
          key={image.id}
          className="group relative flex-shrink-0 transform transition-all duration-500 ease-in-out hover:scale-105 hover:rotate-0"
        >
          <div className="h-[400px] w-[300px] rounded-2xl border border-white/20 bg-white/5 p-2 shadow-lg backdrop-blur-lg">
            <div className="relative flex h-full w-full flex-col gap-1 overflow-hidden rounded-xl border border-white/10 bg-white/90 p-4 shadow-2xl dark:bg-black/80">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                priority={image.id <= 3} // 仅前3张预加载
              />
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-lg font-bold text-white">{image.alt}</h3>
                <p className="text-sm text-gray-300">Image #{image.id}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </WallScrollContainer>
  );
}
