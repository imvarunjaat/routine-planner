// Weather API integration utilities
// Replace with actual OpenWeatherMap API implementation

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  // TODO: Replace with actual OpenWeatherMap API call
  // const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  // const data = await response.json();
  
  // Mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        location: city,
        temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        description: 'Perfect weather for a productive day',
        humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
        icon: ['☀️', '⛅', '☁️', '🌦️'][Math.floor(Math.random() * 4)]
      });
    }, 1000);
  });
};

export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};