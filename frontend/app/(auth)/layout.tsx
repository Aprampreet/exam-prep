
import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full">
          {/* Main gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      </div>

      <div className="w-full max-w-md relative z-10 px-4">
           {/* Logo Section */}
           <div className="flex flex-col items-center justify-center mb-8 gap-3">
              <div className="h-12 w-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/10 ring-1 ring-white/10">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">ExamPrep.</span>
           </div>

           {/* Glass Card */}
           <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 sm:p-8 ring-1 ring-white/5 relative overflow-hidden group">
               {/* Subtle gradient border effect */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
               
               {children}
           </div>

           {/* Footer Links */}
           <div className="mt-8 text-center text-xs text-muted-foreground/60 space-x-4">
              <Link href="#" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="#" className="hover:text-white/80 transition-colors">Terms of Service</Link>
           </div>
      </div>

    </div>
  );
}
