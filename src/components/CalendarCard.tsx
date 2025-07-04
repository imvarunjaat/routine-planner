import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleCalendar, GoogleCalendarEvent, AuthState } from '@/lib/googleCalendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloatingCard } from '@/components/animations/FloatingCard';
import { 
  Calendar, 
  RefreshCw, 
  LogOut, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Video, 
  Users,
  ExternalLink
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const CalendarCard = () => {
  const {
    authState,
    isLoading,
    events,
    error,
    signInWithGoogle,
    signOutFromGoogle,
    refreshEvents
  } = useGoogleCalendar();
  
  const [refreshing, setRefreshing] = useState(false);

  // Handle manual refresh with animation
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshEvents();
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Format time from ISO string
  const formatEventTime = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return format(date, 'h:mm a');
    } catch (e) {
      return '--:--';
    }
  };

  // Calculate event duration in minutes
  const getEventDuration = (start: string, end: string) => {
    try {
      const startDate = parseISO(start);
      const endDate = parseISO(end);
      const diffMinutes = Math.round((endDate.getTime() - startDate.getTime()) / 60000);
      
      if (diffMinutes < 60) {
        return `${diffMinutes} min`;
      } else {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
      }
    } catch (e) {
      return '---';
    }
  };

  // Get appropriate icon for event type
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'meeting':
        return <Users className="h-4 w-4 text-primary" />;
      case 'work':
        return <Clock className="h-4 w-4 text-accent" />;
      case 'personal':
        return <MapPin className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Get color styling based on event type
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'work':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'personal':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  // UI for loading state
  const renderLoading = () => (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className="h-7 w-40 bg-muted rounded"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="h-6 w-6 bg-muted rounded-full"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </div>
      
      {[...Array(3)].map((_, i) => (
        <motion.div 
          key={i} 
          className="flex gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <motion.div className="flex-shrink-0 w-12">
            <motion.div 
              className="h-4 w-10 bg-muted rounded mb-1"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
            <motion.div 
              className="h-3 w-8 bg-muted rounded"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          </motion.div>
          
          <div className="flex-1 space-y-2">
            <motion.div 
              className="h-4 bg-muted rounded w-3/4"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            />
            <motion.div 
              className="h-3 bg-muted rounded w-1/2"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );

  // UI for initial/connect state
  const renderConnect = () => (
    <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-primary/10 p-4 rounded-full"
      >
        <Calendar className="h-8 w-8 text-primary" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold"
      >
        Connect Google Calendar
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted-foreground"
      >
        Sync your daily schedule directly with Google Calendar
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={signInWithGoogle} 
          disabled={authState === 'loading'}
          className="mt-2 flex items-center gap-2"
        >
          {authState === 'loading' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              Connecting...
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4" /> Connect Calendar
            </>
          )}
        </Button>
      </motion.div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-destructive text-sm mt-2"
        >
          <AlertCircle className="h-4 w-4" />
          {error}
        </motion.div>
      )}
    </div>
  );

  // UI for error state
  const renderError = () => (
    <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="bg-destructive/10 p-4 rounded-full"
      >
        <AlertCircle className="h-8 w-8 text-destructive" />
      </motion.div>
      
      <h3 className="text-lg font-semibold">Connection Error</h3>
      <p className="text-sm text-muted-foreground">
        {error || "Failed to connect to Google Calendar"}
      </p>
      
      <Button 
        onClick={signInWithGoogle}
        variant="outline"
        className="mt-2"
      >
        Try Again
      </Button>
    </div>
  );

  // UI for displaying events
  const renderEvents = () => (
    <div className="p-6">
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calendar className="h-5 w-5 text-primary" />
            </motion.div>
            Today's Schedule
          </h3>
          
          <Badge variant="secondary" className="text-xs">
            {events.length} events
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className={`p-1.5 rounded-full hover:bg-primary/10 transition-colors ${refreshing ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh events"
          >
            <motion.div
              animate={refreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="h-4 w-4" />
            </motion.div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            onClick={signOutFromGoogle}
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-5xl mb-4"
          >
            🌤️
          </motion.div>
          <p className="text-muted-foreground">
            No events scheduled today - enjoy your free time!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ 
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  x: 4, 
                  scale: 1.02,
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.1)"
                }}
                className="group"
              >
                <div className="flex gap-3 p-3 rounded-lg hover:bg-background/30 transition-all relative overflow-hidden">
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-accent/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex-shrink-0 text-center relative z-10">
                    <div className="text-sm font-medium text-primary">
                      {formatEventTime(event.start.dateTime)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getEventDuration(event.start.dateTime, event.end.dateTime)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getEventIcon(event.eventType || 'other')}
                      </motion.div>
                      
                      <h4 className="font-medium text-foreground truncate">
                        {event.summary}
                      </h4>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getEventTypeColor(event.eventType || 'other')}`}
                        >
                          {event.eventType || 'other'}
                        </Badge>
                      </motion.div>
                    </div>
                    
                    {event.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {event.description}
                      </p>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  return (
    <FloatingCard delay={0.2} className="overflow-hidden">
      {authState === 'loading' || isLoading && authState !== 'authenticated' ? renderLoading() :
       authState === 'error' ? renderError() :
       authState === 'authenticated' ? renderEvents() :
       renderConnect()}
    </FloatingCard>
  );
};
