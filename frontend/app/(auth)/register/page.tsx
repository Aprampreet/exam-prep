
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ArrowRight, Github } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-2 text-center fade-in slide-in-from-bottom-4 duration-1000 animate-in">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create an account
      </h1>
      <p className="text-sm text-muted-foreground pb-6">
        Enter your details to create your account
      </p>

      <form onSubmit={onSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
           <Label htmlFor="email">Email</Label>
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
                className="h-11 bg-secondary/20"
                required
            />
        </div>

        <div className="space-y-2">
           <Label htmlFor="phone">Phone Number</Label>
           <Input 
                id="phone" 
                placeholder="+1234567890" 
                type="tel" 
                autoCapitalize="none" 
                autoComplete="tel" 
                autoCorrect="off" 
                disabled={isLoading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 bg-secondary/20"
                required
            />
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
           <Input 
                id="password" 
                placeholder="••••••••" 
                type="password" 
                autoComplete="new-password" 
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-secondary/20"
                required
            />
        </div>

        {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-4 w-4" />
                {error}
            </div>
        )}

        <Button disabled={isLoading} className="w-full h-11 text-base group">
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
        </Button>
      </form>

      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

       <Button variant="outline" type="button" disabled={isLoading} className="h-11 w-full relative">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        GitHub
         <div className="absolute top-0 right-0 -mt-1 -mr-1">
             <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
        </div>
      </Button>
      
      <p className="px-8 text-center text-sm text-muted-foreground pt-4">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary font-medium text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  );
}