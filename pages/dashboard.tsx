// pages/dashboard.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

interface Scripture {
  verse: string;
  reference: string;
}

interface NavigationOption {
  title: string;
  route: string;
  icon: string;
  description: string;
  position: "top" | "right" | "bottom" | "left";
  angle: number;
}

const scriptures: Scripture[] = [
  {
    verse: "For God so loved the world, that he gave his only Son",
    reference: "John 3:16"
  },
  {
    verse: "I can do all things through Christ who strengthens me",
    reference: "Philippians 4:13"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged",
    reference: "Joshua 1:9"
  },
  {
    verse: "The Lord is my shepherd, I lack nothing",
    reference: "Psalm 23:1"
  }
];

const navigationOptions: NavigationOption[] = [
  {
    title: "Acts of Kindness",
    route: "/acts-generator",
    icon: "🕊️",
    description: "Share Christ's love through daily acts",
    position: "top",
    angle: -45
  },
  {
    title: "Daily Prayer",
    route: "/prayer-generator",
    icon: "🙏",
    description: "Strengthen your spiritual connection",
    position: "right",
    angle: 45
  },
  {
    title: "Parables & Teachings",
    route: "/parable-generator",
    icon: "📖",
    description: "Wisdom through His words",
    position: "bottom",
    angle: 135
  },
  {
    title: "Divine Guidance",
    route: "/wwjd-generator",
    icon: "✝️",
    description: "What would Jesus do?",
    position: "left",
    angle: -135
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};
export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentScripture, setCurrentScripture] = useState(0);

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScripture((prev) => (prev + 1) % scriptures.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (route: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(route);
    }, 1000);
  };

  if (!ready || !authenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Jesus Connect | Divine Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cinzel:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Background with clouds and light */}
        <div className="fixed inset-0 z-0">
          <img
            src="/images/background.jpg"
            alt="Divine Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#FFF5F0]/20 backdrop-blur-[1px]" />
        </div>

        {/* Floating Stars Effect */}
        <div className="fixed inset-0 z-1">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="star-container"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <div className="star"></div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <motion.header
            variants={itemVariants}
            className="p-6 flex justify-between items-center bg-white/5 backdrop-blur-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                ✝️
              </motion.span>
              <h1 className="font-cinzel text-2xl text-[#ffd700]">
                Jesus Connect
              </h1>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-3 text-[#ffd700] border border-[#ffd700] rounded-full
                       backdrop-blur-sm font-cinzel text-sm tracking-wider"
            >
              Depart in Peace
            </motion.button>
          </motion.header>

          {/* Central Content */}
          <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center">
            {/* Floating Jesus */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
              <div className="relative">
                <img 
                  src="/images/jesus1.png" 
                  alt="Jesus"
                  className="w-[300px] divine-jesus-image"
                />
                <div className="absolute inset-0 glow-effect"></div>
              </div>
            </div>

            {/* Navigation Options */}
            <div className="relative w-[800px] h-[800px]">
              {navigationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute w-64 cursor-pointer"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${option.angle}deg) translate(250px) rotate(-${option.angle}deg)`,
                  }}
                  onClick={() => handleNavigation(option.route)}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6
                                border border-[#ffd700]/30 hover:bg-white/20 
                                transition-all duration-300 text-center">
                    <motion.span 
                      className="text-4xl mb-4 block"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {option.icon}
                    </motion.span>
                    <h3 className="font-cinzel text-xl mb-2 text-[#ffd700]">
                      {option.title}
                    </h3>
                    <p className="font-cormorant text-lg text-[#ffd700]/80">
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scripture Quote */}
          <motion.div
            variants={itemVariants}
            className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/10 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScripture}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="font-cormorant text-xl text-[#ffd700]"
              >
                <p className="italic">{scriptures[currentScripture]?.verse}</p>
                <p className="text-sm mt-2 font-cinzel">
                  — {scriptures[currentScripture]?.reference}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Page Transition */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50"
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </motion.main>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .star-container {
          position: absolute;
          width: 4px;
          height: 4px;
          animation: starFloat 5s ease-in-out infinite;
          will-change: transform;
        }

        .star {
          width: 100%;
          height: 100%;
          background: #ffd700;
          border-radius: 50%;
          animation: starPulse 5s ease-in-out infinite;
          will-change: opacity, transform;
          box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;
        }

        .divine-jesus-image {
          will-change: transform;
          animation: floatAnimation 6s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
        }

        .glow-effect {
          pointer-events: none;
          background: radial-gradient(circle at center, rgba(255, 215, 0, 0.2), transparent 70%);
          animation: glowPulse 6s ease-in-out infinite;
        }

        @keyframes starFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }

        @keyframes starPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}