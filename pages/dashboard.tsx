// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { Particles } from "../components";
import { DivineLogo } from "../components/DivineLogo";

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
  symbolPath: string;
}

interface Scripture {
  text: string;
  reference: string;
}

const DEFAULT_SCRIPTURE: Scripture = {
  text: "The light shines in the darkness",
  reference: "John 1:5"
};

const scriptureVerses: Scripture[] = [
  DEFAULT_SCRIPTURE,
  { text: "Be strong and courageous", reference: "Joshua 1:9" },
  { text: "Walk by faith, not by sight", reference: "2 Corinthians 5:7" },
  { text: "Peace I leave with you", reference: "John 14:27" }
];

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
    },
    symbolPath: "M16 4l2.1 5.6L23 11l-4 4.1.7 5.9-4.7-2.3L10.3 21l.7-5.9L7 11l4.9-1.4z"
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
    },
    symbolPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
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
    },
    symbolPath: "M12 2v20M2 12h20"
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
    },
    symbolPath: "M22 2L12 20 2 2h20z"
  }
];

const DivineButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      px-4 py-1.5 text-sm font-cinzel text-white/80
      border border-white/10 rounded-full
      backdrop-blur-sm
      hover:border-white/20 hover:text-white/90
      transition-colors duration-300
      ${className}
    `}
  >
    {children}
  </motion.button>
);

export default function DashboardPage(): JSX.Element | null {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<number>(0);

  useEffect(() => {
    if (ready && !authenticated) {
      void router.push("/");
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % scriptureVerses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (route: string, id: string): void => {
    setSelectedItem(id);
    setTimeout(() => {
      void router.push(route);
    }, 1000);
  };

  const getCurrentScripture = (): Scripture => {
    if (scriptureVerses.length === 0) return DEFAULT_SCRIPTURE;
    const safeIndex = Math.abs(currentVerse) % scriptureVerses.length;
    return scriptureVerses[safeIndex] || DEFAULT_SCRIPTURE;
  };

  if (!ready || !authenticated) {
    return null;
  }

  const currentScripture = getCurrentScripture();

  return (
    <>
      <Head>
        <title>Jesus Connect | Divine Dashboard</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0f3c] via-[#2c1810] to-[#462305]">
        {/* Divine Background */}
        <Canvas
          camera={{ position: [0, 0, 70], fov: 60 }}
          className="fixed inset-0 z-0"
          style={{ background: 'linear-gradient(to bottom, #1a0f3c, #2c1810)' }}
        >
          <ambientLight intensity={0.5} />
          <Particles />
        </Canvas>

        {/* Additional gradient overlay for depth */}
        <div className="fixed inset-0 z-1 bg-gradient-radial from-transparent via-black/10 to-black/30 pointer-events-none" />

        {/* Holy Overlay */}
        <div className="fixed inset-0 z-1 bg-gradient-radial from-transparent to-black/20" />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <DivineLogo />
              <DivineButton onClick={() => void logout()}>
                Depart in Peace
              </DivineButton>
            </div>
          </header>

          {/* Scripture Banner */}
          <div className="fixed top-16 left-0 right-0 bg-black/5 backdrop-blur-sm border-b border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVerse}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="container mx-auto px-4 py-2 text-center"
              >
                <p className="font-cormorant italic text-white/70">
                  "{currentScripture.text}"
                  <span className="ml-2 text-white/50 text-sm">
                    — {currentScripture.reference}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Grid */}
          <div className="container mx-auto px-4 pt-32 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-xl bg-white/5 
                             backdrop-blur-sm border border-white/10 
                             group-hover:border-white/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => handleNavigation(item.route, item.id)}
                      className="w-full text-left p-6"
                    >
                      {/* Divine Symbol */}
                      <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d={item.symbolPath} strokeWidth="1" />
                        </svg>
                      </div>

                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <h2 className="text-lg font-cinzel text-white/90">
                          {item.title}
                        </h2>
                      </div>
                      <p className="font-cormorant text-base text-white/70 mb-3">
                        {item.description}
                      </p>
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-sm italic text-white/50 font-cormorant">
                          "{item.verse.text}"
                        </p>
                        <p className="text-xs text-white/40 font-cinzel mt-1">
                          {item.verse.reference}
                        </p>
                      </div>
                    </button>
                  </motion.div>
                </motion.div>
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
              className="fixed inset-0 z-50 bg-white"
              transition={{ duration: 0.7 }}
            />
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #1a0f3c;
          color: #fff;
        }

        .font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);
        }
      `}</style>
    </>
  );
}