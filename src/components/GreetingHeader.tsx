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
      className="text-center mb-8"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="text-6xl mb-4"
      >
        {getGreetingEmoji()}
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-gradient-morning mb-2"
      >
        {getGreeting()}, {userName}!
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-1"
      >
        <p className="text-lg text-foreground/80 font-medium">
          {formatDate()}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatTime()}
        </p>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-24 h-1 bg-gradient-morning rounded-full mx-auto mt-4"
      />
    </motion.div>
  );
};