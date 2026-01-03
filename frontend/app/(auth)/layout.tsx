
import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background selection:bg-primary selection:text-primary-foreground">
      
      {/* Centered Auth Container */}
      <div className="w-full max-w-[400px] p-4 md:p-8">
           
           {/* Logo */}
           <div className="flex items-center justify-center mb-8 gap-2 font-bold text-2xl">
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              ExamPrep.
           </div>

           {children}

           <p className="px-8 text-center text-sm text-muted-foreground mt-8">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
      </div>
    </div>
  );
}
