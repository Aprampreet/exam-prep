
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Perform logout
    logout();
    
    // Clear cookie
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Countdown to redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/login"); // Redirect to login
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [logout, router]);

  return (
    <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      
      <div className="relative mb-6">
          <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full animate-pulse" />
          <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 relative z-10 border border-green-500/20 shadow-lg shadow-green-900/20">
             <CheckCircle2 className="h-10 w-10" />
          </div>
      </div>
      
      <div className="space-y-2 text-center max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight text-white">Logged Out</h1>
        <p className="text-neutral-400 text-base">
          You have been successfully signed out. <br/> See you again soon!
        </p>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 w-full max-w-[280px] text-center backdrop-blur-sm">
         <p className="text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">Redirecting in</p>
         <div className="text-3xl font-mono font-bold text-white">00:0{countdown}</div>
      </div>

      <div className="pt-8 w-full max-w-xs">
        <Button asChild className="w-full h-10 shadow-lg shadow-white/5 bg-white hover:bg-neutral-200 text-black border-0 font-medium" variant="default">
          <Link href="/login">
            Sign In Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
