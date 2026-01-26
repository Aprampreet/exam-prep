'use client';

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function FeatureCard({ icon, title, description, className, gradient }: { icon: React.ReactNode, title: string, description: string, className?: string, gradient?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`h-full ${className}`}
    >
    <Card className={`group relative overflow-hidden border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:border-primary/20 hover:shadow-xl h-full`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-primary/5 via-transparent to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        
      <CardHeader className="relative z-10">
        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-indigo-500/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/10 group-hover:border-primary/20 shadow-sm">
          {icon}
        </div>
        <CardTitle className="text-xl mb-3 font-bold group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{description}</CardDescription>
      </CardHeader>
    </Card>
    </motion.div>
  )
}