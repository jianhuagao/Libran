import Image from 'next/image';
import { upPhotoList1 } from '@p/img/wallpaper/info';

export default function ShowArea() {
  return (
    <div className="my-12 grid max-w-screen grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 overflow-x-clip px-10 py-12">
      {upPhotoList1.map(image => (
        <div key={image.id} className="group h-[200px] ease-in-out hover:z-30">
          <div className="transition-all duration-400 hover:scale-105">
            <div className="relative size-full rounded-3xl transition-all duration-200 group-hover:scale-110 group-hover:p-[6px] group-hover:delay-400">
              <Image
                src={image.src}
                alt=""
                fill
                className="absolute inset-0 -z-20 origin-bottom-right scale-[0.95] rounded-3xl object-cover"
              />
              <div className="absolute inset-0 -z-10 rounded-3xl bg-white/50 backdrop-blur-xl backdrop-saturate-200 group-hover:-m-1 group-hover:shadow-xl group-hover:delay-400 dark:bg-black/50"></div>
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
                className="z-30 h-[200px] w-full rounded-[16px] object-cover group-hover:shadow-2xl group-hover:delay-400"
              />
              <div className="h-0 p-0 opacity-0 transition-all group-hover:h-[60px] group-hover:p-2 group-hover:opacity-100 group-hover:delay-400">
                <p className="text-lg font-semibold">
                  #{image.id} {image.alt}
                </p>
                <div className="flex items-center gap-2 text-xs opacity-50">
                  author: {image.author}
                  <a href={image.authorHref} target="_blank" rel="noopener noreferrer" className="text-xs opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
