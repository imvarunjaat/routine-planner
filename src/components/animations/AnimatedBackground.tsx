import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface AnimatedBackgroundProps {
  density?: 'low' | 'medium' | 'high';
}

export const AnimatedBackground = ({ density = 'medium' }: AnimatedBackgroundProps) => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const frameRef = useRef<number>();
  const prevMousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    // Throttled mouse move handler using requestAnimationFrame
    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current) return;
      
      frameRef.current = requestAnimationFrame(() => {
        const newX = e.clientX / window.innerWidth;
        const newY = e.clientY / window.innerHeight;
        
        // Smooth out mouse movement with some easing
        const x = prevMousePos.current.x + (newX - prevMousePos.current.x) * 0.1;
        const y = prevMousePos.current.y + (newY - prevMousePos.current.y) * 0.1;
        
        setMousePosition({ x, y });
        prevMousePos.current = { x, y };
        frameRef.current = undefined;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Determine the number of elements based on density and reduced motion preference
  const getCount = (baseCount: number) => {
    if (isReducedMotion) return Math.floor(baseCount / 3);
    switch (density) {
      case 'low': return Math.floor(baseCount / 2);
      case 'high': return baseCount * 1.5;
      default: return baseCount;
    }
  };

  // Theme-responsive colors
  const orbPrimaryColor = theme === 'dark' ? 'hsl(var(--primary) / 0.25)' : 'hsl(var(--primary) / 0.3)';
  const orbSecondaryColor = theme === 'dark' ? 'hsl(var(--accent) / 0.2)' : 'hsl(var(--accent) / 0.15)';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-700">
      {/* Floating orbs - responsive to theme */}
      {[...Array(getCount(8))].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-md"
          style={{
            background: i % 2 === 0
              ? `radial-gradient(circle, ${orbPrimaryColor}, transparent 70%)`
              : `radial-gradient(circle, ${orbSecondaryColor}, transparent 70%)`,
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            left: `${5 + (i % 4) * 25}%`,
            top: `${15 + Math.floor(i / 4) * 30}%`,
            opacity: isReducedMotion ? 0.1 : 0.15
          }}
          animate={isReducedMotion ? {} : {
            x: mousePosition.x * (15 + i * 8) * (i % 2 === 0 ? 1 : -1),
            y: mousePosition.y * (15 + i * 8) * (i % 2 === 0 ? -1 : 1),
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            x: { type: "spring", stiffness: 40, damping: 25 },
            y: { type: "spring", stiffness: 40, damping: 25 },
            scale: { duration: 8 + i, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      {/* Animated gradient meshes */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${20 + mousePosition.x * 60}% ${30 + mousePosition.y * 40}%, hsl(var(--primary) / 0.1) 0%, transparent 60%),
            radial-gradient(circle at ${80 - mousePosition.x * 60}% ${70 - mousePosition.y * 40}%, hsl(var(--accent) / 0.1) 0%, transparent 60%)
          `,
          opacity: theme === 'dark' ? 0.15 : 0.1
        }}
        animate={isReducedMotion ? {} : {
          opacity: theme === 'dark' 
            ? [0.10, 0.15, 0.10]
            : [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Background noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Enhanced particle system with different shapes and sizes */}
      {!isReducedMotion && [...Array(getCount(20))].map((_, i) => {
        // Randomize properties for more natural look
        const size = 1 + Math.random() * 2;
        const isCircle = Math.random() > 0.3;
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 6;
        const startPosition = Math.random() * 100;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute ${isCircle ? 'rounded-full' : 'rounded-sm rotate-45'}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${startPosition}%`,
              bottom: '-10px',
              backgroundColor: i % 3 === 0 
                ? 'hsl(var(--primary))' 
                : i % 3 === 1 
                  ? 'hsl(var(--accent))' 
                  : 'hsl(var(--secondary))'
            }}
            animate={{
              y: [-10, -30 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Light beams - visible only in dark mode */}
      {theme === 'dark' && !isReducedMotion && (
        <>
          <motion.div 
            className="absolute h-[30vh] w-[2px] bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0 blur-sm"
            style={{
              left: `${30 + mousePosition.x * 10}%`,
              top: 0,
              transformOrigin: 'top center'
            }}
            animate={{
              scaleY: [0.7, 1.3, 0.7],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute h-[20vh] w-[1px] bg-gradient-to-b from-accent/0 via-accent/10 to-accent/0 blur-sm"
            style={{
              left: `${70 - mousePosition.x * 5}%`,
              top: 0,
              transformOrigin: 'top center'
            }}
            animate={{
              scaleY: [0.8, 1.2, 0.8],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{
              duration: 7,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </div>
  );
};