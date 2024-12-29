import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !authenticated) {
      void router.push("/");
    }
  }, [ready, authenticated, router]);

  const handleNavigation = (route: string, id: string): void => {
    setSelectedItem(id);
    setTimeout(() => {
      void router.push(route);
    }, 1000);
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] animate-pulse-opacity"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(218,165,32,0.25) 0%, rgba(218,165,32,0.15) 30%, rgba(218,165,32,0.05) 60%, transparent 80%)',
            }}
          />
          
          {/* Animated Light Rays */}
          <div className="absolute inset-0 origin-center animate-spin-slow">
            {[...Array(48)].map((_, i) => {
              // Create groups of rays with different characteristics
              const rayGroup = i % 4; // 0, 1, 2, 3
              let baseOpacity, width;
              
              switch(rayGroup) {
                case 0: // Primary rays
                  baseOpacity = 0.4;
                  width = 2;
                  break;
                case 1: // Secondary rays
                  baseOpacity = 0.3;
                  width = 1.5;
                  break;
                case 2: // Tertiary rays
                  baseOpacity = 0.2;
                  width = 1;
                  break;
                default: // Fine rays
                  baseOpacity = 0.15;
                  width = 0.5;
              }
              
              return (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 ${rayGroup === 0 ? 'animate-pulse-opacity' : ''} ${rayGroup <= 1 ? 'animate-ray-width' : ''}`}
                  style={{
                    width: `${width}px`,
                    height: '300vh',
                    background: `linear-gradient(to bottom, 
                      rgba(218,165,32,${baseOpacity}) 0%, 
                      rgba(218,165,32,${baseOpacity * 0.8}) 15%, 
                      rgba(218,165,32,${baseOpacity * 0.6}) 30%, 
                      rgba(218,165,32,${baseOpacity * 0.4}) 50%, 
                      rgba(218,165,32,${baseOpacity * 0.2}) 70%, 
                      transparent 100%)`,
                    transform: `rotate(${i * (360/48)}deg) translateX(-50%)`,
                    transformOrigin: '50% 0',
                    opacity: rayGroup === 0 ? 1 : rayGroup === 1 ? 0.8 : rayGroup === 2 ? 0.6 : 0.4,
                  }}
                />
              );
            })}
          </div>
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
                  onClick={() => handleNavigation(item.route, item.id)}
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
                {/* Cross Glow */}
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
                  onClick={() => handleNavigation(item.route, item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Page Transition */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black"
              transition={{ duration: 0.7 }}
            />
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-opacity {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }

        @keyframes ray-width {
          0% { transform: scaleX(0.8); }
          50% { transform: scaleX(1.2); }
          100% { transform: scaleX(0.8); }
        }

        .animate-spin-slow {
          animation: spin-slow 180s linear infinite;
        }

        .animate-pulse-opacity {
          animation: pulse-opacity 12s ease-in-out infinite;
        }

        .animate-ray-width {
          animation: ray-width 15s ease-in-out infinite;
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