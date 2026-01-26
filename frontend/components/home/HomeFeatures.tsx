"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FeatureCard from "@/components/functions/FeatureCard";
import { BookOpen, Zap, TrendingUp, Brain, Target, Sparkles } from "lucide-react";

export function HomeFeatures() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={staggerContainer}
      className="py-20 border-b border-border/40 relative dark:bg-zinc-950/50"
    >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#80800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
             
        <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-16 max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary px-3 py-1 text-sm tracking-wide">features</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
            Everything you need to <span className="text-primary italic font-serif pr-2">Excel</span>
            </h2>
            <p className="text-muted-foreground text-xl font-normal leading-relaxed text-balance">
                We've broken down the science of high performance into a suite of powerful tools.
            </p>
        </motion.div>

        <Tabs defaultValue="learn" className="w-full max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-zinc-900/50 border border-border/50 p-1">
                <TabsTrigger value="learn">Learn</TabsTrigger>
                <TabsTrigger value="analyze">Analyze</TabsTrigger>
                <TabsTrigger value="succeed">Succeed</TabsTrigger>
            </TabsList>
            </motion.div>

            <TabsContent value="learn">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <motion.div variants={fadeInUp} className="lg:col-span-2">
                    <FeatureCard 
                        icon={<BookOpen className="h-6 w-6" />}
                        title="Comprehensive Material"
                        description="Thousands of detailed notes and video lectures curated by top rankers."
                        className="h-full"
                        gradient="from-blue-500/5 to-indigo-500/5"
                    />
                </motion.div>
                <motion.div variants={fadeInUp}>
                        <FeatureCard 
                        icon={<Zap className="h-6 w-6" />}
                        title="Offline Mode"
                        description="Download everything. Study on the subway or the moon."
                            gradient="from-emerald-500/5 to-green-500/5"
                    />
                </motion.div>
            </motion.div>
            </TabsContent>
            
            <TabsContent value="analyze">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <motion.div variants={fadeInUp} className="lg:col-span-2">
                    <FeatureCard 
                        icon={<TrendingUp className="h-6 w-6" />}
                        title="Real-time Analytics"
                        description="Live performance tracking with granular breakdown of every topic to pinpoint weakness."
                        gradient="from-violet-500/5 to-purple-500/5"
                        className="h-full"
                    />
                </motion.div>
                <motion.div variants={fadeInUp}>
                        <FeatureCard 
                        icon={<Brain className="h-6 w-6" />}
                        title="AI-Powered Learning"
                        description="Our neural engine adapts your schedule based on retention rates."
                            gradient="from-pink-500/5 to-rose-500/5"
                    />
                </motion.div>
            </motion.div>
            </TabsContent>

            <TabsContent value="succeed">
                <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                <motion.div variants={fadeInUp} className="lg:col-span-2">
                    <FeatureCard 
                        icon={<Target className="h-6 w-6" />}
                        title="24/7 Mentorship"
                        description="Instant doubt resolution from subject matter experts anytime, anywhere."
                            gradient="from-cyan-500/5 to-sky-500/5"
                            className="h-full"
                    />
                </motion.div>
                <motion.div variants={fadeInUp}>
                        <FeatureCard 
                        icon={<Sparkles className="h-6 w-6" />}
                        title="Minimalist Interface"
                        description="A brutalist, distraction-free environment for deep work."
                            gradient="from-amber-500/5 to-orange-500/5"
                    />
                </motion.div>
            </motion.div>
            </TabsContent>
        </Tabs>
        </div>
    </motion.section>
  );
}
