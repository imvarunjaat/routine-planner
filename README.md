# 🌅 Routine planner Assistant

A beautiful, modern web application that gives users a personalized daily summary to start their day right. Built for the July 2025 hackathon with React, Tailwind CSS, and Framer Motion.

![Daily Routine Assistant](src/assets/morning-hero.jpg)

## ✨ Features

- **🌤️ Weather Summary**: Current weather conditions with beautiful icons
- **📅 Calendar Events**: Today's schedule from Google Calendar
- **💬 Daily Inspiration**: Motivational quotes to start your day
- **📧 Email Summary**: Send your daily prep summary to your inbox
- **🎨 Beautiful Design**: Soft pastel theme with morning vibes
- **📱 Fully Responsive**: Works perfectly on all devices
- **⚡ Smooth Animations**: Delightful Framer Motion animations

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone <YOUR_GIT_URL>
   cd daily-prep-assistant
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:8080`

## 🔧 API Integration Setup

The app is built with mock data but ready for real API integration. To connect real services:

### Weather (OpenWeatherMap)
1. Get API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Update `src/lib/weather.ts` with your API key
3. Uncomment the real API implementation

### Google Calendar
1. Set up Google Cloud Console project
2. Enable Calendar API
3. Get OAuth 2.0 credentials
4. Update `src/lib/calendar.ts` with your credentials

### Email (EmailJS)
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Set up email service and template
3. Update `src/lib/email.ts` with your service details

### Quotes (ZenQuotes)
1. The ZenQuotes API is free and requires no API key
2. Update `src/lib/quotes.ts` to use real API endpoints

## 🎨 Design System

The app uses a beautiful morning-vibes design system with:
- **Colors**: Soft pastels, morning blues, sunrise oranges
- **Typography**: Inter font family for clean readability
- **Animations**: Smooth Framer Motion transitions
- **Gradients**: Beautiful gradient backgrounds and cards
- **Shadows**: Elegant soft shadows throughout

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── WeatherCard.tsx  # Weather display
│   ├── CalendarEvents.tsx # Calendar integration
│   ├── QuoteCard.tsx    # Daily quotes
│   ├── EmailSummary.tsx # Email functionality
│   └── GreetingHeader.tsx # Personalized greeting
├── lib/                 # API integration utilities
│   ├── weather.ts       # Weather API
│   ├── calendar.ts      # Google Calendar API
│   ├── email.ts         # EmailJS integration
│   └── quotes.ts        # ZenQuotes API
├── assets/              # Images and static files
└── pages/               # App pages
    └── Index.tsx        # Main application page
```

## 🏆 Hackathon Ready

This project is specifically designed for hackathon success:
- ✅ **Clean, professional UI/UX**
- ✅ **Real-world problem solving**
- ✅ **Modern tech stack**
- ✅ **Responsive design**
- ✅ **API integration ready**
- ✅ **Smooth animations**
- ✅ **Production-ready code**

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Shadcn/ui** - Beautiful UI components
- **Vite** - Fast development build tool

## 📱 Responsive Design

The app works beautifully on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1400px+)

## 🎯 Future Enhancements

- [ ] Push notifications for upcoming events
- [ ] Multiple calendar providers support
- [ ] Weather alerts and recommendations
- [ ] Custom themes and personalization
- [ ] Voice commands integration
- [ ] Social sharing features

## 💡 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ 
