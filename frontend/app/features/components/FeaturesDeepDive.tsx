"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, CheckCircle2, BarChart3 } from "lucide-react";

export function FeaturesDeepDive() {
  return (
    <section className="py-24 container mx-auto px-4 max-w-7xl space-y-32">
        
        {/* Feature 1: The AI Tutor Chat (Left Image, Right Text) */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
        >
            <div className="flex-1 w-full relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b bg-muted/50 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                        <div className="w-3 h-3 rounded-full bg-green-400/50" />
                    </div>
                    <div className="p-6 flex-1 bg-neutral-950/5 relative">
                        {/* Mock Chat UI */}
                        <div className="space-y-4 max-w-sm mx-auto mt-4 text-sm font-medium">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-muted p-3 rounded-lg rounded-tl-none w-fit max-w-[80%]"
                            >
                                Explain the concept of Quantum Entanglement from page 42.
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="bg-primary/10 text-primary p-3 rounded-lg rounded-tr-none w-fit ml-auto border border-primary/20 max-w-[90%] shadow-sm"
                            >
                                Based on your notes, Quantum Entanglement is described as...
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    <span>Context-Aware RAG</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Chat with your Data.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Gone are the days of Ctrl+F. Our AI understands the semantic meaning of your documents. You can ask conceptual questions, request summaries, or ask for examples, and clear doubts instantly without leaving the platform.
                </p>
                <div className="space-y-3">
                    <FeatureCheck text="Context Retention: Remembers previous questions." />
                    <FeatureCheck text="Source Citations: Tells you exactly where info came from." />
                    <FeatureCheck text="Persona Tuning: Acts as a patient tutor." />
                </div>
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20"
        >
            <div className="flex-1 w-full relative group">
                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col p-8 items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <div className="col-span-1 h-32 bg-primary/5 rounded-lg border border-primary/10 p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-primary/20" />
                            <div className="h-2 w-1/2 bg-primary/20 rounded" />
                        </div>
                         <div className="col-span-1 h-32 bg-primary/5 rounded-lg border border-primary/10 p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-primary/20" />
                            <div className="h-2 w-3/4 bg-primary/20 rounded" />
                        </div>
                        <div className="col-span-2 h-16 bg-primary/10 rounded-lg border border-primary/20 p-4 flex items-center">
                            <div className="flex-1 space-y-2">
                                <div className="h-2 w-full bg-primary/20 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    <span>Dynamic Assessment</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Tests that actually teach.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    We don't just ask random questions. We generate high-quality Multiple Choice (MCQ) and Short Answer questions derived directly from your study material, ensuring you are prepared for the real deal.
                </p>
                <div className="space-y-3">
                    <FeatureCheck text="Auto-Grading: Instant scores for all question types." />
                    <FeatureCheck text="Constructive Feedback: Explains why an answer is wrong." />
                    <FeatureCheck text="Short Answer Evaluation: AI grades your written responses." />
                </div>
            </div>
        </motion.div>

        {/* Feature 3: Smart Analytics (Left Image, Right Text) */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
        >
            <div className="flex-1 w-full relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden flex items-center justify-center">
                    {/* Abstract Chart UI */}
                    <div className="flex items-end gap-3 h-40">
                         <div className="w-8 bg-emerald-500/20 h-[40%] rounded-t-sm" />
                         <div className="w-8 bg-emerald-500/40 h-[60%] rounded-t-sm" />
                         <div className="w-8 bg-emerald-500/60 h-[30%] rounded-t-sm" />
                         <div className="w-8 bg-emerald-500 h-[80%] rounded-t-sm shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                         <div className="w-8 bg-emerald-500/30 h-[50%] rounded-t-sm" />
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
                    <BarChart3 className="w-4 h-4" />
                    <span>Performance Intelligence</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Uncover your Blind Spots.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Traditional studying leaves you guessing what you know. Our dashboard visualizes your mastery level across different topics, showing you exactly where to focus your efforts next.
                </p>
                <div className="space-y-3">
                    <FeatureCheck text="Topic-Level Mastery: See which chapters need work." />
                    <FeatureCheck text="Trend Analysis: Watch your accuracy improve over time." />
                    <FeatureCheck text="AI Insights: Get textual revision strategies based on data." />
                </div>
            </div>
        </motion.div>
      </section>
  );
}

function FeatureCheck({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
             <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <CheckCircle2 className="w-3.5 h-3.5" />
             </div>
             <span className="font-medium text-muted-foreground">{text}</span>
        </div>
    )
}
