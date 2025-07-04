import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Quote {
  text: string;
  author: string;
  category: string;
}

export const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock quotes - replace with ZenQuotes API
  const mockQuotes: Quote[] = [
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      category: "motivation"
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
      category: "life"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "dreams"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "success"
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
      category: "inspiration"
    }
  ];

  const fetchQuote = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
    setQuote(randomQuote);
    setLoading(false);
  };

  const refreshQuote = () => {
    fetchQuote();
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="animate-pulse"
      >
        <Card className="p-6 bg-gradient-sunrise shadow-card border-0">
          <div className="space-y-4">
            <div className="h-4 bg-white/20 rounded w-16"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-4/5"></div>
              <div className="h-4 bg-white/20 rounded w-3/5"></div>
            </div>
            <div className="h-3 bg-white/20 rounded w-32"></div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="transition-smooth"
    >
      <Card className="p-6 bg-gradient-sunrise shadow-card border-0 relative overflow-hidden">
        {/* Decorative element */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-16 h-16 opacity-10"
        >
          <div className="w-full h-full rounded-full border-2 border-white"></div>
        </motion.div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Badge className="text-xs bg-white/20 text-accent-foreground border-white/30">
              ✨ Daily Inspiration
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshQuote}
              className="text-accent-foreground hover:bg-white/10 h-8 w-8 p-0"
            >
              🔄
            </Button>
          </div>

          <motion.blockquote
            key={quote.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-accent-foreground mb-4"
          >
            <div className="text-3xl opacity-50 mb-2">"</div>
            <p className="text-lg font-medium leading-relaxed mb-2 italic">
              {quote.text}
            </p>
            <div className="text-3xl opacity-50 text-right">"</div>
          </motion.blockquote>

          <div className="text-right">
            <cite className="text-sm font-semibold text-accent-foreground/80">
              — {quote.author}
            </cite>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Badge component for the quote category
const Badge = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);