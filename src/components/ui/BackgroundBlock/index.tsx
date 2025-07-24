export default function BackgroundBlock() {
  // return <div className="absolute inset-0 z-0 bg-amber-200"></div>;
  return (
    // <div className="pointer-events-none absolute inset-0 -z-20 bg-green-100 [mask-image:linear-gradient(180deg,white_1%,rgba(255,255,255,0)_98%)] dark:bg-green-800"></div>
    <div className="pointer-events-none absolute inset-0 -z-20 bg-[url(/img/wallpaper/w2.jpg)] [mask-image:linear-gradient(180deg,white_1%,rgba(255,255,255,0)_98%)] bg-cover bg-center bg-no-repeat dark:bg-[url(/img/wallpaper/w1.jpg)]"></div>
  );
}
