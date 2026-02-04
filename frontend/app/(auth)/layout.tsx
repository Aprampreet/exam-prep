
import React from 'react';
import Link from 'next/link';
import { GraduationCap, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex relative bg-black overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* 
        UNIFIED BACKGROUND FOR ENTIRE SCREEN 
        (Solves the 'partition' issue by having one continuous space)
      */}
      <div className="absolute inset-0 w-full h-full bg-neutral-950">
           {/* Technical Base Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           
           {/* Larger Grid Accents */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:120px_120px]"></div>
           
           {/* Subtle ambient light from bottom right to add some life without overwhelming gradients */}
           <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(50,50,80,0.15)_0%,transparent_70%)] pointer-events-none"></div>
      </div>

      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Hero Content (Floating on Grid) */}
        <div className="hidden lg:flex flex-col justify-between py-12 px-8">
            <div className="flex items-center gap-2 font-bold text-2xl text-white">
               <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-md">
                 <GraduationCap className="h-5 w-5" />
               </div>
               ExamPrep.
            </div>

            <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                  Ace your exams <br />
                  <span className="text-white">
                    in record time.
                  </span>
                </h1>
                <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
                  Join a community of high achievers using AI-powered study schedules, verified notes, and adaptive testing.
                </p>
                
                <div className="flex gap-4 pt-4">
                   <div className="flex -space-x-4">
                      {[1,2,3,4].map((i) => (
                         <div key={i} className="h-10 w-10 rounded-full border-2 border-neutral-950 bg-neutral-800 flex items-center justify-center text-[10px] text-white font-medium shadow-lg">
                            <span className="sr-only">User {i}</span>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
                         </div>
                      ))}
                   </div>
                   <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => <Sparkles key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />)}
                      </div>
                      <span className="text-xs text-neutral-400 font-medium">Trusted by 10,000+ students</span>
                   </div>
                </div>
            </div>

            <div className="flex gap-6 text-sm text-neutral-500">
               <p>© 2024 ExamPrep Inc.</p>
               <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
               <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
        </div>

        {/* Right Side - Form (Centered in its half) */}
        <div className="flex items-center justify-center py-12 px-4 sm:px-8">
             {/* The Glass Card */}
             <div className="w-full max-w-[420px] bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative group">
                 {/* Internal Gradient Border Glow */}
                 <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"></div>
                 
                 {/* Glow effect behind card on hover (very subtle) */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                 
                 <div className="relative">
                    {/* Mobile Logo Only */}
                    <div className="lg:hidden flex justify-center mb-8">
                         <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-md">
                            <GraduationCap className="h-6 w-6" />
                         </div>
                    </div>
                    
                    {children}
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
}
