
'use client';

import { Card, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Star } from "lucide-react";

export default function TestimonialCard({ name, role, quote, highlight, rating, className }: { name: string, role: string, quote: string, highlight?: boolean, rating: number, className?: string }) {
    return (
        <Card className={`border-border/50 p-8 relative hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-card/50 backdrop-blur-sm'} ${className}`}>
            {highlight && <div className="absolute top-0 right-0 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-bl-xl">TOP PICK</div>}
            
            <div className="mb-6">
                 <div className="flex gap-1 mb-4">
                     {[...Array(rating)].map((_, i) => (
                         <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                     ))}
                 </div>
                <div className="relative">
                    <Quote className="h-8 w-8 text-primary/10 absolute -top-2 -left-2 transform -scale-x-100" />
                    <p className="text-lg text-foreground/90 leading-relaxed italic relative z-10 pl-4">"{quote}"</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 border-t border-border/50 pt-6 mt-auto">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shadow-inner ${highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-foreground text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{role}</p>
                </div>
            </div>
        </Card>

    )
}
