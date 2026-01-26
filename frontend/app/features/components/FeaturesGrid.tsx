"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Search, Layers } from "lucide-react";

export function FeaturesGrid() {
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
         <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-12 text-center"
        >
            And so much more...
        </motion.h2>
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            <motion.div variants={itemVariants}>
                <SmallFeatureCard 
                    icon={<Brain className="w-5 h-5 text-indigo-500" />}
                    title="Adaptive Difficulty"
                    desc="Questions get harder as you get better, keeping you in the flow state."
                />
            </motion.div>
            <motion.div variants={itemVariants}>
                <SmallFeatureCard 
                    icon={<Search className="w-5 h-5 text-indigo-500" />}
                    title="Semantic Search"
                    desc="Find any concept in your uploaded documents instantly using natural language."
                />
            </motion.div>
            <motion.div variants={itemVariants}>
                <SmallFeatureCard 
                    icon={<Layers className="w-5 h-5 text-indigo-500" />}
                    title="Multi-Session Management"
                    desc="Keep different subjects organized in separate, isolated workspaces."
                />
            </motion.div>
        </motion.div>
      </section>
    );
}

function SmallFeatureCard({ icon, title, desc }: any) {
    return (
        <Card className="bg-muted/20 border-border/50 hover:bg-muted/40 transition-colors">
            <CardContent className="p-6">
                <div className="mb-4 bg-background p-2 w-fit rounded-lg shadow-sm border border-border/50">
                    {icon}
                </div>
                <h4 className="font-bold mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
        </Card>
    )
}
