'use client';

import { useTheme } from '@/hooks/useTheme';

const directionMap = {
  toTop: '0deg',
  toBottom: '180deg',
  toLeft: '270deg',
  toRight: '90deg'
};

import { useState, useEffect } from 'react';

export default function BackgroundBlock(props: { direction?: 'toTop' | 'toBottom' | 'toLeft' | 'toRight' }) {
  const { theme } = useTheme();
  const { direction = 'toBottom' } = props;
  const gradientDirection = directionMap[direction];
  const [isVisible, setIsVisible] = useState(false); // 控制图片显示状态

  // 页面加载后延迟显示图片，确保主题已应用
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // 100ms延迟，可根据需要调整

    return () => clearTimeout(timer);
  }, [theme]);

  const bgImage = theme === 'dark' ? '/img/wallpaper/w1.jpg' : '/img/wallpaper/w2.jpg';

  return (
    <div
      style={{
        maskImage: `linear-gradient(${gradientDirection},white 1%,rgba(255,255,255,0) 98%)`,
        backgroundImage: isVisible ? `url(${bgImage})` : 'none', // 只有visible时才设置背景图
        opacity: isVisible ? 1 : 0, // 淡入效果
        transition: 'opacity 0.3s ease-in-out'
      }}
      className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
    ></div>
  );
}
