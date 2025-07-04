import { useEffect, useRef, useState } from 'react';
import { useRive } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';

interface RiveWeatherIconProps {
  condition: string;
  className?: string;
}

export const RiveWeatherIcon = ({ condition, className = "" }: RiveWeatherIconProps) => {
  const [fallbackIcon, setFallbackIcon] = useState('☀️');

  // For demo purposes, we'll use emoji fallbacks with animations
  // In production, you'd load actual Rive files
  useEffect(() => {
    const getWeatherIcon = (condition: string) => {
      const conditionLower = condition.toLowerCase();
      if (conditionLower.includes('sun') || conditionLower.includes('clear')) return '☀️';
      if (conditionLower.includes('cloud')) return '☁️';
      if (conditionLower.includes('partly')) return '⛅';
      if (conditionLower.includes('rain')) return '🌧️';
      if (conditionLower.includes('storm')) return '⛈️';
      if (conditionLower.includes('snow')) return '❄️';
      return '🌤️';
    };
    
    setFallbackIcon(getWeatherIcon(condition));
  }, [condition]);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        animate={{
          boxShadow: [
            '0 0 20px hsl(var(--primary) / 0.3)',
            '0 0 40px hsl(var(--primary) / 0.5)',
            '0 0 20px hsl(var(--primary) / 0.3)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Weather Icon */}
      <motion.div
        className="text-6xl relative z-10"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {fallbackIcon}
      </motion.div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};