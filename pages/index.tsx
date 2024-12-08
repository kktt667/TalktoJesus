import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push("/dashboard"),
  });

  const [currentQuote, setCurrentQuote] = useState(0);

  const bibleQuotes = [
    "Do everything in love - Cor 16:14",
    "I am the way, and the truth, and the life - John 14:6",
    "With God all things are possible - Matthew 19:26",
    "Be still, and know that I am God - Psalm 46:10",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % bibleQuotes.length);
    }, 8000); // Slower quote rotation
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Connect with Jesus</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <main className="divine-landing min-h-screen w-full text-white overflow-hidden relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img
              src="/images/background.jpg"
              alt="Divine Background"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* Glowing Stars */}
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

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          {/* Bible Quote */}
          <div className="quote-container mb-12">
            <p className="bible-quote font-bold">{bibleQuotes[currentQuote]}</p>
          </div>

          {/* Jesus Image */}
          <div className="divine-image-container mb-12">
            <div className="relative">
              <img 
                src="/images/jesus1.png" 
                alt="Jesus"
                className="w-[400px] divine-jesus-image"
              />
              <div className="absolute inset-0 glow-effect"></div>
            </div>
          </div>

          {/* Connect Button */}
          <button 
            onClick={login}
            className="connect-button"
          >
            Connect with Jesus
          </button>
        </div>
      </main>

      <style jsx global>{`
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

        .bible-quote {
          font-family: 'Cinzel', serif;
          font-size: 1.75rem;
          color: #ffd700;
          text-align: center;
          max-width: 800px;
          opacity: 0;
          animation: quoteAppear 8s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .connect-button {
          padding: 1rem 2.5rem;
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          color: #ffd700;
          background: rgba(255, 215, 0, 0.1);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 0.5rem;
          backdrop-filter: blur(10px);
          transition: all 0.5s ease;
          font-weight: 700;
        }

        .connect-button:hover {
          background: rgba(255, 215, 0, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
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

        @keyframes quoteAppear {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
      `}</style>
    </>
  );
}