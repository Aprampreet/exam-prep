
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ArrowRight, Github, Mail, Phone, Lock } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await registerUser(email, password, phone);
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.detail || "Registration failed. Please check your details and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header */}
      <div className="flex flex-col space-y-1.5 text-center lg:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Create account
        </h2>
        <p className="text-neutral-400">
          Start your journey with ExamPrep today.
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-5">
            
            <div className="space-y-2">
               <Label htmlFor="email" className="text-sm font-medium text-neutral-300">Email address</Label>
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
                        className="pl-10 h-11 bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-neutral-900 focus:ring-0 transition-all duration-300 rounded-lg"
                        required
                    />
                    <div className="absolute left-3 top-3.5 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                        <Mail className="h-4 w-4" />
                    </div>
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="phone" className="text-sm font-medium text-neutral-300">Phone</Label>
               <div className="relative group">
                  <Input 
                        id="phone" 
                        placeholder="+1 (555) 000-0000" 
                        type="tel" 
                        autoCapitalize="none" 
                        autoComplete="tel" 
                        autoCorrect="off" 
                        disabled={isLoading}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setFocusedInput('phone')}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 h-11 bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-neutral-900 focus:ring-0 transition-all duration-300 rounded-lg"
                        required
                    />
                    <div className="absolute left-3 top-3.5 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                        <Phone className="h-4 w-4" />
                    </div>
               </div>
            </div>
            
            <div className="space-y-2">
               <Label htmlFor="password" className="text-sm font-medium text-neutral-300">Password</Label>
               <div className="relative group">
                   <Input 
                        id="password" 
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete="new-password" 
                        disabled={isLoading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-10 h-11 bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white focus:bg-neutral-900 focus:ring-0 transition-all duration-300 rounded-lg"
                        required
                    />
                     <div className="absolute left-3 top-3.5 pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                        <Lock className="h-4 w-4" />
                    </div>
               </div>
               <p className="text-[0.8rem] text-neutral-500">
                    Must be at least 8 characters long
                </p>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            <Button disabled={isLoading} className="w-full h-11 bg-white hover:bg-neutral-200 text-black border-0 font-medium transition-transform active:scale-[0.98]" type="submit">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Account
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" /> }
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#050505] px-2 text-neutral-600">
              Or
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
             <Button variant="outline" type="button" disabled={isLoading} className="w-full h-11 bg-neutral-900/50 border-neutral-800 text-white hover:bg-neutral-900 hover:text-white">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Github className="mr-2 h-4 w-4" />
              )}
              Sign up with GitHub
            </Button>
        </div>
        
        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white hover:underline transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}