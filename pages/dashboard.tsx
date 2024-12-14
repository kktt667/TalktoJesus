import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Authentication check
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const navigationOptions = [
    {
      title: "Acts of Kindness",
      route: "/acts-generator",
      icon: "🕊️",
      description: "Generate inspiring acts of kindness"
    },
    {
      title: "Parables",
      route: "/parable-generator",
      icon: "📖",
      description: "Explore meaningful parables"
    },
    {
      title: "Prayer",
      route: "/prayer-generator",
      icon: "🙏",
      description: "Guided prayer assistance"
    },
    {
      title: "What Would Jesus Do?",
      route: "/wwjd-generator",
      icon: "✝️",
      description: "Find guidance in daily decisions"
    }
  ];

  const handleNavigation = (route: string, index: number) => {
    setSelectedOption(index);
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
        <title>Sacred Journey | Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cinzel:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src="/images/peach_background.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10">
          {/* Header */}
          <header className="p-6 flex justify-between items-center bg-white/10 backdrop-blur-sm">
            <h1 className="font-cinzel text-2xl text-gray-800">Sacred Journey</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-4 py-2 text-gray-600 border border-gray-400 rounded-md 
                       hover:bg-white/20 transition-colors font-cormorant"
            >
              Depart
            </motion.button>
          </header>

          {/* Central Content */}
          <div className="container mx-auto px-4 mt-8">
            <div className="relative py-12">
              {/* Central Jesus Image */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <img
                  src="/images/jesus.png"
                  alt="Jesus"
                  className="w-32 opacity-80"
                />
              </motion.div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {navigationOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md 
                              border border-gray-200 cursor-pointer transition-all
                              ${selectedOption === index ? 'ring-2 ring-gold' : ''}`}
                    onClick={() => handleNavigation(option.route, index)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl mb-4">{option.icon}</span>
                      <h3 className="font-cinzel text-xl mb-2 text-gray-800">
                        {option.title}
                      </h3>
                      <p className="font-cormorant text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="absolute bottom-0 w-full py-4 text-center text-gray-600 font-cormorant bg-white/10 backdrop-blur-sm">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "Walk by faith, not by sight" - 2 Corinthians 5:7
            </motion.p>
          </footer>
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
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        .ring-gold {
          --tw-ring-color: rgba(218, 165, 32, 0.5);
        }
      `}</style>
    </>
  );
}