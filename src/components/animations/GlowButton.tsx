import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  loading?: boolean;
}

export const GlowButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  loading = false
}: GlowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-morning hover:shadow-hover border-primary/20';
      case 'secondary':
        return 'bg-gradient-card hover:shadow-card border-secondary/20';
      case 'accent':
        return 'bg-gradient-sunrise hover:shadow-soft border-accent/20';
      default:
        return 'bg-gradient-morning hover:shadow-hover border-primary/20';
    }
  };

  return (
    <motion.div
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-50 blur-lg"
          style={{
            background: variant === 'primary' 
              ? 'hsl(var(--primary) / 0.4)' 
              : variant === 'accent' 
              ? 'hsl(var(--accent) / 0.4)'
              : 'hsl(var(--secondary) / 0.4)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Button */}
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          relative z-10 border transition-all duration-300
          ${getVariantStyles()}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Button content with animation */}
        <motion.span
          animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
          className="flex items-center gap-2"
        >
          {children}
        </motion.span>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={isHovered ? { 
            opacity: [0, 1, 0],
            x: ['-100%', '100%']
          } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </Button>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={false}
        animate={isHovered ? {
          boxShadow: [
            '0 0 0 0 hsl(var(--primary) / 0.4)',
            '0 0 0 10px hsl(var(--primary) / 0)',
          ]
        } : {}}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};