'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Zap, BookOpen, TrendingUp, Target, Trophy } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden border-b border-border/40">

          <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-5xl z-10 relative">
            
            <div className="group relative inline-flex items-center rounded-full border border-primary/20 bg-background/50 px-6 py-2 text-sm font-medium text-foreground mb-10 overflow-hidden backdrop-blur-md hover:bg-primary/5 hover:border-primary/30 transition-all cursor-default">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-semibold mr-1">New:</span> 
              <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">Advanced Weakness Detection</span>
              <ChevronRight className="ml-1 h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent translate-y-[1px]" />
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.7 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground drop-shadow-sm"
            >
              Master Your Exams<br />
              <span className="bg-gradient-to-b from-primary via-indigo-500 to-indigo-600 bg-clip-text text-transparent pb-4">
                With Precision.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl leading-relaxed font-normal text-balance"
            >
              The elite platform trusted by <span className="font-semibold text-foreground">50,000+ students</span>. 
              We turn your study data into a competitive advantage using advanced AI.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            >
              <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-1 transition-all bg-primary hover:bg-primary/90 text-primary-foreground border-t border-white/20">
                <Link href="/register">Start Free Trial</Link> <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-full border-zinc-900 dark:border-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors dark:bg-zinc-950/50 backdrop-blur-sm text-foreground">
                View Pricing
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-36 relative w-full max-w-6xl mx-auto z-20"
            >
                <div className="rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md p-2 shadow-2xl shadow-indigo-500/20 ring-1 ring-white/10">
                     <div className="rounded-lg overflow-hidden relative bg-zinc-950 aspect-[16/10] md:aspect-[21/9] flex">
                         <div className="w-12 md:w-20 border-r border-white/10 flex flex-col items-center py-6 gap-6 bg-zinc-900/50 flex-shrink-0">
                             <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4"><Zap className="h-5 w-5" /></div>
                             <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground"><BookOpen className="h-4 w-4" /></div>
                             <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground"><TrendingUp className="h-4 w-4" /></div>
                             <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground"><Target className="h-4 w-4" /></div>
                         </div>
                         
                         <div className="flex-1 flex flex-col min-w-0">
                             <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-zinc-900/30">
                                 <div className="flex items-center gap-2">
                                     <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                                     <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                                     <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                      <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                                 </div>
                             </div>
                             
                             <div className="p-4 md:p-6 grid grid-cols-12 gap-6 h-full overflow-hidden">
                                 <div className="col-span-12 md:col-span-8 flex flex-col gap-4 md:gap-6">
                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                         {[
                                             { label: "Focus Score", val: "92%", color: "text-emerald-400" },
                                             { label: "Questions", val: "1.2k", color: "text-blue-400" },
                                             { label: "Accuracy", val: "88%", color: "text-purple-400" },
                                             { label: "Streak", val: "12d", color: "text-orange-400" }
                                         ].map((s, i) => (
                                             <div key={i} className="h-16 md:h-20 rounded-xl border border-white/5 bg-white/[0.02] p-3 flex flex-col justify-between">
                                                 <div className="h-1.5 w-8 md:w-12 bg-white/10 rounded-full"></div>
                                                 <div className={`text-lg md:text-xl font-bold ${s.color}`}>{s.val}</div>
                                             </div>
                                         ))}
                                     </div>
                                     
                                     <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 min-h-0 overflow-y-auto md:overflow-hidden">
                                         <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 relative overflow-hidden flex flex-col h-32 md:h-auto">
                                             <div className="flex justify-between items-center mb-4">
                                                 <div className="h-3 w-24 bg-white/10 rounded-full"></div>
                                             </div>
                                             <div className="flex-1 relative w-full">
                                                <svg className="w-full h-full absolute bottom-0 left-0 overflow-visible" preserveAspectRatio="none">
                                                    <path d="M0,80 C50,60 100,90 150,40 S250,50 300,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                                                    <path d="M0,80 C50,60 100,90 150,40 S250,50 300,20 L300,100 L0,100 Z" fill="url(#gradient)" opacity="0.1" />
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                                            <stop offset="0%" stopColor="rgb(99 102 241)" />
                                                            <stop offset="100%" stopColor="transparent" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                             </div>
                                         </div>

                                         <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col h-32 md:h-auto">
                                            <div className="h-3 w-28 bg-white/10 rounded-full mb-4"></div>
                                            <div className="grid grid-cols-4 gap-2 flex-1">
                                                {[...Array(16)].map((_, i) => (
                                                    <div key={i} className={`rounded-md ${[2,5,11,14].includes(i) ? 'bg-red-500/20 border border-red-500/30' : 'bg-emerald-500/5 border border-emerald-500/10'}`}></div>
                                                ))}
                                            </div>
                                         </div>
                                     </div>
                                 </div>
                                 
                                 <div className="hidden md:flex md:col-span-4 border-l border-white/10 pl-6 flex-col gap-6">
                                      <div className="h-28 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-4 flex flex-row items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40"><Trophy className="h-6 w-6 text-white" /></div>
                                            <div>
                                                <div className="text-sm font-bold text-white">Top 10%</div>
                                                <div className="text-xs text-indigo-300">Global Rank #402</div>
                                            </div>
                                      </div>

                                      <div className="space-y-4 flex-1">
                                          <div className="h-3 w-20 bg-white/10 rounded-full mb-2"></div>
                                          <div className="flex items-end justify-between h-32 px-2 pb-2 border-b border-white/10">
                                              {[40, 70, 45, 90, 60, 80].map((h, i) => (
                                                  <div key={i} className="w-2 rounded-t-sm bg-primary/40 hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                                              ))}
                                          </div>
                                      </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-xl blur-[80px] opacity-10 -z-10"></div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="mt-24"
            >
                 <p className="text-sm font-semibold tracking-widest text-muted-foreground/60 uppercase mb-8">Trusted by Top Scholars From</p>
                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                     {["Harvard", "MIT", "Stanford", "Oxford", "IIT-B"].map((uni) => (
                         <span key={uni} className="text-xl md:text-2xl font-bold font-serif text-foreground/80 hover:text-primary transition-colors cursor-default">{uni.toUpperCase()}</span>
                     ))}
                 </div>
            </motion.div>
          </div>
        </section>
  )
}
