import Image from 'next/image';
import WallScrollContainer from './WallScrollContainer';
import { upPhotoList1 } from '@p/img/wallpaper/info';

export default function DynamicPictureWall() {
  return (
    <WallScrollContainer scrollFactor={1} lerp={0.14} endOffset={32}>
      {upPhotoList1.map(image => (
        <article
          key={image.id}
          className="group relative shrink-0 transform transition-all duration-500 ease-in-out hover:scale-105"
        >
          <div className="h-[400px] w-[300px] rounded-2xl border border-white/20 bg-white/5 p-2 shadow-lg backdrop-blur-lg">
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/90 shadow-2xl dark:bg-black/80">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                priority={image.id <= 3}
              />

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
                <h3 className="text-lg font-bold text-white">{image.alt}</h3>
                <p className="text-sm text-gray-300">author: @{image.author}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </WallScrollContainer>
  );
}
