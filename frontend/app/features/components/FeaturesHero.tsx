"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function FeaturesHero() {
  return (
    <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 text-center overflow-hidden"
      >
         <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" 
         />
         <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
                <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 transition-colors rounded-full">
                    <Sparkles className="w-3 h-3 mr-2" />
                    Intelligent Study Ecosystem
                </Badge>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-tight">
                From Raw Notes to <br className="hidden md:block" /> 
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Complete Mastery</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
                A complete walkthrough of how ScribeMind transforms your study materials into an active learning engine.
            </motion.p>
         </div>
      </motion.section>
  );
}
