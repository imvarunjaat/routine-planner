// ZenQuotes API integration utilities
// Replace with actual ZenQuotes API implementation

export interface Quote {
  text: string;
  author: string;
  category: string;
}

export const fetchDailyQuote = async (): Promise<Quote> => {
  // TODO: Replace with actual ZenQuotes API call
  // const response = await fetch('https://zenquotes.io/api/today');
  // const data = await response.json();
  // return {
  //   text: data[0].q,
  //   author: data[0].a,
  //   category: 'daily'
  // };
  
  // Mock quotes for now
  const quotes: Quote[] = [
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
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "work"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      category: "innovation"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
      category: "belief"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
      category: "journey"
    },
    {
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      author: "Ralph Waldo Emerson",
      category: "inner strength"
    }
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      resolve(randomQuote);
    }, 800);
  });
};

export const fetchRandomQuote = async (): Promise<Quote> => {
  return fetchDailyQuote(); // For now, same as daily quote
};