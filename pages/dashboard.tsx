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
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <motion.button
      onClick={onClick}
      className="relative w-[250px] h-[380px] group"
      animate={{ y: [0, -5, 0] }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Glitter Effect */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#ffd700] rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Card Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={`/images/cards/${item.id}.png`}
            layout="fill"
            objectFit="contain"
            alt={item.title}
            className="transition-transform duration-500"
          />
        </div>
      </div>
    </motion.button>

    {/* Title */}
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center">
      <h3 className="font-cinzel text-gold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {item.title}
      </h3>
    </div>
  </motion.div>
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
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleChatClose} />

        {/* Chat Window */}
        <motion.div 
          className="relative w-full max-w-4xl h-[85vh] flex flex-col"
        >
          {/* Border Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/border.png"
              layout="fill"
              objectFit="fill"
              alt="Scroll Border"
              className="opacity-100"
            />
          </div>

          {/* Content Container */}
          <div className="relative flex flex-col h-full pt-32 px-16 pb-16">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="font-cinzel text-[#2c1810] text-4xl tracking-wider mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
                {item.title}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
              {messages[chatId]?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.role === 'user' 
                      ? 'bg-[#2c1810]/10 border-[#2c1810]/20' 
                      : 'bg-[#2c1810]/5 border-[#2c1810]/10'
                  } border rounded-lg p-6 backdrop-blur-sm relative`}>
                    <p className="font-cormorant text-[#2c1810] text-xl leading-relaxed">
                      {msg.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-[#2c1810]/70 font-cinzel">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                      {msg.role === 'assistant' && (
                        <div className="flex items-center space-x-1">
                          <div className="w-1 h-1 bg-[#2c1810]/50 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-[#2c1810]/50 rounded-full animate-pulse delay-100" />
                          <div className="w-1 h-1 bg-[#2c1810]/50 rounded-full animate-pulse delay-200" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="relative mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(chatId)}
                    placeholder="Ask for divine guidance..."
                    className="w-full bg-[#2c1810]/5 border-2 border-[#2c1810]/30 rounded-full px-8 py-4
                              text-xl text-[#2c1810] placeholder-[#2c1810]/40 
                              focus:outline-none focus:border-[#2c1810]/50
                              transition-colors duration-200 font-cormorant"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(chatId)}
                  className="bg-[#2c1810]/5 hover:bg-[#2c1810]/10 rounded-full p-6
                            transition-all duration-200 border-2 border-[#2c1810]/30
                            hover:border-[#2c1810]/50 group relative"
                >
                  <Image
                    src="/images/dove_icon.png"
                    width={48}
                    height={48}
                    alt="Send"
                    className="opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleChatClose}
            className="absolute top-6 right-8 text-[#2c1810]/60 hover:text-[#2c1810] transition-colors text-4xl"
          >
            ×
          </button>
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
        {/* Light Rays */}
        <div className="fixed inset-0 z-[1] overflow-hidden">
          {/* Central Glow */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.08) 0%, transparent 70%)'
            }}
          />
          
          {/* Rotating Rays */}
          <div className="absolute inset-[-100%] origin-center animate-spin-very-slow">
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  repeating-conic-gradient(
                    from 0deg at 50% 50%,
                    transparent 0deg,
                    rgba(255,215,0,0.12) 2deg,
                    rgba(255,215,0,0.08) 4deg,
                    rgba(255,215,0,0.04) 6deg,
                    transparent 8deg,
                    transparent 45deg
                  ),
                  repeating-conic-gradient(
                    from 22.5deg at 50% 50%,
                    transparent 0deg,
                    rgba(255,215,0,0.08) 2deg,
                    rgba(255,215,0,0.04) 4deg,
                    rgba(255,215,0,0.02) 6deg,
                    transparent 8deg,
                    transparent 45deg
                  )
                `,
                filter: 'blur(1px)',
              }}
            />
          </div>
        </div>

        {/* Background Image with Overlay */}
        <div className="fixed inset-0">
          <Image
            src="/images/background.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Background"
            className="opacity-50"
          />
          <div className="absolute inset-0 bg-[#1e1d2a]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="fixed top-8 right-8 z-50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => void logout()}
              className="px-6 py-2 bg-black/40 rounded-full
                       text-gold font-cinzel hover:text-gold/80
                       transition-all duration-300 border border-gold/30
                       hover:border-gold/50 hover:shadow-[0_0_15px_rgba(218,165,32,0.2)]"
            >
              Depart in Peace
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="flex items-center justify-center min-h-screen -mt-12">
            {/* Cards Row */}
            <div className="flex justify-center items-center gap-2">
              {navigationItems.slice(0, 2).map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  onClick={() => handleChatOpen(item.id)}
                />
              ))}

              {/* Central Cross */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-[300px] h-[300px] mx-4"
              >
                <Image
                  src="/images/cross.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Sacred Cross"
                  className="filter drop-shadow-[0_0_60px_rgba(218,165,32,0.7)]"
                />
              </motion.div>

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
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 480s linear infinite;
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