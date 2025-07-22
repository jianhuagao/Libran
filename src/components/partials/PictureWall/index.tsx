import Image from 'next/image';

export default function PictureWall() {
  return (
    <div className="hiddenScrollbar flex max-w-screen items-center gap-12 overflow-scroll py-20">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
        <div key={item} className="rotate-4 transition-transform duration-700 ease-in-out hover:scale-105 hover:rotate-0">
          <div className="h-[350px] w-[300px] rounded-2xl border border-white/20 bg-white/5 p-2 shadow backdrop-blur dark:bg-black/10">
            <div className="relative flex h-full w-full flex-col gap-1 overflow-hidden rounded-xl border border-white/10 bg-white/90 p-4 shadow-2xl dark:bg-black/80">
              <Image fill src={`/img/wallpaper/c${item}.jpg`} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
