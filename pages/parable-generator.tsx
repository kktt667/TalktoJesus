// pages/parable-generator.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Message {
  id: string;
  type: 'user' | 'angel';
  content: string;
  timestamp: Date;
}

interface ParableCard {
  id: string;
  title: string;
  prompt: string;
  icon: string;
  theme: string;
}

const parableCards: ParableCard[] = [
  {
    id: '1',
    title: 'Wisdom & Understanding',
    prompt: "Share a parable about the value of wisdom in today's world",
    icon: '📖',
    theme: 'wisdom'
  },
  {
    id: '2',
    title: 'Faith & Trust',
    prompt: "Tell me a parable about maintaining faith during difficult times",
    icon: '🙏',
    theme: 'faith'
  },
  {
    id: '3',
    title: 'Love & Compassion',
    prompt: "Create a modern parable about showing love to our neighbors",
    icon: '❤️',
    theme: 'love'
  },
  {
    id: '4',
    title: 'Forgiveness',
    prompt: "Share a parable about the power of forgiveness",
    icon: '🕊️',
    theme: 'forgiveness'
  }
];
// pages/parable-generator.tsx
// ... (previous imports and interfaces)

export default function ParableGenerator() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    // Scroll to bottom of messages
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSendMessage = async (prompt: string) => {
      if (!prompt.trim()) return;
  
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: prompt,
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);
  
      // TODO: Replace with your AI endpoint
      try {
        // Simulate API call for now
        setTimeout(() => {
          const angelMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'angel',
            content: "Blessed child, here is a parable for your contemplation...",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, angelMessage]);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };
  
    return (
      <>
        <Head>
          <title>Divine Parables | Jesus Connect</title>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        </Head>
  
        <main className="min-h-screen bg-gradient-to-b from-[#1a0f3c] via-[#2c1810] to-[#462305]">
          {/* Divine Background with Particles */}
          <div className="fixed inset-0 z-0">
            {/* Your existing particles background */}
          </div>
  
          <div className="relative z-10 container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 text-white/80 hover:text-white/100 transition-colors"
              >
                <span>←</span>
                <span className="font-cinzel">Return to Sacred Dashboard</span>
              </button>
            </motion.div>
  
            {/* Parable Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {parableCards.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer
                           hover:bg-white/15 transition-all duration-300"
                  onClick={() => handleSendMessage(card.prompt)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{card.icon}</span>
                    <h3 className="font-cinzel text-lg text-white/90">{card.title}</h3>
                  </div>
                  <p className="font-cormorant text-white/70">{card.prompt}</p>
                </motion.div>
              ))}
            </div>
  
            {/* Chat Container */}
            <div className="max-w-4xl mx-auto">
              {/* Messages */}
              <div className="bg-white/5 backdrop-blur-sm rounded-t-xl p-6 h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mb-4 ${message.type === 'angel' ? 'flex flex-col items-start' : 'flex flex-col items-end'}`}
                    >
                      {message.type === 'angel' ? (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ff8c00] flex items-center justify-center">
                            👼
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-[80%]">
                            <p className="font-cormorant text-white/90 italic">{message.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-[80%]">
                          <p className="font-cormorant text-white/90">{message.content}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ff8c00] flex items-center justify-center">
                        👼
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
  
              {/* Input Area */}
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Seek divine wisdom..."
                  className="w-full bg-white/10 backdrop-blur-sm border-t border-white/10 rounded-b-xl 
                           px-6 py-4 text-white/90 placeholder-white/50
                           focus:outline-none focus:ring-2 focus:ring-[#ffd700]/50
                           font-cormorant text-lg"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                           text-white/70 hover:text-white/90 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-2xl">✨</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }