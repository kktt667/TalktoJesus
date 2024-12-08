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
    angle: number;
    route: string;
    label: string;
  }

  const orbPositions: OrbPosition[] = [
    { 
      angle: -45, 
      route: "/acts-generator", 
      label: "Acts of Kindness Generator" 
    },
    { 
      angle: -15, 
      route: "/parable-generator", 
      label: "Parable Generator" 
    },
    { 
      angle: 15, 
      route: "/prayer-generator", 
      label: "Prayer Generator" 
    },
    { 
      angle: 45, 
      route: "/wwjd-generator", 
      label: "What Would Jesus Do?" 
    }
  ];

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const calculateOrbPosition = (angle: number) => {
    const radius = 400;
    const baseY = 150;
    const x = Math.sin(angle * Math.PI / 180) * radius;
    const y = baseY + (Math.pow(Math.cos(angle * Math.PI / 180), 2) * radius * 0.2);
    return { x, y };
  };

  const handleOrbClick = async (route: string, index: number) => {
    setSelectedOrb(index);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 1000);
    setTimeout(() => {
      router.push(route);
    }, 2500);
  };

  if (!ready || !authenticated) {
    return null;
  }
  return (
    <>
      <Head>
        <title>Divine Dashboard</title>
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
          globalFactorX={0.3}
          globalFactorY={0.3}
        >
          <MouseParallaxChild
            factorX={0.5}
            factorY={0.5}
            className="absolute inset-[-20%] w-[140%] h-[140%]"
          >
            <div className="relative w-full h-full">
              <img
                src="/images/dash_background.png"
                alt="Divine Background"
                className="absolute w-full h-full object-cover"
                style={{ transform: "scale(1.4)" }}
              />
            </div>
          </MouseParallaxChild>

          <div className="absolute inset-x-0 bottom-0 flex justify-center items-end">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-50%] bg-gradient-radial"
              />
              <img
                src="/images/jesus.png"
                alt="Jesus"
                className="relative max-h-[80vh] w-auto z-10"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-[15%] z-20 flex justify-center items-center">
            <div className="relative h-[400px] w-[1000px]">
              {orbPositions.map((position, index) => {
                const { x, y } = calculateOrbPosition(position.angle);
                return (
                  <motion.div
                    key={index}
                    className="absolute left-1/2 top-1/2"
                    initial={{ x, y }}
                    animate={{
                      x: selectedOrb === index ? 0 : x,
                      y: selectedOrb === index ? -100 : y,
                      scale: selectedOrb === index ? 1.5 : 1,
                      opacity: selectedOrb !== null && selectedOrb !== index ? 0 : 1,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    whileHover={{ scale: selectedOrb === null ? 1.1 : 1 }}
                    onClick={() => !selectedOrb && handleOrbClick(position.route, index)}
                  >
                    <div className="relative w-32 h-32">
                      <img
                        src="/images/Orbs.png"
                        alt={`Orb ${index + 1}`}
                        className="w-full h-full"
                      />
                      <img
                        src="/images/dove_icon.png"
                        alt="Dove"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-70"
                      />
                      <motion.div
                        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                        animate={{
                          opacity: selectedOrb === null ? 1 : 0
                        }}
                      >
                        <div className="relative">
                          <div className="relative">
                            <div className="absolute -left-4 top-0 w-4 h-4 bg-[#805b15] skew-y-[45deg]" />
                            <div className="absolute -right-4 top-0 w-4 h-4 bg-[#805b15] skew-y-[-45deg]" />
                            <div className="relative px-6 py-2 bg-[#ffd700] text-[#000000] font-cinzel text-lg transform perspective-500 rotateX-10 ribbon-shadow ribbon-hover">
                              <div className="relative z-10">
                                {position.label}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
                            </div>
                            <div className="absolute -left-3 top-full w-3 h-4 bg-[#805b15]" />
                            <div className="absolute -right-3 top-full w-3 h-4 bg-[#805b15]" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
            onClick={logout}
            className="absolute top-4 right-4 z-30 px-4 py-2 text-[#ffd700] border border-[#ffd700] rounded-md font-cinzel"
          >
            Logout
          </motion.button>
        </MouseParallaxContainer>

        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50"
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: 'Cinzel';
          src: url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .font-cinzel {
          font-family: 'Cinzel', serif;
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

        .perspective-500 {
          perspective: 500px;
        }

        .rotateX-10 {
          transform: rotateX(10deg);
        }

        .ribbon-hover {
          transition: all 0.3s ease;
        }

        .ribbon-hover:hover {
          transform: rotateX(10deg) scale(1.05);
          filter: brightness(1.1);
        }

        .ribbon-shadow {
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </>
  );
}