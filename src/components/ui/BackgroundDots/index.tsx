import React from 'react';

interface DotPatternBackgroundProps {
  dotSize?: number;
  dotColor?: string;
  backgroundColor?: string;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  /** 左右渐隐（透明→中间→透明） */
  fadeY?: boolean;
  /** 上下渐隐（透明→中间→透明） */
  fadeX?: boolean;
  [key: string]: React.HTMLAttributes<HTMLDivElement>[keyof React.HTMLAttributes<HTMLDivElement>];
}

export const BackgroundDots: React.FC<DotPatternBackgroundProps> = ({
  dotSize = 1.2,
  dotColor = '#7cca9a',
  backgroundColor = 'transparent',
  gap = 15,
  className = '',
  style,
  fadeY = false,
  fadeX = false,
  ...props
}) => {
  const encodedDotColor = encodeURIComponent(dotColor);

  let maskImage: string | undefined;
  let webkitMaskImage: string | undefined;

  if (fadeY && fadeX) {
    // 四周向中心径向渐隐
    maskImage = 'radial-gradient(circle at center, white 50%, transparent 100%)';
    webkitMaskImage = maskImage;
  } else if (fadeY) {
    // 左右向中间线性渐隐
    maskImage = 'linear-gradient(to right, transparent 0%, white 50%, transparent 100%)';
    webkitMaskImage = maskImage;
  } else if (fadeX) {
    // 上下向中间线性渐隐
    maskImage = 'linear-gradient(to bottom, transparent 0%, white 50%, transparent 100%)';
    webkitMaskImage = maskImage;
  }

  const maskStyle: React.CSSProperties = maskImage ? { maskImage, WebkitMaskImage: webkitMaskImage } : {};

  const backgroundStyle: React.CSSProperties = {
    backgroundColor,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='${gap}' height='${gap}' viewBox='0 0 ${gap} ${gap}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodedDotColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='${dotSize}' cy='${dotSize}' r='${dotSize}'/%3E%3C/g%3E%3C/svg%3E")`,
    ...maskStyle,
    ...style
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-20 h-full w-full ${className}`}
      style={backgroundStyle}
      {...props}
    />
  );
};

export default BackgroundDots;
