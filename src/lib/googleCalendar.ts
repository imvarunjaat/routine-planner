/**
 * Google Calendar Integration Library
 * Handles authentication, fetching events, and Google API interactions
 */
import { useState, useEffect, useCallback } from 'react';

// Event interface matching Google Calendar API response structure
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  // Custom field to categorize events
  eventType?: 'meeting' | 'personal' | 'work' | 'other';
}

// Authentication state type
export type AuthState = 'initial' | 'loading' | 'authenticated' | 'error';

// Main hook for Google Calendar functionality
export function useGoogleCalendar() {
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [authState, setAuthState] = useState<AuthState>('initial');
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // API Configuration
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
  
  // Load the Google API client
  const loadGapiClient = useCallback(async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        // @ts-ignore - gapi is loaded from external script
        gapi.load('client:auth2', {
          callback: resolve,
          onerror: reject,
        });
      });
      
      // Initialize the gapi client
      // @ts-ignore - gapi is loaded from external script
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: SCOPES,
      });
      
      setIsGapiLoaded(true);
      
      // Check if already signed in
      // @ts-ignore - gapi is loaded from external script
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        setAuthState('authenticated');
        fetchTodaysEvents();
      }
    } catch (err) {
      console.error('Error loading GAPI client:', err);
      setError('Failed to load Google API client');
      setAuthState('error');
    }
  }, []);
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    if (!isGapiLoaded) return;
    
    setAuthState('loading');
    try {
      // @ts-ignore - gapi is loaded from external script
      await gapi.auth2.getAuthInstance().signIn();
      setAuthState('authenticated');
      await fetchTodaysEvents();
    } catch (err) {
      console.error('Error signing in:', err);
      setError('Failed to sign in with Google');
      setAuthState('error');
    }
  };
  
  // Sign out from Google
  const signOutFromGoogle = async () => {
    if (!isGapiLoaded) return;
    
    try {
      // @ts-ignore - gapi is loaded from external script
      await gapi.auth2.getAuthInstance().signOut();
      setAuthState('initial');
      setEvents([]);
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  };
  
  // Parse event types from event details
  const parseEventType = (event: any): 'meeting' | 'personal' | 'work' | 'other' => {
    const summary = event.summary?.toLowerCase() || '';
    const description = event.description?.toLowerCase() || '';
    
    if (
      summary.includes('meeting') || 
      summary.includes('call') || 
      summary.includes('interview') ||
      description.includes('meeting')
    ) {
      return 'meeting';
    } else if (
      summary.includes('work') || 
      summary.includes('project') || 
      summary.includes('deadline')
    ) {
      return 'work';
    } else if (
      summary.includes('personal') || 
      summary.includes('family') || 
      summary.includes('doctor') ||
      summary.includes('lunch') ||
      summary.includes('break')
    ) {
      return 'personal';
    }
    
    return 'other';
  };
  
  // Fetch today's events from Google Calendar
  const fetchTodaysEvents = async () => {
    if (!isGapiLoaded) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the start and end of today
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
      
      // @ts-ignore - gapi is loaded from external script
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: startOfDay,
        timeMax: endOfDay,
        singleEvents: true,
        orderBy: 'startTime',
      });
      
      // Process and enrich event data
      const calendarEvents: GoogleCalendarEvent[] = response.result.items.map((event: any) => ({
        ...event,
        eventType: parseEventType(event),
      }));
      
      setEvents(calendarEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch calendar events');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load GAPI script on mount
  useEffect(() => {
    // Create script element for Google API
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => loadGapiClient();
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, [loadGapiClient]);
  
  // Set up auto-refresh interval (every 60 seconds)
  useEffect(() => {
    if (authState !== 'authenticated') return;
    
    const intervalId = setInterval(() => {
      fetchTodaysEvents();
    }, 60 * 1000); // 60 seconds
    
    return () => clearInterval(intervalId);
  }, [authState]);
  
  return {
    authState,
    isLoading,
    events,
    error,
    signInWithGoogle,
    signOutFromGoogle,
    refreshEvents: fetchTodaysEvents,
  };
}
