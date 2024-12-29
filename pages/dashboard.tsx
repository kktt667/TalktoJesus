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
    description: "Enter into Sacred Communion",
    verse: {
      text: "Ask and it will be given to you",
      reference: "Matthew 7:7"
    }
  },
  {
    id: "wisdom",
    title: "Sacred Wisdom",
    route: "/parable-generator",
    icon: "📖",
    description: "Discover Eternal Truths",
    verse: {
      text: "Your word is a lamp for my feet",
      reference: "Psalm 119:105"
    }
  },
  {
    id: "guidance",
    title: "Holy Guidance",
    route: "/wwjd-generator",
    icon: "✝️",
    description: "Walk in Divine Light",
    verse: {
      text: "I am the way, the truth, and the life",
      reference: "John 14:6"
    }
  },
  {
    id: "acts",
    title: "Acts of Grace",
    route: "/acts-generator",
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
    className="w-full bg-black/40 rounded-lg p-8
               backdrop-blur-sm border border-gold/30
               transition-all duration-300 
               hover:shadow-[0_0_25px_rgba(218,165,32,0.3)]
               relative overflow-hidden group"
    style={{
      backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2)),
        radial-gradient(circle at 50% 0%, rgba(218,165,32,0.15) 0%, transparent 50%),
        radial-gradient(circle at 50% 100%, rgba(218,165,32,0.1) 0%, transparent 50%)
      `
    }}
  >
    {/* Ornate Corner Decorations */}
    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
    
    {/* Decorative Lines */}
    <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    
    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="flex flex-col items-center text-center space-y-4">
        <span className="text-4xl mb-2 transform transition-transform duration-300 group-hover:scale-110 opacity-90">{item.icon}</span>
        <h3 className="font-cinzel text-white text-xl font-semibold tracking-wider group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>
        <p className="font-cormorant text-white/90 text-sm">
          {item.description}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gold/20 relative">
        {/* Ornate Divider */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border border-gold/30 bg-black/60" />
        
        <p className="font-cormorant italic text-white/80 text-sm">
          "{item.verse.text}"
        </p>
        <p className="font-cinzel text-gold text-xs mt-2">
          {item.verse.reference}
        </p>
      </div>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-4 md:bottom-4 md:w-[400px] 
                   bg-black/80 backdrop-blur-lg rounded-lg border border-gold/30 shadow-xl z-30
                   flex flex-col h-[600px]"
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="font-cinzel text-gold text-lg">{item.title}</h3>
          </div>
          <button 
            onClick={handleChatClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages[chatId]?.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-gold/20 text-white ml-auto' 
                  : 'bg-white/10 text-white'
              }`}>
                <p className="font-cormorant">{msg.content}</p>
                <p className="text-xs text-white/60 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gold/30">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(chatId)}
              placeholder={`Ask for ${item.description.toLowerCase()}...`}
              className="flex-1 bg-black/40 border border-gold/30 rounded-full px-4 py-2
                         text-white placeholder-white/50 focus:outline-none focus:border-gold/50"
            />
            <button
              onClick={() => handleSendMessage(chatId)}
              className="bg-gold/20 hover:bg-gold/30 text-white rounded-full p-2
                         transition-colors duration-200"
            >
              →
            </button>
          </div>
        </div>
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
          {/* Natural Sunburst Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,165,32,0.3)_0%,transparent_70%)]" />
          <div 
            className="absolute inset-0 animate-pulse-opacity"
            style={{
              background: `
                conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  rgba(218,165,32,0.15) 5deg,
                  transparent 10deg,
                  rgba(218,165,32,0.15) 15deg,
                  transparent 20deg,
                  rgba(218,165,32,0.15) 25deg,
                  transparent 30deg,
                  rgba(218,165,32,0.15) 35deg,
                  transparent 40deg,
                  rgba(218,165,32,0.15) 45deg,
                  transparent 50deg,
                  rgba(218,165,32,0.15) 55deg,
                  transparent 60deg,
                  rgba(218,165,32,0.15) 65deg,
                  transparent 70deg,
                  rgba(218,165,32,0.15) 75deg,
                  transparent 80deg,
                  rgba(218,165,32,0.15) 85deg,
                  transparent 90deg,
                  rgba(218,165,32,0.15) 95deg,
                  transparent 100deg,
                  rgba(218,165,32,0.15) 105deg,
                  transparent 110deg,
                  rgba(218,165,32,0.15) 115deg,
                  transparent 120deg,
                  rgba(218,165,32,0.15) 125deg,
                  transparent 130deg,
                  rgba(218,165,32,0.15) 135deg,
                  transparent 140deg,
                  rgba(218,165,32,0.15) 145deg,
                  transparent 150deg,
                  rgba(218,165,32,0.15) 155deg,
                  transparent 160deg,
                  rgba(218,165,32,0.15) 165deg,
                  transparent 170deg,
                  rgba(218,165,32,0.15) 175deg,
                  transparent 180deg,
                  rgba(218,165,32,0.15) 185deg,
                  transparent 190deg,
                  rgba(218,165,32,0.15) 195deg,
                  transparent 200deg,
                  rgba(218,165,32,0.15) 205deg,
                  transparent 210deg,
                  rgba(218,165,32,0.15) 215deg,
                  transparent 220deg,
                  rgba(218,165,32,0.15) 225deg,
                  transparent 230deg,
                  rgba(218,165,32,0.15) 235deg,
                  transparent 240deg,
                  rgba(218,165,32,0.15) 245deg,
                  transparent 250deg,
                  rgba(218,165,32,0.15) 255deg,
                  transparent 260deg,
                  rgba(218,165,32,0.15) 265deg,
                  transparent 270deg,
                  rgba(218,165,32,0.15) 275deg,
                  transparent 280deg,
                  rgba(218,165,32,0.15) 285deg,
                  transparent 290deg,
                  rgba(218,165,32,0.15) 295deg,
                  transparent 300deg,
                  rgba(218,165,32,0.15) 305deg,
                  transparent 310deg,
                  rgba(218,165,32,0.15) 315deg,
                  transparent 320deg,
                  rgba(218,165,32,0.15) 325deg,
                  transparent 330deg,
                  rgba(218,165,32,0.15) 335deg,
                  transparent 340deg,
                  rgba(218,165,32,0.15) 345deg,
                  transparent 350deg,
                  rgba(218,165,32,0.15) 355deg,
                  transparent 360deg
                )
              `
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => void logout()}
              className="px-6 py-2 bg-black/40 rounded-full text-white font-cinzel hover:text-gold transition-all duration-300 border border-gold/30 hover:border-gold/50 hover:shadow-[0_0_15px_rgba(218,165,32,0.2)]"
            >
              Depart in Peace
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="grid grid-cols-1 gap-8 md:w-1/3">
              {navigationItems.slice(0, 2).map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  onClick={() => handleChatOpen(item.id)}
                />
              ))}
            </div>

            {/* Central Cross */}
            <div className="md:w-1/3 flex justify-center translate-x-4 z-20">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-96 h-96"
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

            {/* Right Column */}
            <div className="grid grid-cols-1 gap-8 md:w-1/3">
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
        @keyframes pulse-opacity {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
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