
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, CheckCircle2 } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2 ring-1 ring-green-500/20">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Successfully Logged Out</h1>
        <p className="text-muted-foreground text-lg">
          We hope to see you back soon!
        </p>
      </div>

      <div className="text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
         Redirecting to login in <span className="font-semibold text-foreground">{countdown}</span> seconds...
      </div>

      <div className="pt-4 w-full">
        <Button asChild className="w-full h-11" variant="outline">
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            Sign In Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
