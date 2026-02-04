
import React from 'react';
import Link from 'next/link';
import { GraduationCap, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex relative bg-[#050505] overflow-hidden selection:bg-white/20 selection:text-white">

      {/* 
        UNIFIED BACKGROUND
      */}
      <div className="absolute inset-0 w-full h-full">
           {/* Subtle Noise Texture for premium feel */}
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
           
           {/* Base Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
           
           {/* Soft Ambient Glows (Monochrome) */}
           <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Hero Content */}
        <div className="hidden lg:flex flex-col justify-between py-16 px-12">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 bg-white text-black rounded-lg flex items-center justify-center shadow-lg shadow-white/10">
                 <GraduationCap className="h-5 w-5" />
               </div>
               <span className="font-bold text-2xl text-white tracking-tight">ExamPrep.</span>
            </div>

            <div className="space-y-8 max-w-lg">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-[1.15]">
                  Master your exams <br />
                  <span className="text-neutral-400">
                    with confidence.
                  </span>
                </h1>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-300">
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                            <BookOpen className="h-4 w-4" />
                        </div>
                        <p className="text-sm">Personalized AI study schedules</p>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-sm">Verified expert notes & content</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 text-xs text-neutral-500 font-medium">
               <p>© 2024 ExamPrep Inc.</p>
               <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
               <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-6 lg:p-12 relative">
             {/* 
                Visual Divider Line for Desktop 
                (Subtle separation instead of hard cut)
             */}
             <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block"></div>

             {/* Form Container - Floating, no hard card borders to blend better */}
             <div className="w-full max-w-[400px] space-y-8">
                 {/* Mobile Logo */}
                 <div className="lg:hidden flex justify-center mb-8">
                     <div className="h-10 w-10 bg-white text-black rounded-lg flex items-center justify-center shadow-lg">
                        <GraduationCap className="h-5 w-5" />
                     </div>
                 </div>

                 {children}
             </div>
        </div>

      </div>
    </div>
  );
}
