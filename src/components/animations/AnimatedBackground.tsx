import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)`,
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${10 + (i % 4) * 25}%`,
            top: `${10 + Math.floor(i / 4) * 40}%`,
          }}
          animate={{
            x: mousePosition.x * (20 + i * 10),
            y: mousePosition.y * (20 + i * 10),
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" }
          }}
        />
      ))}

      {/* Animated gradient meshes */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at ${20 + mousePosition.x * 60}% ${30 + mousePosition.y * 40}%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
            radial-gradient(circle at ${80 - mousePosition.x * 60}% ${70 - mousePosition.y * 40}%, hsl(var(--accent) / 0.3) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particle system */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};