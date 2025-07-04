import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingCard } from '@/components/animations/FloatingCard';
import { GlowButton } from '@/components/animations/GlowButton';
import { MorphingIcon } from '@/components/animations/MorphingIcon';
import { Calendar, Plus, X, Clock, AlertCircle, CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    time: '',
    duration: '',
    type: 'other',
    description: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);

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
    setIsConnecting(true);
    // Simulate OAuth flow with Google Calendar API
    // In a real app, this would redirect to Google OAuth consent screen
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEvents(mockEvents);
      setConnected(true);
      
      // Show success toast or notification here
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      // Show error toast or notification here
    } finally {
      setLoading(false);
      setIsConnecting(false);
    }
  };
  
  const disconnectGoogleCalendar = () => {
    // In a real app, revoke access tokens
    setConnected(false);
    setEvents([]);
  };
  
  const addNewEvent = () => {
    if (!newEvent.title || !newEvent.time) return;
    
    const eventToAdd: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title || '',
      time: newEvent.time || '',
      duration: newEvent.duration || '30 min',
      type: (newEvent.type as CalendarEvent['type']) || 'other',
      description: newEvent.description
    };
    
    setEvents(prev => [...prev, eventToAdd]);
    setIsAddEventOpen(false);
    setNewEvent({
      title: '',
      time: '',
      duration: '',
      type: 'other',
      description: ''
    });
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
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <motion.div
                className="relative"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Calendar className="h-5 w-5 text-primary" />
                {connected && (
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              Today's Schedule
            </h3>
            
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <motion.button
                  className="ml-2 flex items-center justify-center rounded-full p-1.5 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  aria-label="Add new event"
                >
                  <Plus className="h-3 w-3" />
                </motion.button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add New Event
                  </DialogTitle>
                  <DialogDescription>
                    Add details for your new schedule event.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="event-title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="col-span-3"
                      placeholder="Meeting with team"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-time" className="text-right">
                      Time
                    </Label>
                    <Input
                      id="event-time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      className="col-span-3"
                      placeholder="10:00"
                      type="time"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-duration" className="text-right">
                      Duration
                    </Label>
                    <Select 
                      value={newEvent.duration} 
                      onValueChange={(value) => setNewEvent({...newEvent, duration: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15 min">15 minutes</SelectItem>
                        <SelectItem value="30 min">30 minutes</SelectItem>
                        <SelectItem value="45 min">45 minutes</SelectItem>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                        <SelectItem value="2 hours">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      value={newEvent.type as string} 
                      onValueChange={(value) => setNewEvent({...newEvent, type: value as CalendarEvent['type']})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-description" className="text-right align-top pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="event-description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      className="col-span-3"
                      placeholder="Brief description of the event"
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={addNewEvent} 
                    disabled={!newEvent.title || !newEvent.time}
                  >
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Badge variant="secondary" className="text-xs">
                {events.length} events
              </Badge>
            </motion.div>
            
            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  className="flex items-center justify-center rounded-full p-1.5 bg-background hover:bg-muted text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  aria-label="Calendar settings"
                >
                  <motion.div
                    animate={connected ? { rotate: [0, 360] } : { rotate: 0 }}
                    transition={{ duration: 2, repeat: connected ? Infinity : 0, repeatDelay: 5 }}
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Calendar Connection</DialogTitle>
                  <DialogDescription>
                    Connect your Google Calendar to sync events automatically.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-6 space-y-4">
                  {connected ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-green-500">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </motion.div>
                        Connected to Google Calendar
                      </div>
                      
                      <p className="text-center text-sm text-muted-foreground">
                        Your calendar is syncing automatically. Any changes you make will be reflected in both places.
                      </p>
                      
                      <Button
                        variant="outline"
                        className="gap-2 mt-2"
                        onClick={disconnectGoogleCalendar}
                      >
                        <X className="h-4 w-4" /> Disconnect Calendar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-3 rounded-full bg-muted">
                        <Calendar className="h-6 w-6" />
                      </div>
                      
                      <h4 className="text-center font-medium">Connect with Google Calendar</h4>
                      
                      <p className="text-center text-sm text-muted-foreground">
                        Sync your events with Google Calendar to keep everything up to date automatically.
                      </p>
                      
                      <Button
                        className="gap-2 mt-2 w-full"
                        onClick={connectGoogleCalendar}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Clock className="h-4 w-4" />
                            </motion.div>
                            Connecting...
                          </>
                        ) : (
                          <>
                            <CalendarIcon className="h-4 w-4" /> Connect Google Calendar
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
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