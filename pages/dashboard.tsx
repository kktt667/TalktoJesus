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
  position: string;
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
    verse: "Be strong and courageous. Do not be afraid",
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
    description: "Walk in His footsteps",
    position: "top",
    angle: -60
  },
  {
    title: "Daily Prayer",
    route: "/prayer-generator",
    icon: "🙏",
    description: "Strengthen your faith",
    position: "right",
    angle: 60
  },
  {
    title: "Parables & Teachings",
    route: "/parable-generator",
    icon: "📖",
    description: "Divine wisdom",
    position: "bottom-right",
    angle: 180
  },
  {
    title: "Divine Guidance",
    route: "/wwjd-generator",
    icon: "✝️",
    description: "Seek His way",
    position: "bottom-left",
    angle: -180
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const rayVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: [0.4, 0.6, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut"
    }
  }
};

const floatVariants = {
  hover: {
    y: [-10, 10],
    transition: {
      y: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        repeatType: "reverse"
      }
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
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src="/images/peach_background.jpg"
            alt="Divine Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 backdrop-blur-[1px]" />
        </div>

        {/* Divine Rays */}
        <div className="fixed inset-0 z-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              variants={rayVariants}
              className="absolute top-1/2 left-1/2 w-[800px] h-2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${i * 30}deg)`,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <motion.header
            variants={itemVariants}
            className="p-6 flex justify-between items-center bg-white/10 backdrop-blur-sm border-b border-white/20"
          >
            <div className="flex items-center space-x-3">
              <h1 className="font-cinzel text-2xl text-rose-900">
                Jesus Connect
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-6 py-3 text-rose-900 border border-rose-300 rounded-full
                       backdrop-blur-sm font-cinzel text-sm tracking-wider
                       hover:bg-white/20 transition-all duration-300"
            >
              Depart in Peace
            </motion.button>
          </motion.header>

          {/* Main Content Area */}
          <div className="flex-1 relative">
            {/* Central Jesus Figure */}
            <motion.div
              variants={floatVariants}
              animate="hover"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <img
                  src="/images/jesus1.png"
                  alt="Jesus"
                  className="w-[500px] h-auto filter drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-radial opacity-50" />
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[900px] h-[900px]">
                {navigationOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.2)"
                    }}
                    className="absolute w-64 cursor-pointer"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${option.angle}deg) translate(300px) rotate(-${option.angle}deg)`,
                    }}
                    onClick={() => handleNavigation(option.route)}
                  >
                    <div className={`
                      bg-white/10 backdrop-blur-md rounded-xl p-6
                      border border-white/30 transition-all duration-300
                      hover:border-rose-200 group
                    `}>
                      <span className="text-4xl mb-4 block">
                        {option.icon}
                      </span>
                      <h3 className="font-cinzel text-xl mb-2 text-rose-900 group-hover:text-rose-800">
                        {option.title}
                      </h3>
                      <p className="font-cormorant text-lg text-rose-800/80">
                        {option.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Scripture Quote */}
          <motion.div
            variants={itemVariants}
            className="relative py-4 bg-white/10 backdrop-blur-sm border-t border-white/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScripture}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <p className="font-cormorant text-xl text-rose-900 italic">
                  {scriptures[currentScripture]?.verse}
                </p>
                <p className="text-sm mt-1 font-cinzel text-rose-800">
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

        .bg-gradient-radial {
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 70%
          );
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(225, 29, 72, 0.2);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(225, 29, 72, 0.3);
        }
      `}</style>
    </>
  );
}