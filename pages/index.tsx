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
    telegram: false,
    twitter: false,
  });

  return (
    <>
      <Head>
        <title>Roast Central · Cybernetic Arena</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="cyberpunk-landing min-h-screen w-full text-white overflow-hidden relative">
        {/* Telegram and Twitter (X) buttons side by side */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-center gap-8 p-4 bg-transparent opacity-80">
          {/* Telegram (Paper Airplane) Icon */}
          <a href="https://t.me/yourtelegramlink" target="_blank" rel="noopener" className="text-cyber-blue text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 12l18-8-5 18-4-5-9 2 1-7z" />
            </svg>
          </a>
          
          {/* Twitter (X) Icon */}
          <a href="https://x.com/RoastCentralAI" target="_blank" rel="noopener" className="text-cyber-blue text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.99 10.99 0 0 1-3.14.86A5.47 5.47 0 0 0 22.46 1.4a10.91 10.91 0 0 1-3.47 1.32A5.4 5.4 0 0 0 16.59 0a5.42 5.42 0 0 0-5.41 5.4c0 .42.05.83.15 1.23a15.41 15.41 0 0 1-11.2-5.7 5.4 5.4 0 0 0-.73 2.72 5.4 5.4 0 0 0 2.38 4.47A5.38 5.38 0 0 1 1 10v.07a5.42 5.42 0 0 0 4.33 5.3 5.41 5.41 0 0 1-2.43.09 5.44 5.44 0 0 0 5.07 3.78A10.91 10.91 0 0 1 0 19.54a15.39 15.39 0 0 0 8.29 2.43c9.94 0 15.41-8.26 15.41-15.4 0-.23 0-.46-.02-.68A10.88 10.88 0 0 0 23 3z" />
            </svg>
          </a>
        </div>

        {/* Background Image Section */}
        <div className="absolute inset-0">
          <div 
            className="cyber-background" 
            style={{
              backgroundImage: 'url("/images/bkg.jpg")', // Set the background image from public folder
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>

        {/* Main Content */}
        <section className="relative z-20 min-h-screen flex flex-col justify-center items-center text-center px-6" style={{ paddingTop: '200px' }}>
          <p className="cyber-subtext text-lg md:text-xl mb-8 opacity-70">
            Set Your Bounty. Roast Your Rivals.
          </p>

          {/* Enter Arena Button with Glowing Effect */}
          <button 
            className="cyber-main-button bg-cyber-blue px-8 py-3 rounded-lg text-lg font-bold border-4 border-transparent hover:border-red-500 transition-all duration-300 transform z-30"
            onClick={login}
          >
            Enter the Arena
          </button>

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
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
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
          box-shadow: 0 0 20px rgba(255,0,0,0.7);
          border-color: red;
        }

        .cyber-scroll-indicator {
          animation: bounce 1.5s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes titleFlicker {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
