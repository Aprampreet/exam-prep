
import React from 'react';
import Link from 'next/link';
import { GraduationCap, Star, ShieldCheck, Zap } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      
      {/* Left Side - Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-black relative flex-col justify-between p-12 overflow-hidden border-r border-white/10">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
             <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '4s' }} />
             <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[100px] opacity-30" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
           <div className="flex items-center gap-2 font-bold text-2xl text-white">
              <div className="h-10 w-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="h-5 w-5" />
              </div>
              ExamPrep.
           </div>
           
           <div className="mt-20 space-y-8">
               <div className="space-y-2">
                   <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
                       Master your exams <br/> with confidence.
                   </h2>
                   <p className="text-lg text-white/60 max-w-md">
                       Join thousands of students who are acing their tests using our AI-powered study tools.
                   </p>
               </div>

               <div className="grid grid-cols-1 gap-4 pt-4">
                   {[
                       { icon: Zap, label: "AI-Powered Learning", text: "Personalized study paths adapted to you." },
                       { icon: ShieldCheck, label: "Verified Content", text: "Study materials you can trust." },
                       { icon: Star, label: "Track Progress", text: "See your improvement in real-time." }
                   ].map((item, i) => (
                       <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                           <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                               <item.icon className="h-5 w-5 text-white" />
                           </div>
                           <div>
                               <h3 className="font-semibold text-white">{item.label}</h3>
                               <p className="text-sm text-white/50">{item.text}</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
        </div>

        <div className="relative z-10 pt-12">
            <div className="flex items-center justify-between text-xs text-white/40">
                <p>© 2024 ExamPrep Inc.</p>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
        </div>

      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-12 relative bg-background">
          <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
          </div>
          
          <div className="w-full max-w-[420px] relative z-10">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-8">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
                    <GraduationCap className="h-6 w-6" />
                </div>
              </div>

             {children}
          </div>
      </div>
    </div>
  );
}
