
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, CheckCircle2, ArrowRight } from "lucide-react";

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
    <div className="w-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
          <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 relative z-10 border border-green-500/20 shadow-xl">
             <CheckCircle2 className="h-12 w-12" />
          </div>
      </div>
      
      <div className="space-y-4 text-center max-w-sm">
        <h1 className="text-3xl font-bold tracking-tight text-white">Logged Out</h1>
        <p className="text-muted-foreground/80 text-lg">
          You have been successfully signed out. <br/> See you again soon!
        </p>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm w-full max-w-[320px] text-center">
         <p className="text-sm text-muted-foreground mb-1">Redirecting in</p>
         <div className="text-4xl font-mono font-bold text-white">00:0{countdown}</div>
      </div>

      <div className="pt-8 w-full max-w-xs">
        <Button asChild className="w-full h-11 shadow-lg shadow-primary/10" variant="default">
          <Link href="/login">
            Sign In Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
