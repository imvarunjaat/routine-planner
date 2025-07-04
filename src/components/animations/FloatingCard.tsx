import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
}

export const FloatingCard = ({ 
  children, 
  className = '', 
  delay = 0,
  hoverScale = 1.02
}: FloatingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: hoverScale,
        y: -8,
        rotateX: 5,
        rotateY: isHovered ? 2 : 0
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {/* Floating shadow */}
      <motion.div
        className="absolute inset-0 bg-black/10 rounded-lg blur-xl"
        animate={{
          y: isHovered ? 15 : 10,
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.2 : 0.1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main card */}
      <Card className="relative z-10 bg-gradient-card shadow-card border-0 overflow-hidden">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-br from-primary/5 to-accent/5"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-lg"
          animate={isHovered ? {
            borderColor: 'hsl(var(--primary) / 0.2)',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.1)'
          } : {}}
          transition={{ duration: 0.3 }}
        />

        {/* Corner highlights */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-primary/30"
            style={{
              top: i < 2 ? 0 : 'auto',
              bottom: i >= 2 ? 0 : 'auto',
              left: i % 2 === 0 ? 0 : 'auto',
              right: i % 2 === 1 ? 0 : 'auto',
              borderTopWidth: i < 2 ? '2px' : 0,
              borderBottomWidth: i >= 2 ? '2px' : 0,
              borderLeftWidth: i % 2 === 0 ? '2px' : 0,
              borderRightWidth: i % 2 === 1 ? '2px' : 0,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0
            }}
            transition={{ delay: i * 0.1, duration: 0.2 }}
          />
        ))}
      </Card>
    </motion.div>
  );
};