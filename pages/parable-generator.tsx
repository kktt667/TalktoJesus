// pages/parable-generator.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import { Particles } from "../components/particles";
import { ParableCard } from '../components/ParableCard';
import { ScrollInput } from '../components/ScrollInput';

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
  description: string;
}

const parableCards: ParableCard[] = [
  {
    id: '1',
    title: 'Modern Wisdom',
    prompt: "Share a parable about finding wisdom in today's digital age",
    icon: '📱',
    theme: 'wisdom',
    description: 'Discover divine guidance for modern challenges'
  },
  {
    id: '2',
    title: 'Faith Through Trials',
    prompt: "Tell a parable about maintaining faith during life's storms",
    icon: '⚡',
    theme: 'faith',
    description: 'Find strength in times of difficulty'
  },
  {
    id: '3',
    title: 'Love Thy Neighbor',
    prompt: "Create a parable about showing Christ's love in a divided world",
    icon: '❤️',
    theme: 'love',
    description: 'Learn to love as Jesus loved'
  },
  {
    id: '4',
    title: 'Divine Purpose',
    prompt: "Share a parable about discovering God's purpose in our lives",
    icon: '🌟',
    theme: 'purpose',
    description: 'Understand your sacred journey'
  }
];

const AngelResponse: React.FC<{ message: Message }> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start space-x-4 mb-6"
  >
    <div className="flex-shrink-0">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ff8c00] 
                   flex items-center justify-center shadow-lg"
      >
        <span className="text-2xl">👼</span>
      </motion.div>
    </div>
    <div className="flex-grow">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 
                   border border-white/20 shadow-xl"
      >
        <p className="font-cormorant text-lg text-white/90 italic">
          {message.content}
        </p>
        <div className="mt-2 flex justify-end">
          <span className="text-white/50 text-sm font-cinzel">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const UserMessage: React.FC<{ message: Message }> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end mb-6"
  >
    <div className="max-w-[80%]">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/20 backdrop-blur-md rounded-2xl p-6 
                   border border-white/30 shadow-xl"
      >
        <p className="font-cormorant text-lg text-white/90">
          {message.content}
        </p>
        <div className="mt-2 flex justify-end">
          <span className="text-white/50 text-sm font-cinzel">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </motion.div>
    </div>
  </motion.div>
);
export default function ParableGenerator() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCards, setShowCards] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSendMessage = async (prompt: string) => {
      if (!prompt.trim()) return;
      
      setShowCards(false);
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
        // Simulate API call
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
  
        <main className="min-h-screen bg-gradient-to-b from-[#1a0f3c] via-[#2c1810] to-[#462305] overflow-hidden">
          {/* Divine Background */}
          <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 70], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <Particles />
            </Canvas>
          </div>
  
          <div className="relative z-10 container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-3 text-white/80 hover:text-white/100 
                         transition-colors px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm
                         border border-white/10"
              >
                <span>←</span>
                <span className="font-cinzel">Return to Sacred Dashboard</span>
              </motion.button>
              
              {showCards && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-cinzel text-2xl text-white/90 text-center"
                >
                  Choose Your Parable Theme
                </motion.h1>
              )}
            </motion.div>
  
            {/* Content Area */}
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {showCards ? (
                  // Parable Cards Grid
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {parableCards.map((card) => (
                      <ParableCard
                        key={card.id}
                        card={card}
                        onClick={() => handleSendMessage(card.prompt)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  // Chat Interface
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                  >
                    {/* Messages Container */}
                    <div className="mb-6 min-h-[400px] max-h-[600px] overflow-y-auto 
                                 rounded-2xl bg-black/20 backdrop-blur-md p-6">
                      {messages.map((message) => (
                        message.type === 'angel' ? 
                          <AngelResponse key={message.id} message={message} /> :
                          <UserMessage key={message.id} message={message} />
                      ))}
                      
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-2 mb-6"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ff8c00] 
                                      flex items-center justify-center">
                            <span className="text-2xl">👼</span>
                          </div>
                          <div className="flex space-x-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="w-3 h-3 rounded-full bg-white/50"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                              className="w-3 h-3 rounded-full bg-white/50"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                              className="w-3 h-3 rounded-full bg-white/50"
                            />
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
  
                    {/* Scroll Input */}
                    <ScrollInput
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onSend={() => handleSendMessage(inputValue)}
                      disabled={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </>
    );
}