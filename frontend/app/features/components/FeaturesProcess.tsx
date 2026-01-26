"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, Zap, TrendingUp } from "lucide-react";

export function FeaturesProcess() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.2
          }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1, 
          transition: { duration: 0.5 } 
        }
    };

    return (
        <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground">Four simple steps to upgrade your learning workflow.</p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
            >
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-muted-foreground/20 via-primary/20 to-muted-foreground/20 -z-10" />

                <motion.div variants={itemVariants}>
                    <ProcessStep 
                        number="01"
                        icon={<Upload className="w-6 h-6 text-white" />}
                        title="Upload Material"
                        description="Drop your PDFs, lecture notes, or textbooks. We support multiple formats."
                        color="bg-blue-500"
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <ProcessStep 
                        number="02"
                        icon={<Cpu className="w-6 h-6 text-white" />}
                        title="AI Processing"
                        description="Our engine chunks, embeds, and analyzes your content to build a knowledge graph."
                        color="bg-purple-500"
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                     <ProcessStep 
                        number="03"
                        icon={<Zap className="w-6 h-6 text-white" />}
                        title="Active Recall"
                        description="Practice with auto-generated MCQs and Short Answer questions specifically targeting key concepts."
                        color="bg-amber-500"
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                     <ProcessStep 
                        number="04"
                        icon={<TrendingUp className="w-6 h-6 text-white" />}
                        title="Analytics Loop"
                        description="We identify weak spots and adapt the next set of questions to bridge the gaps."
                        color="bg-emerald-500"
                    />
                </motion.div>
            </motion.div>
        </div>
      </section>
    );
}

function ProcessStep({ number, icon, title, description, color }: any) {
    return (
        <div className="flex flex-col items-center text-center relative z-10">
            <div className={`w-14 h-14 ${color} rounded-2xl shadow-lg flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300 ring-4 ring-background`}>
                {icon}
            </div>
            <div className="mb-2 text-sm font-bold text-muted-foreground tracking-widest">STEP {number}</div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">{description}</p>
        </div>
    )
}
