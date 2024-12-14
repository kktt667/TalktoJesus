// pages/dashboard.tsx
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

interface NavigationItem {
  title: string;
  route: string;
  icon: string;
  description: string;
  position: 'nw' | 'ne' | 'sw' | 'se';
}

const navigationItems: NavigationItem[] = [
  {
    title: "Divine Prayer",
    route: "/prayer",
    icon: "🙏",
    description: "Commune with the Divine",
    position: "nw"
  },
  {
    title: "Sacred Wisdom",
    route: "/wisdom",
    icon: "📖",
    description: "Ancient Teachings",
    position: "ne"
  },
  {
    title: "Holy Guidance",
    route: "/guidance",
    icon: "✝️",
    description: "Walk in His Light",
    position: "sw"
  },
  {
    title: "Acts of Grace",
    route: "/acts",
    icon: "🕊️",
    description: "Share His Love",
    position: "se"
  }
];

const verses = [
  { text: "Be strong and courageous", reference: "Joshua 1:9" },
  { text: "I can do all things through Christ", reference: "Philippians 4:13" },
  { text: "The Lord is my shepherd", reference: "Psalm 23:1" },
  { text: "Let your light shine before others", reference: "Matthew 5:16" }
];
export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const [currentVerse, setCurrentVerse] = useState(0);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  // Initialize heavenly background effect
  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 0.5,
        cloudColor: 0xffd700,
        backgroundColor: 0x8b65a5,
        sunColor: 0xff9f80
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  // Verse rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % verses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auth check
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) return null;

  return (
    <>
      <Head>
        <title>Divine Dashboard | Jesus Connect</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>

      <main className="relative min-h-screen overflow-hidden">
        {/* Divine Background */}
        <div ref={vantaRef} className="fixed inset-0 z-0" />
        
        {/* Radial Gradient Overlay */}
        <div className="fixed inset-0 z-1 bg-gradient-radial from-transparent via-purple-900/10 to-purple-900/30" />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 flex justify-between items-center bg-white/5 backdrop-blur-sm"
          >
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-cinzel text-amber-50 tracking-wider flex items-center gap-3"
            >
              <span className="text-2xl">✝️</span>
              Jesus Connect
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-3 font-cinzel text-amber-50 border border-amber-50/30
                       rounded-full backdrop-blur-sm hover:bg-white/10 
                       transition-all duration-300"
            >
              Depart in Peace
            </motion.button>
          </motion.header>

          {/* Navigation Grid */}
          <div className="container mx-auto px-4 mt-20">
            <div className="relative w-full max-w-4xl mx-auto h-[600px]">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)"
                  }}
                  className={`
                    absolute w-64 cursor-pointer
                    ${item.position === 'nw' && 'top-0 left-0'}
                    ${item.position === 'ne' && 'top-0 right-0'}
                    ${item.position === 'sw' && 'bottom-0 left-0'}
                    ${item.position === 'se' && 'bottom-0 right-0'}
                  `}
                  onClick={() => router.push(item.route)}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6
                              border border-amber-50/20 hover:border-amber-50/40
                              transition-all duration-300 group">
                    <div className="flex flex-col items-center text-center">
                      <motion.span
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl mb-4"
                      >
                        {item.icon}
                      </motion.span>
                      <h3 className="font-cinzel text-xl mb-2 text-amber-50">
                        {item.title}
                      </h3>
                      <p className="font-cormorant text-lg text-amber-50/80">
                        {item.description}
                      </p>
                      <div className="h-0.5 w-12 bg-amber-50/30 mt-4 
                                  group-hover:w-full transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Central Divine Light */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            w-48 h-48 rounded-full bg-gradient-radial from-amber-200 via-amber-100/50 to-transparent
                            animate-pulse-slow pointer-events-none" />
            </div>
          </div>

          {/* Scripture Verse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 p-6 text-center
                      bg-gradient-to-t from-purple-900/50 to-transparent"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVerse}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <p className="font-cormorant text-xl text-amber-50 italic">
                  "{verses[currentVerse].text}"
                </p>
                <p className="text-sm mt-2 font-cinzel text-amber-50/80">
                  — {verses[currentVerse].reference}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </>
  );
}