import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TextReveal = ({ 
  text, 
  className = '', 
  delay = 0,
  speed = 0.05
}: TextRevealProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        const nextChar = text[currentIndex];
        setDisplayedText(prev => prev + nextChar);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * speed * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {/* Background highlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: currentIndex / text.length }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Text content */}
      <span className="relative z-10">
        {displayedText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: delay + index * speed,
              duration: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* Cursor */}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-primary ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};