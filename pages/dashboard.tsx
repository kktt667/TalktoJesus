import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface NavigationItem {
  id: string;
  title: string;
  route: string;
  icon: string;
  description: string;
  verse: {
    text: string;
    reference: string;
  };
}

const navigationItems: NavigationItem[] = [
  {
    id: "prayer",
    title: "Divine Prayer",
    route: "/prayer-generator",
    icon: "🙏",
    description: "Receive Sacred Guidance",
    verse: {
      text: "Ask and it will be given to you",
      reference: "Matthew 7:7"
    }
  },
  {
    id: "parable",
    title: "Sacred Parables",
    route: "/parable-generator",
    icon: "📖",
    description: "Discover Timeless Wisdom",
    verse: {
      text: "Your word is a lamp for my feet",
      reference: "Psalm 119:105"
    }
  },
  {
    id: "wwjd",
    title: "What Would Jesus Do?",
    route: "/wwjd-generator",
    icon: "✝️",
    description: "Walk in Divine Light",
    verse: {
      text: "I am the way, the truth, and the life",
      reference: "John 14:6"
    }
  },
  {
    id: "kindness",
    title: "Acts of Kindness",
    route: "/kindness-generator",
    icon: "🕊️",
    description: "Share His Boundless Love",
    verse: {
      text: "Let us love one another",
      reference: "1 John 4:7"
    }
  }
];

const NavigationButton: React.FC<{
  item: NavigationItem;
  onClick: () => void;
}> = ({ item, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative w-[280px] h-[400px] group"
  >
    <div className="absolute inset-0">
      <Image
        src={`/images/cards/${item.id}.png`}
        layout="fill"
        objectFit="contain"
        alt={item.title}
        className="transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  </motion.button>
);

export default function DashboardPage(): JSX.Element | null {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (ready && !authenticated) {
      void router.push("/");
    }
  }, [ready, authenticated, router]);

  const handleChatOpen = (id: string) => {
    setSelectedChat(id);
    if (!messages[id]) {
      setMessages(prev => ({
        ...prev,
        [id]: []
      }));
    }
  };

  const handleChatClose = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = async (chatId: string) => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));
    setInputMessage("");

    // TODO: Add API call here
  };

  const ChatInterface = ({ chatId }: { chatId: string }) => {
    const item = navigationItems.find(i => i.id === chatId);
    if (!item) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-30 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={handleChatClose} />

        {/* Chat Window */}
        <motion.div 
          className="relative w-full max-w-4xl h-[80vh] bg-[#0a0a1a]/90 rounded-lg border border-gold/30
                     shadow-[0_0_50px_rgba(218,165,32,0.15)] backdrop-blur-lg
                     flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gold/30 bg-black/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-cinzel text-gold text-xl tracking-wider">{item.title}</h3>
                  <p className="font-cormorant text-white/70 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 bg-gold/50 rounded-full animate-pulse" />
                <button 
                  onClick={handleChatClose}
                  className="text-white/60 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <p className="font-cinzel text-gold/70 text-xs mx-4 italic">"{item.verse.text}"</p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages[chatId]?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${
                  msg.role === 'user' 
                    ? 'bg-gold/10 border-gold/30' 
                    : 'bg-white/5 border-white/20'
                } border rounded-lg p-4 backdrop-blur-sm`}>
                  <p className="font-cormorant text-white/90">{msg.content}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-white/40">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-gold/50 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-gold/50 rounded-full animate-pulse delay-100" />
                        <div className="w-1 h-1 bg-gold/50 rounded-full animate-pulse delay-200" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-6 bg-black/40 border-t border-gold/30">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(chatId)}
                  placeholder={`Ask for ${item.description.toLowerCase()}...`}
                  className="w-full bg-black/40 border border-gold/30 rounded-lg px-4 py-3
                            text-white placeholder-white/30 focus:outline-none focus:border-gold/50
                            transition-colors duration-200"
                />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>
              <button
                onClick={() => handleSendMessage(chatId)}
                className="bg-gold/20 hover:bg-gold/30 text-white rounded-lg px-6
                          transition-colors duration-200 border border-gold/30
                          flex items-center justify-center group"
              >
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (!ready || !authenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Jesus Connect | Divine Dashboard</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
        {/* Background Image */}
        <div className="fixed inset-0">
          <Image
            src="/images/background.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Background"
            className="opacity-40"
          />
        </div>

        {/* Light Rays */}
        <div className="fixed inset-0 z-[1]">
          {/* Central Glow */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(218,165,32,0.2) 0%, transparent 70%)'
            }}
          />
          
          {/* Rotating Rays */}
          <div className="absolute inset-0 origin-center animate-spin-very-slow">
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  conic-gradient(
                    from 0deg at 50% 50%,
                    transparent 0deg,
                    rgba(218,165,32,0.15) 1deg,
                    transparent 4deg,
                    rgba(218,165,32,0.15) 5deg,
                    transparent 8deg,
                    rgba(218,165,32,0.15) 9deg,
                    transparent 12deg,
                    rgba(218,165,32,0.15) 13deg,
                    transparent 16deg,
                    rgba(218,165,32,0.15) 17deg,
                    transparent 20deg,
                    rgba(218,165,32,0.15) 21deg,
                    transparent 24deg
                  )
                  repeating-conic-gradient(
                    from 0deg at 50% 50%,
                    transparent 0deg,
                    rgba(218,165,32,0.1) 20deg,
                    transparent 40deg
                  )
                `
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => void logout()}
              className="px-6 py-2 bg-black/40 rounded-full
                       text-white font-cinzel hover:text-gold
                       transition-all duration-300 border border-gold/30
                       hover:border-gold/50 hover:shadow-[0_0_15px_rgba(218,165,32,0.2)]"
            >
              Depart in Peace
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="flex justify-center items-center gap-16 mt-16">
            {/* Left Cards */}
            <div className="flex flex-col gap-8">
              {navigationItems.slice(0, 2).map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  onClick={() => handleChatOpen(item.id)}
                />
              ))}
            </div>

            {/* Central Cross */}
            <div className="flex justify-center z-20">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-[400px] h-[400px]"
              >
                <div 
                  className="absolute inset-0 animate-pulse-opacity"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(218,165,32,0.5) 0%, rgba(218,165,32,0.3) 30%, rgba(218,165,32,0.1) 60%, transparent 80%)',
                  }}
                />
                <Image
                  src="/images/cross.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Sacred Cross"
                  className="filter drop-shadow-[0_0_60px_rgba(218,165,32,0.7)]"
                />
              </motion.div>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-8">
              {navigationItems.slice(2, 4).map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  onClick={() => handleChatOpen(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <AnimatePresence>
          {selectedChat && <ChatInterface chatId={selectedChat} />}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        @keyframes spin-very-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-opacity {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 120s linear infinite;
        }

        .animate-pulse-opacity {
          animation: pulse-opacity 12s ease-in-out infinite;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #0a0a0f;
        }

        .font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        :root {
          --color-gold: #DAA520;
        }

        .text-gold {
          color: var(--color-gold);
        }

        .border-gold {
          border-color: var(--color-gold);
        }
      `}</style>
    </>
  );
}