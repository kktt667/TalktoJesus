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
    className="w-full bg-white/90 rounded-lg shadow-md p-6
               backdrop-blur-sm border border-gray-100
               transition-all duration-300 hover:shadow-lg"
  >
    <div className="flex items-center space-x-4">
      <span className="text-3xl">{item.icon}</span>
      <div>
        <h3 className="font-cinzel text-gray-800 text-lg mb-1">
          {item.title}
        </h3>
        <p className="font-cormorant text-gray-600 text-sm">
          {item.description}
        </p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="font-cormorant italic text-gray-600 text-sm">
        "{item.verse.text}"
      </p>
      <p className="font-cinzel text-gray-500 text-xs mt-1">
        {item.verse.reference}
      </p>
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

      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {/* Background Image */}
        <div className="fixed inset-0">
          <Image
            src="/images/background.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Background"
            className="opacity-30"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-end mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => void logout()}
              className="px-6 py-2 bg-white/80 rounded-full shadow-md 
                       text-gray-700 font-cinzel hover:shadow-lg
                       transition-all duration-300"
            >
              Depart in Peace
            </motion.button>
          </div>

          {/* Central Cross */}
          <div className="flex justify-center mb-16">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-64 h-64"
            >
              <Image
                src="/images/cross.jpg"
                layout="fill"
                objectFit="contain"
                alt="Sacred Cross"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {navigationItems.map((item) => (
              <NavigationButton
                key={item.id}
                item={item}
                onClick={() => handleNavigation(item.route, item.id)}
              />
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
          overflow-x: hidden;
          background: #ffffff;
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