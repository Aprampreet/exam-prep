
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ArrowRight, Github, Mail } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-col space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={onSubmit}>
          <div className="grid gap-5">
            <div className="grid gap-2">
               <Label htmlFor="email" className={focusedInput === 'email' ? 'text-primary' : ''}>Email</Label>
               <div className="relative">
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
                        className="h-11 pl-10 bg-secondary/30 border-transparent focus:border-primary/50 focus:bg-background transition-all duration-300"
                    />
                    <div className="absolute left-3 top-3 text-muted-foreground pointer-events-none">
                        <Mail className="h-5 w-5 opacity-50" />
                    </div>
               </div>
            </div>
            
            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className={focusedInput === 'password' ? 'text-primary' : ''}>Password</Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80 hover:underline">
                        Forgot password?
                    </Link>
                </div>
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
                    className="h-11 bg-secondary/30 border-transparent focus:border-primary/50 focus:bg-background transition-all duration-300"
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg animate-in fade-in slide-in-from-top-1 border border-destructive/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            <Button disabled={isLoading} className="w-full h-11 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-0.5" type="submit">
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
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button variant="outline" type="button" disabled={isLoading} className="h-11 w-full bg-background hover:bg-secondary/50 border-input hover:text-foreground">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline underline-offset-4 transition-colors">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
