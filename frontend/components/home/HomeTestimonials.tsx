"use client";

import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TestimonialCard from "@/components/functions/TestimonialCard";

export function HomeTestimonials() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 overflow-hidden relative border-b border-border/40"
    >
        <div className="container mx-auto px-4">
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-foreground mb-6">Loved by top performers</h2>
                <p className="text-lg text-muted-foreground text-balance">
                    Join thousands of students who have transformed their grades.
                </p>
            </div>
            
            <div className="max-w-7xl mx-auto">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="h-full">
                                <TestimonialCard 
                                    name="Alex Chen" 
                                    role="Medical Entrance Topper" 
                                    quote="The analytics are frighteningly accurate. It detected my Organic Chemistry weakness two weeks before I noticed it."
                                    rating={5}
                                />
                            </div>
                        </CarouselItem>
                            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="h-full">
                                <TestimonialCard 
                                    name="Sarah Johnson" 
                                    role="Civil Services Aspirant" 
                                    quote="No ads, no distractions. Just pure learning. My focus time increased by 40% in the first month alone."
                                    highlight
                                    rating={5}
                                />
                            </div>
                        </CarouselItem>
                            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="h-full">
                                <TestimonialCard 
                                    name="Rahul Gupta" 
                                    role="Engineering Student" 
                                    quote="It's like having a personal AI coach who knows exactly what I can handle. This changed my entire study approach."
                                    rating={5}
                                />
                            </div>
                        </CarouselItem>
                        <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="h-full">
                                <TestimonialCard 
                                    name="Emily Davis" 
                                    role="Law Student" 
                                    quote="The offline mode is a lifesaver. I can study on my commute without worrying about data."
                                    rating={5}
                                />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-8 pr-4">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                        </div>
                </Carousel>
            </div>
        </div>
    </motion.section>
  );
}
