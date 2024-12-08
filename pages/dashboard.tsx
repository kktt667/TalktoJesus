import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";

export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();
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

  if (!ready || !authenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0a0f]">
        <MouseParallaxContainer
          className="relative w-full h-full"
          containerStyle={{
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}
          globalFactorX={0.1}
          globalFactorY={0.1}
        >
          {/* Background Layer */}
          <MouseParallaxChild
            factorX={0.2}
            factorY={0.2}
            className="absolute inset-[-10%] w-[120%] h-[120%]"
          >
            <div className="relative w-full h-full">
              <img
                src="/images/dash_background.png"
                alt="Divine Background"
                className="absolute w-full h-full object-cover"
                style={{ transform: "scale(1.2)" }}
              />
            </div>
          </MouseParallaxChild>

          {/* Jesus Layer */}
          <MouseParallaxChild
            factorX={0.1}
            factorY={0.1}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-50%] bg-gradient-radial"
              />
              <img
                src="/images/jesus.png"
                alt="Jesus"
                className="relative max-w-[600px] w-full h-auto z-10"
              />
            </motion.div>
          </MouseParallaxChild>

          {/* Orbs Layer */}
          <div className="absolute inset-0 z-20">
            {orbPositions.map((position, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  top: position.top,
                  bottom: position.bottom,
                  left: position.left,
                  right: position.right,
                }}
                animate={{
                  scale: selectedOrb === index ? 1.5 : 1,
                  x: selectedOrb === index ? "calc(50vw - 50%)" : 0,
                  y: selectedOrb === index ? "calc(50vh - 50%)" : 0,
                  opacity: selectedOrb !== null && selectedOrb !== index ? 0 : 1,
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleOrbClick(position.route, index)}
              >
                <div className="relative w-24 h-24">
                  <img
                    src="/images/Orbs.png"
                    alt={`Orb ${index + 1}`}
                    className="w-full h-full"
                  />
                  <img
                    src="/images/dove_icon.png"
                    alt="Dove"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-70"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
            onClick={logout}
            className="absolute top-4 right-4 z-30 px-4 py-2 text-[#ffd700] border border-[#ffd700] rounded-md"
          >
            Logout
          </motion.button>
        </MouseParallaxContainer>

        {/* Transition Flash */}
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
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            circle,
            rgba(255, 215, 0, 0.3) 0%,
            transparent 70%
          );
          animation: rayAnimation 20s linear infinite;
        }

        @keyframes rayAnimation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}