import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GreetingHeader } from '@/components/GreetingHeader';
import { WeatherCard } from '@/components/WeatherCard';
import { CalendarEvents } from '@/components/CalendarEvents';
import { QuoteCard } from '@/components/QuoteCard';
import { EmailSummary } from '@/components/EmailSummary';
import { AnimatedBackground } from '@/components/animations/AnimatedBackground';
import heroImage from '@/assets/morning-hero.jpg';

const Index = () => {
  const [summaryData, setSummaryData] = useState({
    weather: {
      location: 'San Francisco',
      temperature: 22,
      condition: 'Partly Cloudy'
    },
    events: [
      { title: 'Team Standup', time: '09:00' },
      { title: 'Project Review', time: '11:30' },
      { title: 'Lunch with Sarah', time: '12:30' },
      { title: 'Client Presentation', time: '15:00' }
    ],
    quote: {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Header Section */}
              <motion.div variants={itemVariants}>
                <GreetingHeader />
              </motion.div>

              {/* Main Content Grid */}
              <motion.div
                variants={itemVariants}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {/* Weather - Takes 1 column */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-1"
                >
                  <WeatherCard />
                </motion.div>

                {/* Calendar Events - Takes 2 columns on desktop */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 lg:col-span-2"
                >
                  <CalendarEvents />
                </motion.div>
              </motion.div>

              {/* Quote Section - Full width */}
              <motion.div variants={itemVariants}>
                <QuoteCard />
              </motion.div>

              {/* Email Summary - Full width */}
              <motion.div variants={itemVariants}>
                <EmailSummary data={summaryData} />
              </motion.div>

              {/* Footer */}
              <motion.footer
                variants={itemVariants}
                className="text-center py-8"
              >
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-sm text-muted-foreground"
                >
                  Built with ❤️ for productive mornings
                </motion.p>
                <div className="mt-4 flex justify-center space-x-4 text-xs text-muted-foreground">
                  <span>🌤️ OpenWeatherMap</span>
                  <span>📅 Google Calendar</span>
                  <span>✨ ZenQuotes</span>
                  <span>📧 EmailJS</span>
                </div>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl"
            >
              🌅
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;