import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const GreetingHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get or set user name
    const savedName = localStorage.getItem('dailyPrepUserName');
    if (savedName) {
      setUserName(savedName);
    } else {
      // Simple name prompt - in a real app, this would be handled differently
      const name = prompt("What's your name? (This will be saved for future visits)") || 'Friend';
      setUserName(name);
      localStorage.setItem('dailyPrepUserName', name);
    }

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getGreetingEmoji = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return '🌅';
    if (hour < 17) return '☀️';
    return '🌆';
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12 relative"
    >
      {/* Background card with blur effect */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-background/30 backdrop-blur-sm rounded-xl shadow-soft"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      />

      <div className="md:flex md:items-center md:justify-between p-8">
        <div className="flex items-center mb-4 md:mb-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            className="text-6xl sm:text-7xl mr-6"
          >
            {getGreetingEmoji()}
          </motion.div>
          
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-morning leading-tight"
            >
              {getGreeting()},
              <br className="sm:hidden" />
              <span className="ml-0 sm:ml-2">{userName}!</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2"
            >
              <p className="text-base sm:text-lg text-foreground/90 font-medium">
                {formatDate()}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-primary/10 backdrop-blur-sm px-4 py-3 rounded-lg shadow-soft hidden md:block text-right"
        >
          <motion.p 
            animate={{ 
              color: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))'],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="text-3xl font-bold"
          >
            {formatTime()}
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1">Local Time</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="h-1 bg-gradient-morning rounded-full mx-auto"
      />
    </motion.div>
  );
};