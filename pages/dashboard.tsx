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
        <title>Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
        {/* Darkened Background Image */}
        <div className="fixed inset-0 z-0 opacity-70">
          <img
            src="/images/jesus_dash1.png"
            alt="Divine Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Darkened Overlay Jesus image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/jesus_cut.png"
            alt="Jesus Image"
            className="overlay-image opacity-90"
          />
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 z-10 px-4 py-2 text-[#ffd700] border border-[#ffd700] rounded-md hover:bg-[#ffd700]/10 transition-all duration-300"
        >
          Logout
        </button>    
      </main>

      <style jsx global>{`
        .overlay-image {
          max-width: 100%;
          max-height: 100%;
        }

        @media (max-width: 768px) {
          .overlay-image {
            max-width: 100%;
            max-height: 100%;
          }
        }

        @media (min-width: 768px) {
          .overlay-image {
            width: 50%;
            height: auto;
          }
        }
        
        @media (min-width: 1024px) {
          .overlay-image {
            width: 30%;
            height: auto;
          }
        }

        @media (min-width: 1440px) {
          .overlay-image {
            width: 20%;
            height: auto;
          }
        }
      `}</style>
    </>
  );
}