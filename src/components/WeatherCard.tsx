import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RiveWeatherIcon } from '@/components/animations/RiveWeatherIcon';
import { FloatingCard } from '@/components/animations/FloatingCard';
import { GlowButton } from '@/components/animations/GlowButton';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);

  // Mock weather data - replace with real API call
  const fetchWeather = async (location: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockWeather: WeatherData = {
      location: location || 'San Francisco',
      temperature: 22,
      condition: 'Partly Cloudy',
      description: 'Perfect morning with gentle clouds',
      humidity: 65,
      windSpeed: 8,
      icon: '⛅'
    };
    
    setWeather(mockWeather);
    setLoading(false);
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // For demo, just use default location
          fetchWeather('Your Location');
        },
        () => {
          setShowLocationInput(true);
        }
      );
    } else {
      setShowLocationInput(true);
    }
  };

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setShowLocationInput(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  if (loading) {
    return (
      <FloatingCard delay={0.1}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <motion.div 
                className="h-4 bg-muted rounded w-32"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="h-8 bg-muted rounded w-20"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="h-3 bg-muted rounded w-40"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <motion.div 
              className="w-16 h-16 bg-muted rounded-full"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity }
              }}
            />
          </div>
        </div>
      </FloatingCard>
    );
  }

  if (showLocationInput) {
    return (
      <FloatingCard delay={0.1}>
        <div className="p-6">
          <form onSubmit={handleCitySubmit} className="space-y-4">
            <motion.h3 
              className="text-lg font-semibold text-foreground flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌍
              </motion.span>
              What's your city?
            </motion.h3>
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="text"
                placeholder="Enter your city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-background/50 border-border focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Button
                type="submit"
                className="bg-gradient-morning hover:shadow-hover transition-all"
              >
                Get Weather
              </Button>
            </motion.div>
          </form>
        </div>
      </FloatingCard>
    );
  }

  if (!weather) return null;

  return (
    <FloatingCard delay={0.1} hoverScale={1.03}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <motion.p 
              className="text-sm text-muted-foreground font-medium flex items-center gap-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📍
              </motion.span>
              {weather.location}
            </motion.p>
            
            <motion.div 
              className="flex items-baseline gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="text-3xl font-bold text-primary">
                {weather.temperature}°
              </span>
              <span className="text-sm text-muted-foreground">C</span>
            </motion.div>
            
            <motion.p 
              className="text-sm font-medium text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {weather.condition}
            </motion.p>
            
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {weather.description}
            </motion.p>
            
            <motion.div 
              className="flex gap-4 text-xs text-muted-foreground pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1"
              >
                💧 {weather.humidity}%
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1"
              >
                💨 {weather.windSpeed} km/h
              </motion.span>
            </motion.div>
          </div>
          
          <RiveWeatherIcon 
            condition={weather.condition} 
            className="ml-4"
          />
        </div>
      </div>
    </FloatingCard>
  );
};