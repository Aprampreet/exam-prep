"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HomeFAQ() {
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
        className="py-20 max-w-3xl mx-auto px-4 bg-transparent"
    >
        <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4  text-muted-foreground">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-center text-foreground">Common Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border/60">
            <AccordionTrigger className="text-lg md:text-xl font-medium hover:no-underline hover:text-primary transition-colors py-6 text-foreground/90">How does the AI study plan work?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-2 pb-6">
                Our AI analyzes your initial assessment and ongoing performance to create a dynamic study schedule that adapts to your learning speed and retention. It constantly recalibrates based on your quiz scores.
            </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-border/60">
            <AccordionTrigger className="text-lg md:text-xl font-medium hover:no-underline hover:text-primary transition-colors py-6 text-foreground/90">Can I access content offline?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-2 pb-6">
                Yes! You can download video lectures and notes for offline access via our mobile app, perfect for studying on the go or in low-connectivity areas.
            </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-border/60">
            <AccordionTrigger className="text-lg md:text-xl font-medium hover:no-underline hover:text-primary transition-colors py-6 text-foreground/90">Is there a money-back guarantee?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-2 pb-6">
                We offer a 7-day no-questions-asked refund policy if you are not satisfied with our premium plans. No hidden clauses.
            </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-border/60">
            <AccordionTrigger className="text-lg md:text-xl font-medium hover:no-underline hover:text-primary transition-colors py-6 text-foreground/90">Can I switch plans later?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-2 pb-6">
                Absolutely. You can upgrade or downgrade your plan at any time. The difference will be pro-rated.
            </AccordionContent>
            </AccordionItem>
        </Accordion>
    </motion.section>
  );
}
