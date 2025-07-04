import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'slide-in-up' | 'slide-in-down' | 'scale-in';
  delay?: number;
  className?: string;
}

const getVariants = (animation: string) => {
  switch (animation) {
    case 'slide-in-left':
      return {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
      };
    case 'slide-in-right':
      return {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
      };
    case 'slide-in-up':
      return {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      };
    case 'slide-in-down':
      return {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
      };
    case 'scale-in':
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      };
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      };
  }
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  className = ''
}) => (
  <motion.section
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay: delay / 1000 }}
    variants={getVariants(animation)}
    aria-label="Animated Section"
    role="region"
  >
    {children}
  </motion.section>
);

export default AnimatedSection;