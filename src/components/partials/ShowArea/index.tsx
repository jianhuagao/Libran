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
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 p-6">
      {images.map(image => (
        <div key={image.id} className="h-[200px]">
          <Image src={image.src} alt={image.alt} width={300} height={200} className="h-full w-full rounded-3xl object-cover" />
        </div>
      ))}
    </div>
  );
}
