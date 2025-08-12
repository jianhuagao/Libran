'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollMoveProps {
  children: ReactNode;
  x?: number;
  y?: number;
  duration?: number;
  delay?: number;
}

export default function ScrollMove({ children, x = 0, y = 0, duration = 0.6, delay = 0 }: ScrollMoveProps) {
  // 根据触发点类型设置不同的视口参数
  const viewportOptions = {
    margin: '-30% 0px -30% 0px', // 上下扩展30%的触发区域
    amount: 1
  };

  return (
    <motion.div
      initial={{ x: 0, y: 0, transition: { duration, delay } }}
      whileInView={{
        x,
        y,
        transition: { duration, delay }
      }}
      viewport={viewportOptions}
    >
      {children}
    </motion.div>
  );
}
