import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="animate-pulse"
      >
        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-32"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
              <div className="h-3 bg-muted rounded w-40"></div>
            </div>
            <div className="w-16 h-16 bg-muted rounded-full"></div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (showLocationInput) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <form onSubmit={handleCitySubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              What's your city? 🌍
            </h3>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-background/50 border-border"
              />
              <Button type="submit" className="bg-gradient-morning hover:shadow-hover transition-all">
                Get Weather
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ y: -5 }}
      className="transition-smooth"
    >
      <Card className="p-6 bg-gradient-card shadow-card border-0 hover:shadow-hover transition-smooth">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              📍 {weather.location}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary">
                {weather.temperature}°
              </span>
              <span className="text-sm text-muted-foreground">C</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {weather.condition}
            </p>
            <p className="text-xs text-muted-foreground">
              {weather.description}
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground pt-2">
              <span>💧 {weather.humidity}%</span>
              <span>💨 {weather.windSpeed} km/h</span>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="text-5xl animate-float"
          >
            {weather.icon}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};