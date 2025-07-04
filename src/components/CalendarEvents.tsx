import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingCard } from '@/components/animations/FloatingCard';
import { GlowButton } from '@/components/animations/GlowButton';
import { MorphingIcon } from '@/components/animations/MorphingIcon';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'personal' | 'work' | 'other';
  description?: string;
}

export const CalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  // Mock events data - replace with real Google Calendar API
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Standup',
      time: '09:00',
      duration: '30 min',
      type: 'meeting',
      description: 'Daily sync with the development team'
    },
    {
      id: '2',
      title: 'Project Review',
      time: '11:30',
      duration: '1 hour',
      type: 'work',
      description: 'Review progress on Q1 deliverables'
    },
    {
      id: '3',
      title: 'Lunch with Sarah',
      time: '12:30',
      duration: '1 hour',
      type: 'personal',
      description: 'Catch up at the new café downtown'
    },
    {
      id: '4',
      title: 'Client Presentation',
      time: '15:00',
      duration: '45 min',
      type: 'meeting',
      description: 'Present MVP demo to stakeholders'
    }
  ];

  const connectGoogleCalendar = async () => {
    setLoading(true);
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEvents(mockEvents);
    setConnected(true);
    setLoading(false);
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'work':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'personal':
        return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting':
        return '🤝';
      case 'work':
        return '💼';
      case 'personal':
        return '🌟';
      default:
        return '📅';
    }
  };

  useEffect(() => {
    connectGoogleCalendar();
  }, []);

  if (loading) {
    return (
      <FloatingCard delay={0.2}>
        <div className="p-6">
          <div className="space-y-4">
            <motion.div 
              className="h-6 bg-muted rounded w-48"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i} 
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-muted rounded"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, delay: i * 0.2 }
                  }}
                />
                <div className="flex-1 space-y-2">
                  <motion.div 
                    className="h-4 bg-muted rounded w-3/4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div 
                    className="h-3 bg-muted rounded w-1/2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FloatingCard>
    );
  }

  if (!connected) {
    return (
      <FloatingCard delay={0.2}>
        <div className="p-6 text-center">
          <div className="space-y-4">
            <MorphingIcon 
              icons={['📅', '🗓️', '📋', '⏰']}
              interval={2000}
              className="text-4xl"
            />
            <motion.h3 
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Connect Your Calendar
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              See your daily schedule at a glance
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <GlowButton 
                onClick={connectGoogleCalendar}
                variant="primary"
                loading={loading}
              >
                Connect Google Calendar
              </GlowButton>
            </motion.div>
          </div>
        </div>
      </FloatingCard>
    );
  }

  return (
    <FloatingCard delay={0.2} className="space-y-4">
      <div className="p-6">
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              📅
            </motion.span>
            Today's Schedule
          </h3>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <Badge variant="secondary" className="text-xs">
              {events.length} events
            </Badge>
          </motion.div>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <MorphingIcon 
              icons={['🌅', '🌤️', '☀️', '🌈']}
              interval={2500}
              className="mb-2"
            />
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              No events today - enjoy your free time!
            </motion.p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.1)"
                }}
                className="group"
              >
                <div className="flex gap-4 p-3 rounded-lg hover:bg-background/30 transition-smooth relative overflow-hidden">
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="flex-shrink-0 text-center relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-sm font-semibold text-primary">
                      {event.time}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.duration}
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <motion.span 
                        className="text-lg"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getEventIcon(event.type)}
                      </motion.span>
                      <h4 className="font-medium text-foreground truncate">
                        {event.title}
                      </h4>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getEventTypeColor(event.type)}`}
                        >
                          {event.type}
                        </Badge>
                      </motion.div>
                    </div>
                    {event.description && (
                      <motion.p 
                        className="text-xs text-muted-foreground"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {event.description}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </FloatingCard>
  );
};