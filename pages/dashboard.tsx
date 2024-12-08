import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";

export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
  // Update the type of selectedOrb state
  const [selectedOrb, setSelectedOrb] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  interface OrbPosition {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    route: string;
    label: string;
  }

  const orbPositions: OrbPosition[] = [
    { top: "25%", left: "25%", route: "/page1", label: "Orb 1" },
    { top: "25%", right: "25%", route: "/page2", label: "Orb 2" },
    { bottom: "25%", left: "25%", route: "/page3", label: "Orb 3" },
    { bottom: "25%", right: "25%", route: "/page4", label: "Orb 4" },
  ];
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const handleOrbClick = async (route: string, index: number) => {
    setSelectedOrb(index);
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push(route);
    }, 1500);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        router.push('/');
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!ready || !authenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <MouseParallaxContainer
        className="min-h-screen relative overflow-hidden bg-[#0a0a0f]"
        containerStyles={{
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="relative w-full h-full"> {/* Add this wrapper div */}
          {/* Background with parallax effect */}
          <MouseParallaxChild
            factorX={0.03}
            factorY={0.03}
            className="fixed inset-0 z-0 opacity-70"
          >
            <img
              src="/images/dash_background.png"
              alt="Divine Background"
              className="w-full h-full object-cover"
            />
          </MouseParallaxChild>

          {/* Central Jesus figure with ray effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-radial from-[#ffd700]/30 to-transparent"
              />
              <img
                src="/images/jesus.png"
                alt="Jesus"
                className="relative z-20 max-w-[500px] h-auto"
              />
            </div>
          </motion.div>

          {/* Orbs */}
          {orbPositions.map((position, index) => (
            <motion.div
              key={index}
              className="absolute z-30"
              style={position}
              animate={{
                scale: selectedOrb === index ? 1.5 : 1,
                x: selectedOrb === index ? "calc(50vw - 50%)" : 0,
                y: selectedOrb === index ? "calc(50vh - 50%)" : 0,
                opacity: selectedOrb !== null && selectedOrb !== index ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
              whileHover={{ scale: selectedOrb === null ? 1.1 : 1 }}
              onClick={() => !selectedOrb && handleOrbClick(position.route, index)}
            >
              {/* ... orb content ... */}
            </motion.div>
          ))}

          {/* Transition flash effect */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white z-50"
                transition={{ duration: 1.5 }}
              />
            )}
          </AnimatePresence>

          {/* Logout button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
            onClick={handleLogout}
            className="absolute top-4 right-4 z-40 px-4 py-2 text-[#ffd700] border border-[#ffd700] rounded-md transition-all duration-300"
          >
            Logout
          </motion.button>
        </div>
      </MouseParallaxContainer>

      <style jsx global>{`
        @keyframes rayAnimation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
          animation: rayAnimation 20s linear infinite;
        }
      `}</style>
    </>
  );
}