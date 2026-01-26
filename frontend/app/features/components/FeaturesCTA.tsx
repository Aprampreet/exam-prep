"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export function FeaturesCTA() {
    return (
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 text-center mt-12 bg-gradient-to-b from-transparent to-muted/20 border-t border-border/50"
      >
          <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-6">Ready to stop studying hard<br/>and start studying smart?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                   <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Data Privacy Guaranteed</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border shadow-sm">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Powered by Gemini AI</span>
                   </div>
              </div>
          </div>
      </motion.section>
    );
}
