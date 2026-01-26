'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
        <section className="py-20 relative overflow-hidden border-t border-border/50">

          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] z-0"></div>
          
          <div className="container mx-auto px-4 text-center z-20 relative">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-foreground text-balance"
            >
              Ready to top the ranks?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto font-light"
            >
              Join 50,000+ high achievers. Your journey to excellence begins with a single click.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-col sm:flex-row justify-center gap-5"
            >
               <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground border-t border-white/20">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold rounded-full border-border hover:bg-muted/50 bg-background/50 backdrop-blur-md">
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </section>
  )
}
