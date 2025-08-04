const directionMap = {
  toTop: '0deg',
  toBottom: '180deg',
  toLeft: '270deg',
  toRight: '90deg'
};

export default function BackgroundBlock(
  //新增背景渐变方向
  props: {
    direction?: 'toTop' | 'toBottom' | 'toLeft' | 'toRight';
  }
) {
  // return <div className="absolute inset-0 z-0 bg-amber-200"></div>;

  const { direction = 'toBottom' } = props;

  const gradientDirection = directionMap[direction];
  return (
    // <div className="pointer-events-none absolute inset-0 -z-20 bg-green-100 [mask-image:linear-gradient(180deg,white_1%,rgba(255,255,255,0)_98%)] dark:bg-green-800"></div>
    <div
      style={{
        maskImage: `linear-gradient(${gradientDirection},white 1%,rgba(255,255,255,0) 98%)`
      }}
      className="pointer-events-none absolute inset-0 -z-20 bg-[url(/img/wallpaper/w2.jpg)] bg-cover bg-center bg-no-repeat dark:bg-[url(/img/wallpaper/w1.jpg)]"
    ></div>
  );
}
