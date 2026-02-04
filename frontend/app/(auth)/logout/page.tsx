
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
      
      <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
          <div className="h-24 w-24 bg-neutral-900/80 rounded-full flex items-center justify-center text-white relative z-10 border border-white/10 shadow-2xl">
             <CheckCircle2 className="h-10 w-10" />
          </div>
      </div>
      
      <div className="space-y-4 text-center max-w-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Logged Out</h1>
        <p className="text-neutral-400 text-lg">
          You have been successfully signed out. <br/> See you again soon!
        </p>
      </div>

      <div className="mt-10 p-6 rounded-2xl bg-neutral-900/30 border border-white/5 w-full max-w-[280px] text-center backdrop-blur-sm">
         <p className="text-xs font-medium text-neutral-500 mb-2 uppercase tracking-widest">Redirecting in</p>
         <div className="text-5xl font-mono font-medium text-white tracking-tighter">00:0{countdown}</div>
      </div>

      <div className="pt-10 w-full max-w-xs">
        <Button asChild className="w-full h-11 bg-white hover:bg-neutral-200 text-black border-0 font-medium transition-transform active:scale-[0.98]" variant="default">
          <Link href="/login">
            Sign In Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
