import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  try {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log('EmailJS initialized successfully with key:', publicKey.substring(0, 4) + '...');
    } else {
      console.error('EmailJS public key not found in environment variables');
    }
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
  }
};
