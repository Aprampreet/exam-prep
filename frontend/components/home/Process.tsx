'use client';

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Trophy } from "lucide-react"

export function Process() {
  return (
    <section className="py-20 relative overflow-hidden">

             <div className="container mx-auto px-4 relative z-10">
                 <div className="max-w-6xl mx-auto bg-zinc-900/20 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"></div>

                     <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
                         <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary px-3 py-1 text-sm tracking-wide">THE PROCESS</Badge>
                         <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">From <span className="text-muted-foreground line-through decoration-red-500/50 decoration-4">Chaos</span> to <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">Clarity</span></h2>
                         <p className="text-xl text-muted-foreground/80 leading-relaxed">
                            A unified ecosystem designed to streamline your path to the top. All your needs, in one place.
                         </p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                         <div className="absolute top-[3.5rem] left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent hidden md:block">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                         </div>
                         
                         {[
                             { 
                                title: "Connect", 
                                subtitle: "Centralize Your Data",
                                desc: "Sync past scores, notes, and study material into one unified dashboard.", 
                                icon: <Zap className="h-6 w-6 text-white" />,
                                color: "bg-amber-500"
                            },
                             { 
                                title: "Analyze", 
                                subtitle: "AI-Powered Insights",
                                desc: "Our neural engine pinpoints weak topics and forgetting curves instantly.", 
                                icon: <Brain className="h-6 w-6 text-white" />,
                                color: "bg-indigo-500"
                            },
                             { 
                                title: "Conquer", 
                                subtitle: "Personalized Action",
                                desc: "Execute a daily plan tailored to ensure 99% retention and mastery.", 
                                icon: <Trophy className="h-6 w-6 text-white" />,
                                color: "bg-emerald-500"
                            }
                         ].map((step, i) => (
                             <motion.div 
                               initial={{ opacity: 0, y: 30 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: false }}
                               transition={{ duration: 0.5, delay: i * 0.2 }}
                               key={i} 
                               className="relative flex flex-col items-center text-center group"
                             >
                                 {/* Step Icon Bubble */}
                                 <div className={`relative w-28 h-28 rounded-full ${step.color} p-1 mb-8 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                     <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent"></div>
                                     <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center border-4 border-zinc-900 relative overflow-hidden">
                                          <div className={`absolute inset-0 opacity-20 ${step.color} blur-md group-hover:opacity-40 transition-opacity`}></div>
                                          {step.icon}
                                     </div>
                                     {/* Number Tag */}
                                     <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-md font-bold shadow-lg">
                                         {i + 1}
                                     </div>
                                 </div>

                                 <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                                 <span className="text-xs font-bold tracking-widest text-primary/80 uppercase mb-4 block">{step.subtitle}</span>
                                 <p className="text-muted-foreground leading-relaxed max-w-xs">{step.desc}</p>
                             </motion.div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>
  )
}
