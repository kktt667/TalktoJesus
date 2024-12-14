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
  position: "left" | "right";
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
    position: "left"
  },
  {
    title: "Daily Prayer",
    route: "/prayer-generator",
    icon: "🙏",
    description: "Strengthen your spiritual connection",
    position: "right"
  },
  {
    title: "Parables & Teachings",
    route: "/parable-generator",
    icon: "📖",
    description: "Wisdom through His words",
    position: "left"
  },
  {
    title: "Divine Guidance",
    route: "/wwjd-generator",
    icon: "✝️",
    description: "What would Jesus do?",
    position: "right"
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
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
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFF5F0] to-[#FFE4D4]"
      >
        <div className="relative z-10">
          {/* Header */}
          <motion.header
            variants={itemVariants}
            className="p-6 flex justify-between items-center bg-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✝️</span>
              <h1 className="font-cinzel text-2xl text-orange-900">
                Jesus Connect
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-3 text-orange-800 border border-orange-300 rounded-full
                       backdrop-blur-sm font-cinzel text-sm tracking-wider
                       hover:bg-white/20 transition-colors duration-300"
            >
              Depart in Peace
            </motion.button>
          </motion.header>

          {/* Scripture Verse */}
          <motion.div 
            variants={itemVariants}
            className="relative mt-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScripture}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-2xl"
              >
                <div className="font-cormorant text-xl text-orange-800/80">
                  <p className="italic">{scriptures[currentScripture]?.verse}</p>
                  <p className="text-sm mt-2 font-cinzel">
                    — {scriptures[currentScripture]?.reference}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Grid */}
          <motion.div
            variants={containerVariants}
            className="container mx-auto px-4 mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {navigationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(251, 146, 60, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    ${option.position === "left" ? "md:mr-12" : "md:ml-12"}
                    bg-white/10 backdrop-blur-md rounded-xl p-8
                    border border-orange-200/30 cursor-pointer
                    hover:bg-white/20 transition-all duration-300
                  `}
                  onClick={() => handleNavigation(option.route)}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-4">{option.icon}</span>
                    <h3 className="font-cinzel text-xl mb-3 text-orange-900">
                      {option.title}
                    </h3>
                    <p className="font-cormorant text-lg text-orange-800/80">
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="fixed bottom-0 w-full py-4 text-center text-orange-800/60 font-cormorant bg-white/10 backdrop-blur-sm"
          >
            <p>"Let your light shine before others" — Matthew 5:16</p>
          </motion.footer>
        </div>

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
          overflow-x: hidden;
          background: #FFF5F0;
        }
      `}</style>
    </>
  );
}