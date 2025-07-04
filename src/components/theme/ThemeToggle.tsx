import { useState, useEffect } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  
  // Initialize theme on component mount
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);
  
  // Direct DOM manipulation to toggle theme
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Update DOM directly
    const root = document.documentElement;
    if (newIsDark) {
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-[9999]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      {/* Animated particles */}
      <AnimatePresence>
        {isDark && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-yellow-300"
                initial={{ 
                  scale: 0,
                  x: 0, 
                  y: 0,
                  opacity: 0.7 
                }}
                animate={{ 
                  scale: [1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (20 + Math.random() * 30)],
                  y: [0, (i < 3 ? -1 : 1) * (20 + Math.random() * 30)],
                  opacity: [0.7, 0]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.6 + Math.random() * 0.5,
                  ease: "easeOut"
                }}
                style={{
                  width: 2 + Math.random() * 4,
                  height: 2 + Math.random() * 4,
                  left: "50%",
                  top: "50%",
                  zIndex: -1
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Animated halo/glow effect */}
      <motion.div 
        className={`absolute inset-0 rounded-full ${isDark ? 'bg-yellow-500/20' : 'bg-primary/20'}`}
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      />
      
      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: [0, -5, 5, -5, 0],
          transition: {
            rotate: {
              duration: 0.5,
              ease: "easeInOut"
            }
          }
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={toggleTheme}
          className={`rounded-full shadow-lg backdrop-blur-md h-12 w-12 p-0 ring-1 
            ${isDark 
              ? 'bg-background/80 border-yellow-500/30 ring-yellow-500/20 hover:bg-yellow-500/10' 
              : 'bg-background/80 border-primary/20 ring-primary/20 hover:bg-primary/10'}`}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ opacity: 0, y: -10, rotate: -30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, rotate: 30, scale: 0.5 }}
              transition={{ 
                type: "spring",
                stiffness: 300, 
                damping: 15 
              }}
            >
              {isDark ? (
                <Sun className="h-[1.5rem] w-[1.5rem] text-yellow-500 drop-shadow-glow" />
              ) : (
                <Moon className="h-[1.5rem] w-[1.5rem] text-primary drop-shadow-sm" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>
    </motion.div>
  );
}
