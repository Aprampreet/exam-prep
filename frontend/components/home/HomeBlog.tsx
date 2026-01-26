"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export function HomeBlog() {
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
        className="py-20 bg-zinc-950/30 border-b border-border/40 relative"
    >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 center items-center justify-center">
                <div className="max-w-2xl flex flex-col center items-center justify-center">
                    <Badge variant="outline" className="mb-4 center  border-primary/20 bg-primary/5 text-primary">SCRIBEMIND ACADEMY</Badge>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">Master the Art of <span className="text-primary">Learning</span></h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Strategies from cognitive science to help you study smarter, not harder.
                    </p>
                </div>
                <Link href="/blog" >
                    <Button variant="ghost" className="hidden md:flex group hover:bg-primary/10 hover:text-primary">
                        View All Articles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full relative">
                    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                        <CarouselContent className="-ml-4">
                        {blogPosts.map((post, i) => (
                            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                                <Link href={`/blog/${post.slug}`} className="block h-full">
                                    <Card className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden flex flex-col h-full ring-1 ring-white/5">
                                        <div className="h-56 w-full relative overflow-hidden flex-shrink-0">
                                            <img 
                                                src={post.image} 
                                                alt={post.title} 
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                                            
                                            <Badge className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 backdrop-blur-md border-white/10 text-white font-medium tracking-wide">
                                                {post.category}
                                            </Badge>
                                        </div>
                                        
                                        <CardContent className="p-8 flex flex-col flex-1 relative -mt-12">
                                            <div className="text-xs font-bold text-muted-foreground mb-3 flex items-center gap-2">
                                                <div className="h-1 w-8 bg-primary/50 rounded-full"></div>
                                                <Clock className="h-3 w-3" /> {post.readTime}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">{post.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                                            
                                            <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-sm font-semibold text-foreground">
                                                <div className="flex -space-x-2">
                                                        {[...Array(3)].map((_, i) => (
                                                            <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] text-white/50">User</div>
                                                        ))}
                                                </div>
                                                <span className="flex items-center group-hover:translate-x-2 transition-transform text-primary">
                                                    Read Now <ArrowRight className="ml-2 h-4 w-4" />
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <div className="flex justify-end gap-2 mt-8 pr-4">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
            </motion.div>
        </div>
    </motion.section>
  );
}
