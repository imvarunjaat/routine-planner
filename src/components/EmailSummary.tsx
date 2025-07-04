import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface SummaryData {
  weather: {
    location: string;
    temperature: number;
    condition: string;
  };
  events: Array<{
    title: string;
    time: string;
  }>;
  quote: {
    text: string;
    author: string;
  };
}

interface EmailSummaryProps {
  data: SummaryData;
}

export const EmailSummary = ({ data }: EmailSummaryProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const formatSummary = () => {
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
🌅 Daily Prep Summary for ${date}

🌤️ WEATHER
${data.weather.location}: ${data.weather.temperature}°C, ${data.weather.condition}

📅 TODAY'S SCHEDULE
${data.events.length === 0 
  ? '• No events scheduled - enjoy your free day!' 
  : data.events.map(event => `• ${event.time} - ${event.title}`).join('\n')
}

✨ DAILY INSPIRATION
"${data.quote.text}"
— ${data.quote.author}

Have a wonderful day! 🌟

---
Sent with ❤️ from Daily Prep Assistant
    `.trim();
  };

  const sendEmail = async () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Mock email sending - replace with EmailJS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSent(true);
      toast({
        title: "Summary sent! 📧",
        description: `Your daily prep summary has been sent to ${email}`,
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSent(false);
        setEmail('');
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-morning shadow-card border-0 text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            📧
          </motion.div>
          <h3 className="text-lg font-semibold text-primary-foreground mb-2">
            Summary Sent Successfully!
          </h3>
          <p className="text-sm text-primary-foreground/80">
            Check your inbox for your daily prep summary
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-6 bg-gradient-morning shadow-card border-0">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary-foreground mb-2 flex items-center justify-center gap-2">
              📧 Email Your Summary
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Get your daily prep summary delivered to your inbox
            </p>
          </div>

          {/* Preview of what will be sent */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <h4 className="text-sm font-semibold text-primary-foreground mb-2 flex items-center gap-2">
              📋 Preview
            </h4>
            <div className="text-xs text-primary-foreground/70 space-y-1">
              <div>🌤️ Weather: {data.weather.location}, {data.weather.temperature}°C</div>
              <div>📅 Events: {data.events.length} scheduled</div>
              <div>✨ Inspirational quote included</div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
              disabled={loading}
            />
            
            <Button
              onClick={sendEmail}
              disabled={loading || !email.trim()}
              className="w-full bg-white/20 hover:bg-white/30 text-primary-foreground border border-white/20 disabled:opacity-50 transition-smooth"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                />
              ) : (
                '✨'
              )}
              {loading ? 'Sending...' : 'Send My Daily Summary'}
            </Button>
          </div>

          <div className="text-xs text-primary-foreground/60 text-center">
            We'll never spam you or share your email address
          </div>
        </div>
      </Card>
    </motion.div>
  );
};