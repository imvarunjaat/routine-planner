import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MorphingIconProps {
  icons: string[];
  interval?: number;
  className?: string;
}

export const MorphingIcon = ({ 
  icons, 
  interval = 3000, 
  className = '' 
}: MorphingIconProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icons.length);
    }, interval);

    return () => clearInterval(timer);
  }, [icons.length, interval]);

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            scale: 0, 
            rotate: -180, 
            opacity: 0,
            filter: 'blur(10px)'
          }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
            filter: 'blur(0px)'
          }}
          exit={{ 
            scale: 0, 
            rotate: 180, 
            opacity: 0,
            filter: 'blur(10px)'
          }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="text-4xl"
        >
          {icons[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: interval / 1000,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particle burst on change */}
      <AnimatePresence>
        {currentIndex !== 0 && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${currentIndex}-${i}`}
                className="absolute w-2 h-2 bg-primary/40 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60) * Math.PI / 180) * 30,
                  y: Math.sin((i * 60) * Math.PI / 180) * 30,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};