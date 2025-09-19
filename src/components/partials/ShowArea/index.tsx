import Image from 'next/image';

// 图片数据
const images = [
  { id: 1, src: '/img/wallpaper/c1.jpg', alt: 'Mountain Landscape' },
  { id: 2, src: '/img/wallpaper/c2.jpg', alt: 'Ocean Sunset' },
  { id: 3, src: '/img/wallpaper/c3.jpg', alt: 'Forest Pathway' },
  { id: 4, src: '/img/wallpaper/c4.jpg', alt: 'Desert Dunes' },
  { id: 5, src: '/img/wallpaper/c5.jpg', alt: 'City Skyline' },
  { id: 6, src: '/img/wallpaper/c6.jpg', alt: 'Northern Lights' },
  { id: 7, src: '/img/wallpaper/c7.jpg', alt: 'Tropical Beach' },
  { id: 8, src: '/img/wallpaper/c8.jpg', alt: 'Snowy Mountains' },
  { id: 9, src: '/img/wallpaper/w1.jpg', alt: 'Snowy Mountains' },
  { id: 10, src: '/img/wallpaper/w2.jpg', alt: 'Snowy Mountains' }
];

export default function ShowArea() {
  return (
    <div className="my-12 grid max-w-screen grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 overflow-x-clip px-10 py-12">
      {images.map(image => (
        <div key={image.id} className="group h-[200px] ease-in-out hover:z-30">
          <div className="transition-all duration-400 hover:scale-105">
            <div className="relative size-full rounded-3xl transition-all duration-200 group-hover:scale-110 group-hover:p-[6px] group-hover:delay-400">
              <Image src={image.src} alt="" fill className="absolute inset-0 -z-20 scale-[0.95] rounded-3xl object-cover" />
              <div className="absolute inset-0 -z-10 rounded-3xl bg-white/50 backdrop-blur-lg group-hover:-m-1 group-hover:shadow-xl group-hover:delay-400 dark:bg-black/50"></div>
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
                className="z-30 h-[200px] w-full rounded-[20px] object-cover group-hover:shadow-2xl group-hover:delay-400"
              />
              <div className="h-0 p-0 opacity-0 transition-all group-hover:h-[60px] group-hover:p-2 group-hover:opacity-100 group-hover:delay-400">
                <p className="text-lg font-semibold">
                  {image.alt} #{image.id}
                </p>
                <p className="text-xs opacity-50">Date: 2025-09-19</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
