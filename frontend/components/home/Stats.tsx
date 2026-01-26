'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import { Activity, TrendingUp, Trophy, Star } from "lucide-react"
import Counter from "@/components/functions/counter"

export function Stats() {
  return (
        <section className="relative py-20 border-b border-border/40">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { value: 50, suffix: "k+", label: "Active Students", icon: <Activity className="h-4 w-4 mb-2 text-primary" /> },
                    { value: 1, suffix: "M+", label: "Questions Solved", icon: <TrendingUp className="h-4 w-4 mb-2 text-indigo-500" /> },
                    { value: 95, suffix: "%", label: "Success Rate", icon: <Trophy className="h-4 w-4 mb-2 text-amber-500" /> },
                    { value: 4.9, suffix: "", label: "Average Rating", decimals: 1, icon: <Star className="h-4 w-4 mb-2 text-yellow-500" /> },
                ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                    <Card
                    className="group relative overflow-hidden text-center hover:-translate-y-1 transition-all duration-300 border-border/50 bg-zinc-950/40 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg h-full"
                    >
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                        <CardContent className="pt-8 pb-6 flex flex-col items-center">
                            {stat.icon}
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-1 tabular-nums">
                              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                            </h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                            {stat.label}
                            </p>
                        </CardContent>
                    </Card>
                    </motion.div>
                ))}
                </div>
            </div>
        </section>
  )
}
