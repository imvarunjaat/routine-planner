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
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden transition-smooth">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Hero Background */}
      <motion.div 
        className="absolute inset-0 opacity-5 transition-smooth"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 transition-smooth"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-5xl relative z-10">
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
                className="grid gap-6 md:grid-cols-6 lg:grid-cols-12"
              >
                {/* Weather - Takes 3 columns on medium screens, 4 on large screens */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-3 lg:col-span-4"
                >
                  <WeatherCard />
                </motion.div>

                {/* Calendar Events - Takes 3 columns on medium, 8 on large screens */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-3 lg:col-span-8"
                >
                  <CalendarEvents />
                </motion.div>
              </motion.div>

              {/* Additional content in a more structured grid */}
              <motion.div 
                variants={itemVariants}
                className="grid gap-6 md:grid-cols-12"
              >
                {/* Quote Section - 8 columns on medium+ screens */}
                <motion.div 
                  variants={itemVariants}
                  className="md:col-span-8"
                >
                  <QuoteCard />
                </motion.div>

                {/* Email Summary - 4 columns on medium+ screens */}
                <motion.div 
                  variants={itemVariants}
                  className="md:col-span-4"
                >
                  <EmailSummary data={summaryData} />
                </motion.div>
              </motion.div>

              {/* Footer */}
              <motion.footer
                variants={itemVariants}
                className="text-center py-12 mt-4 border-t border-primary/10"
              >
                <motion.div
                  className="max-w-lg mx-auto"
                >
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-sm font-medium text-primary"
                  >
                    Built with ❤️ for productive mornings
                  </motion.p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-muted-foreground">
                    <motion.span 
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="bg-background/50 px-3 py-1 rounded-full shadow-sm"
                    >🌤️ OpenWeatherMap</motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="bg-background/50 px-3 py-1 rounded-full shadow-sm"
                    >📅 Google Calendar</motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="bg-background/50 px-3 py-1 rounded-full shadow-sm"
                    >✨ ZenQuotes</motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="bg-background/50 px-3 py-1 rounded-full shadow-sm"
                    >📧 EmailJS</motion.span>
                  </div>
                </motion.div>
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