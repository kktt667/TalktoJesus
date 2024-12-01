import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import Head from "next/head";

export default function DashboardPage() {
  const router = useRouter();
  const { ready, authenticated, logout } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const handleLogout = async () => {
    try {
      await logout();
      // Wait for the logout to complete before redirecting
      setTimeout(() => {
        router.push('/');
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading or nothing while checking authentication
  if (!ready || !authenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>You Have Found Jesus</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img
              src="/images/jesus_dash.jpeg"
              alt="Divine Background"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ffd70033] to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffd700] blur-[100px] opacity-20"></div>
        </div>

        {/* Overlay Jesus image */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <img src="/path/to/jesus_cut.png" alt="Jesus Image" className="overlay-image" />
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 z-10 px-4 py-2 text-[#ffd700] border border-[#ffd700] rounded-md hover:bg-[#ffd700]/10 transition-all duration-300"
        >
          Logout
        </button>

        {/* Main text */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <h1 className="text-message">
            YOU HAVE FOUND JESUS
          </h1>
        </div>
      </main>

      <style jsx global>{`
        .overlay-image {
          position: absolute;
          z-index: 10;
          width: 50%;
          max-width: 400px;
          height: auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .text-message {
          font-family: 'Cinzel', serif;
          font-size: 5rem;
          font-weight: 700;
          color: #ffd700;
          text-align: center;
          text-shadow: 
            0 0 10px rgba(255, 215, 0, 0.5),
            0 0 20px rgba(255, 215, 0, 0.3),
            0 0 30px rgba(255, 215, 0, 0.2);
          animation: messageGlow 2s ease-in-out infinite;
          letter-spacing: 2px;
          padding: 0 20px;
        }

        @keyframes messageGlow {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(255, 215, 0, 0.5),
              0 0 20px rgba(255, 215, 0, 0.3),
              0 0 30px rgba(255, 215, 0, 0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(255, 215, 0, 0.7),
              0 0 30px rgba(255, 215, 0, 0.5),
              0 0 40px rgba(255, 215, 0, 0.3);
          }
        }

        @media (max-width: 768px) {
          .text-message {
            font-size: 3rem;
          }
        }
      `}</style>
    </>
  );
}