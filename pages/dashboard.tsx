// pages/dashboard.tsx
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { Particles } from "../components";

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

export default function DashboardPage(): JSX.Element | null {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready && !authenticated) {
      void router.push("/");
    }
  }, [ready, authenticated, router]);

  const handleNavigation = async (route: string, id: string) => {
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
        <title>Sacred Dashboard | Jesus Connect</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <main 
        ref={mainRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0f3c] via-[#2c1810] to-[#462305]"
      >
        {/* Divine Background */}
        <Canvas className="fixed inset-0 z-0">
          <Particles count={3000} />
        </Canvas>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-12 h-12"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#ff8c00] rounded-full opacity-20 animate-pulse" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">
                  ✝️
                </span>
              </motion.div>
              <h1 className="text-3xl font-cinzel text-white/90 tracking-wider">
                Sacred Journey
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => void logout()}
              className="px-6 py-3 text-white/90 border border-white/30 rounded-full
                       backdrop-blur-sm font-cinzel tracking-wider
                       hover:bg-white/5 transition-all duration-300"
            >
              Depart in Peace
            </motion.button>
          </header>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {navigationItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden rounded-2xl bg-white/5 
                           backdrop-blur-sm border border-white/10 
                           group-hover:border-white/20 transition-all duration-300"
                >
                  <button
                    onClick={() => void handleNavigation(item.route, item.id)}
                    className="w-full text-left p-8"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <h2 className="text-2xl font-cinzel text-white/90">
                        {item.title}
                      </h2>
                    </div>
                    <p className="font-cormorant text-lg text-white/70 mb-4">
                      {item.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10">
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
        }

        .font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }
      `}</style>
    </>
  );
}