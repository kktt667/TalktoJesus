import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push("/dashboard"),
  });

  const [buttonHover, setButtonHover] = useState({
    login: false,
    register: false,
    telegram: false
  });

  return (
    <>
      <Head>
        <title>Roast Central · Cybernetic Arena</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="cyberpunk-landing min-h-screen w-full bg-black text-white overflow-hidden">
        {/* Cyber Background Effects */}
        <div className="absolute inset-0 cyber-background"></div>
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glassmorphic-header">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <div className="cyber-logo text-2xl font-bold tracking-wider">
              ROAST CENTRAL
            </div>
            <nav className="flex space-x-4">
              {['Login', 'Register', 'Telegram'].map((btn, index) => (
                <button
                  key={btn}
                  className={`cyber-button ${
                    btn === 'Login' ? 'bg-cyber-blue' : 
                    btn === 'Register' ? 'bg-cyber-orange' : 
                    'bg-cyber-pink'
                  } px-4 py-2 rounded-lg transition-all duration-300 transform`}
                  onMouseEnter={() => setButtonHover(prev => ({...prev, [btn.toLowerCase()]: true}))}
                  onMouseLeave={() => setButtonHover(prev => ({...prev, [btn.toLowerCase()]: false}))}
                  onClick={btn !== 'Telegram' ? login : () => window.open('https://t.me/yourtelegramlink', '_blank')}
                >
                  {btn}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
          <h1 className="cyber-title text-6xl md:text-8xl font-bold mb-4 tracking-wider">
            STEP INTO THE
            <br />
            ROASTING ARENA
          </h1>
          
          <p className="cyber-subtext text-lg md:text-xl mb-8 opacity-70">
            Set your bounty and roast friends, strangers, or AI
          </p>

          <div className="flex space-x-4">
            <button 
              className="cyber-main-button bg-cyber-blue px-8 py-3 rounded-lg text-lg font-bold"
              onClick={login}
            >
              Enter Arena
            </button>
          </div>

          {/* Glitch Scroll Indicator */}
          <div className="absolute bottom-10 cyber-scroll-indicator animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-cyber-blue"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      </main>

      <style jsx global>{`
        body {
          background-color: black;
          font-family: 'Roboto Mono', monospace;
        }

        .cyberpunk-landing {
          position: relative;
        }

        .cyber-background {
          background: linear-gradient(45deg, rgba(0,0,0,0.9), rgba(10,10,20,0.95));
          background-size: 400% 400%;
          animation: bgGradient 15s ease infinite;
          opacity: 0.9;
        }

        .cyber-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }

        .glassmorphic-header {
          background: rgba(20,20,30,0.6);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .cyber-title {
          background: linear-gradient(to right, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(0,255,255,0.4), 0 0 20px rgba(255,0,255,0.4);
          animation: titleFlicker 2s infinite alternate;
        }

        .cyber-main-button {
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(0,255,255,0.4);
        }

        .cyber-main-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0,255,255,0.7);
        }

        @keyframes bgGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes titleFlicker {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
