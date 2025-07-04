import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';

// Using Record<string, unknown> to match EmailJS's expected parameter type
type EmailParams = Record<string, unknown>;

export const useEmail = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const sendEmail = async (email: string, content: string) => {
    // Reset previous error
    setError(null);
    
    // Validate email
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);
    
    try {
      // Get environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Debug log the configuration (safely, without exposing full keys)
      console.log('Email configuration:', {
        serviceId: serviceId ? `${serviceId.substring(0, 5)}...` : 'missing',
        templateId: templateId ? `${templateId.substring(0, 5)}...` : 'missing',
        publicKey: publicKey ? `${publicKey.substring(0, 4)}...` : 'missing',
      });
      
      // Check if EmailJS is properly configured
      if (!serviceId || !templateId || !publicKey) {
        const errorMsg = 'EmailJS not properly configured. Missing environment variables.';
        console.error(errorMsg);
        setError(errorMsg);
        toast({
          title: "Email service not configured",
          description: "Please check your environment variables",
          variant: "destructive"
        });
        return false;
      }
      
      // Prepare the template parameters
      const templateParams = {
        to_email: email,
        summary_content: content,
        from_name: 'Daily Prep Assistant',
        subject: `Your Daily Prep Summary for ${new Date().toLocaleDateString()}`
      };
      
      console.log('Attempting to send email to:', email);
      
      // Re-initialize EmailJS right before sending (to ensure it's properly initialized)
      emailjs.init(publicKey);
      
      // Send the email using EmailJS with full parameters including public key
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('Email sent successfully:', response);
      
      setSent(true);
      toast({
        title: "Summary sent! 📧",
        description: `Your daily prep summary has been sent to ${email}`,
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSent(false);
      }, 3000);
      
      return true;
    } catch (error: any) {
      // Capture detailed error information
      const errorMessage = error?.message || 'Unknown error occurred';
      console.error('Error sending email:', error);
      setError(errorMessage);
      
      toast({
        title: "Failed to send",
        description: `Error: ${errorMessage.substring(0, 100)}`,
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendEmail,
    loading,
    sent,
    setSent
  };
};
