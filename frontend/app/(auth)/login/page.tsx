
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ArrowRight, Github, Mail, Lock } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {login} = useAuth();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      
      if (data?.access_token) {
        login(data.access_token);
        // Set cookie for SSR
        document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
        setTimeout(() => {
             router.push("/");
        }, 500);
      } else {
         throw new Error("No access token received");
      }
      
    } catch (err: any) {
      console.error(err);
      setError("Invalid credentials. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-700">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-sm text-neutral-400">
          Enter your email to sign in to your account
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2 text-left">
               <Label htmlFor="email" className={focusedInput === 'email' ? 'text-white' : 'text-neutral-400'}>Email</Label>
               <div className="relative group">
                  <Input 
                        id="email" 
                        placeholder="name@example.com" 
                        type="email" 
                        autoCapitalize="none" 
                        autoComplete="email" 
                        autoCorrect="off" 
                        disabled={isLoading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus:border-white/50 focus:bg-white/10 transition-all duration-300 rounded-lg"
                    />
                    <div className={`absolute left-3 top-2.5 pointer-events-none transition-colors duration-200 ${focusedInput === 'email' ? 'text-white' : 'text-neutral-500'}`}>
                        <Mail className="h-4 w-4" />
                    </div>
               </div>
            </div>
            
            <div className="grid gap-2 text-left">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className={focusedInput === 'password' ? 'text-white' : 'text-neutral-400'}>Password</Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-neutral-400 hover:text-white hover:underline transition-colors">
                        Forgot password?
                    </Link>
                </div>
               <div className="relative group">
                    <Input 
                        id="password" 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="current-password" 
                        disabled={isLoading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus:border-white/50 focus:bg-white/10 transition-all duration-300 rounded-lg"
                    />
                     <div className={`absolute left-3 top-2.5 pointer-events-none transition-colors duration-200 ${focusedInput === 'password' ? 'text-white' : 'text-neutral-500'}`}>
                        <Lock className="h-4 w-4" />
                    </div>
               </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 rounded-lg border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            <Button disabled={isLoading} className="w-full h-10 shadow-lg shadow-white/5 bg-white hover:bg-neutral-200 text-black border-0 font-medium" type="submit">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#050505] px-2 text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="outline" type="button" disabled={isLoading} className="w-full h-10 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
        
        <p className="text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-white hover:underline underline-offset-4 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
