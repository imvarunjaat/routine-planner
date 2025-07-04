import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-48"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-12 h-12 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gradient-card shadow-card border-0 text-center">
          <div className="space-y-4">
            <div className="text-4xl">📅</div>
            <h3 className="text-lg font-semibold text-foreground">
              Connect Your Calendar
            </h3>
            <p className="text-sm text-muted-foreground">
              See your daily schedule at a glance
            </p>
            <Button 
              onClick={connectGoogleCalendar}
              className="bg-gradient-morning hover:shadow-hover transition-all"
            >
              Connect Google Calendar
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <Card className="p-6 bg-gradient-card shadow-card border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            📅 Today's Schedule
          </h3>
          <Badge variant="secondary" className="text-xs">
            {events.length} events
          </Badge>
        </div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-4xl mb-2">🌅</div>
            <p className="text-muted-foreground">No events today - enjoy your free time!</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="group"
              >
                <div className="flex gap-4 p-3 rounded-lg hover:bg-background/30 transition-smooth">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-sm font-semibold text-primary">
                      {event.time}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getEventIcon(event.type)}</span>
                      <h4 className="font-medium text-foreground truncate">
                        {event.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getEventTypeColor(event.type)}`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
};