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
    className="w-full bg-black/5 rounded-lg p-6
               backdrop-blur-sm border border-gold/30
               transition-all duration-300 hover:shadow-[0_0_15px_rgba(218,165,32,0.3)]
               relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative z-10">
      <div className="flex flex-col items-center text-center space-y-4">
        <span className="text-4xl mb-2">{item.icon}</span>
        <h3 className="font-cinzel text-gold text-xl font-semibold tracking-wider">
          {item.title}
        </h3>
        <p className="font-cormorant text-gray-200/90 text-sm">
          {item.description}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gold/20">
        <p className="font-cormorant italic text-gray-300/90 text-sm">
          "{item.verse.text}"
        </p>
        <p className="font-cinzel text-gold/80 text-xs mt-2">
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

      <main className="min-h-screen bg-[#0a0a0f]">
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black opacity-90" />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => void logout()}
              className="px-6 py-2 bg-black/40 rounded-full
                       text-gold/80 font-cinzel hover:text-gold
                       transition-all duration-300 border border-gold/30
                       hover:border-gold/50 hover:shadow-[0_0_15px_rgba(218,165,32,0.2)]"
            >
              Depart in Peace
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="grid grid-cols-1 gap-6 md:w-1/3">
              {navigationItems.slice(0, 2).map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  onClick={() => handleNavigation(item.route, item.id)}
                />
              ))}
            </div>

            {/* Central Cross */}
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-96 h-96"
              >
                <Image
                  src="/images/cross.png"
                  layout="fill"
                  objectFit="contain"
                  alt="Sacred Cross"
                  className="filter drop-shadow-[0_0_15px_rgba(218,165,32,0.3)]"
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="grid grid-cols-1 gap-6 md:w-1/3">
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