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
  description: string;
}

const parableCards: ParableCard[] = [
  {
    id: '1',
    title: 'Divine Wisdom',
    prompt: "Share a parable about finding wisdom in today's digital age",
    icon: '📱',
    theme: 'wisdom',
    description: 'Ancient wisdom for modern times'
  },
  {
    id: '2',
    title: 'Faith Through Trials',
    prompt: "Tell a parable about maintaining faith during life's storms",
    icon: '⚡',
    theme: 'faith',
    description: 'Strength in times of challenge'
  },
  {
    id: '3',
    title: 'Love Thy Neighbor',
    prompt: "Create a parable about showing Christ's love in a divided world",
    icon: '❤️',
    theme: 'love',
    description: 'Unite through divine love'
  },
  {
    id: '4',
    title: 'Sacred Purpose',
    prompt: "Share a parable about discovering God's purpose in our lives",
    icon: '✨',
    theme: 'purpose',
    description: 'Reveal your divine path'
  }
];

// Message Components
const AngelResponse: React.FC<{ message: Message }> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-start space-x-4 mb-6"
  >
    <div className="flex-shrink-0">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-12 h-12 rounded-full overflow-hidden shadow-lg"
      >
        <img 
          src="public/images/angel.png" 
          alt="Angel" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
    <div className="flex-grow">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 
                   border border-white/20 shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/5 to-transparent rounded-2xl" />
        <p className="relative font-cormorant text-lg text-white/90 italic">
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
    transition={{ duration: 0.3 }}
    className="flex justify-end mb-6"
  >
    <div className="max-w-[80%]">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
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
    const [showDivineFlash, setShowDivineFlash] = useState(false);
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
      setShowDivineFlash(true);
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: prompt,
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);
  
      setTimeout(() => {
        setShowDivineFlash(false);
      }, 1000);
  
      try {
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
  
        <main className="min-h-screen overflow-hidden">
          {/* Background Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: "url('/background.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
          />
  
          {/* Content Overlay */}
          <div className="relative z-10 min-h-screen bg-gradient-to-b from-black/30 via-transparent to-black/30">
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
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
                    transition={{ duration: 0.5 }}
                    className="font-cinzel text-2xl text-white/90 text-center"
                  >
                    Choose Your Sacred Path
                  </motion.h1>
                )}
              </motion.div>
  
              {/* Divine Flash Effect */}
              <AnimatePresence>
                {showDivineFlash && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 1],
                        rotate: [0, 360, 360]
                      }}
                      transition={{ 
                        duration: 1.5,
                        times: [0, 0.5, 1],
                        ease: "easeOut"
                      }}
                      className="relative"
                    >
                      <img
                        src="/angel.png"
                        alt="Divine Angel"
                        className="w-32 h-32 object-contain"
                      />
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(255, 215, 0, 0)",
                            "0 0 50px rgba(255, 215, 0, 0.5)",
                            "0 0 20px rgba(255, 215, 0, 0)"
                          ]
                        }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="absolute inset-0"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
  
              {/* Content Area */}
              <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                  {showCards ? (
                    // Tarot Cards Grid
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {parableCards.map((card, index) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            rotateY: 15,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="relative group cursor-pointer"
                          onClick={() => handleSendMessage(card.prompt)}
                        >
                          <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden
                                      transform-gpu bg-gradient-to-br from-[#2a1810] to-[#462305]
                                      border-2 border-[#ffd700]/30">
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="relative h-full p-6 flex flex-col items-center justify-between">
                              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16">
                                <motion.img 
                                  src="public/images/dove.png" 
                                  alt="Dove"
                                  className="w-full h-auto"
                                  initial={{ opacity: 0.5 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
  
                              <div className="text-center mt-16">
                                <motion.span 
                                  className="text-4xl mb-4 block"
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  {card.icon}
                                </motion.span>
                                <h3 className="font-cinzel text-xl text-[#ffd700] mb-2">
                                  {card.title}
                                </h3>
                                <p className="font-cormorant text-white/70">
                                  {card.description}
                                </p>
                              </div>
  
                              <div className="absolute inset-4 border border-[#ffd700]/20 rounded-lg" />
                              
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-t from-[#ffd700]/20 to-transparent"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    // Chat Interface
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
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
                            className="flex items-center space-x-4"
                          >
                            <motion.img 
                              src="/angel.png" 
                              alt="Angel"
                              className="w-12 h-12 object-contain"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <div className="flex space-x-2">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                  }}
                                  transition={{ 
                                    duration: 1, 
                                    repeat: Infinity, 
                                    delay: i * 0.2 
                                  }}
                                  className="w-3 h-3 rounded-full bg-[#ffd700]/50"
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
  
                      {/* Sacred Scroll Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <div className="relative bg-[#f4e4bc]/90 rounded-xl overflow-hidden">
                          <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                              }
                            }}
                            placeholder="Write your question on this sacred scroll..."
                            className="w-full min-h-[100px] px-8 py-6
                                     bg-transparent resize-none
                                     font-cormorant text-lg text-[#2a1810]
                                     placeholder-[#2a1810]/50 focus:outline-none"
                            style={{
                              backgroundImage: "url('/scroll-texture.png')",
                              backgroundSize: 'cover',
                              backgroundBlendMode: 'multiply'
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={isLoading}
                            className="absolute right-4 bottom-4
                                     w-10 h-10 rounded-full
                                     bg-gradient-to-r from-[#ffd700] to-[#b8860b]
                                     flex items-center justify-center
                                     shadow-lg disabled:opacity-50"
                          >
                            <span className="text-white text-xl">✨</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }