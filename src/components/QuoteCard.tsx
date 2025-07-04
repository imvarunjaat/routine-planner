import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FloatingCard } from '@/components/animations/FloatingCard';
import { TextReveal } from '@/components/animations/TextReveal';
import { GlowButton } from '@/components/animations/GlowButton';

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
      <FloatingCard delay={0.3}>
        <div className="p-6 bg-gradient-sunrise">
          <div className="space-y-4">
            <motion.div 
              className="h-4 bg-white/20 rounded w-16"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="space-y-2">
              {[1, 0.8, 0.6].map((width, i) => (
                <motion.div 
                  key={i}
                  className="h-4 bg-white/20 rounded"
                  style={{ width: `${width * 100}%` }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
            </div>
            <motion.div 
              className="h-3 bg-white/20 rounded w-32"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </div>
      </FloatingCard>
    );
  }

  if (!quote) return null;

  return (
    <FloatingCard delay={0.3} hoverScale={1.02}>
      <div className="p-6 bg-gradient-sunrise relative overflow-hidden">
        {/* Enhanced decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-16 h-16 opacity-10"
        >
          <div className="w-full h-full rounded-full border-2 border-white"></div>
        </motion.div>

        {/* Floating sparkles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${15 + i * 10}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="relative z-10">
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Badge className="text-xs bg-white/20 text-accent-foreground border-white/30">
              ✨ Daily Inspiration
            </Badge>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshQuote}
                className="text-accent-foreground hover:bg-white/10 h-8 w-8 p-0 rounded-full"
              >
                🔄
              </Button>
            </motion.div>
          </motion.div>

          <motion.blockquote
            key={quote.text}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-accent-foreground mb-4"
          >
            <motion.div 
              className="text-3xl opacity-50 mb-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              "
            </motion.div>
            
            <TextReveal
              text={quote.text}
              className="text-lg font-medium leading-relaxed mb-2 italic"
              delay={0.7}
              speed={0.03}
            />
            
            <motion.div 
              className="text-3xl opacity-50 text-right"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              "
            </motion.div>
          </motion.blockquote>

          <motion.div 
            className="text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <cite className="text-sm font-semibold text-accent-foreground/80">
              — {quote.author}
            </cite>
          </motion.div>
        </div>
      </div>
    </FloatingCard>
  );
};

// Badge component for the quote category
const Badge = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);