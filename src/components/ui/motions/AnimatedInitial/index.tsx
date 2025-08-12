'use client';
import { memo } from 'react';
import { HTMLMotionProps, motion } from 'motion/react';

type TransitionType = 'spring' | 'tween' | 'inertia';
interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /**
   *弹力,默认0.4,0为没有弹力
   * **/
  bounce?: number;
  type?: TransitionType;
  duration?: number;
  scale?: number;
}

export default memo(function AnimatedInitial({
  children,
  bounce = 0.4,
  type = 'spring',
  duration = 0.6,
  scale = 0.7,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale, origin: 'top' }}
      animate={{ opacity: 1, y: 0, scale: 1, origin: 'top' }}
      exit={{ opacity: 0, y: -50, scale, origin: 'top' }}
      transition={{
        duration,
        type,
        bounce
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
