import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Target, Zap } from "lucide-react";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-primary/20 bg-primary/5 text-primary">
            Our Mission
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Empowering Every Student to <br className="hidden md:block" /> Achieve Excellence
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            We believe that with the right tools and guidance, anyone can master any subject. ScribeMind is built to be your intelligent study companion.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<Target className="h-6 w-6 text-blue-500" />}
              title="Precision"
              description="Targeted practice questions that adapt to your learning pace and style."
              delay="delay-0"
            />
             <ValueCard 
              icon={<Zap className="h-6 w-6 text-amber-500" />}
              title="Speed"
              description="Accelerate your learning curve with AI-driven insights and instant feedback."
              delay="delay-100"
            />
             <ValueCard 
              icon={<Users className="h-6 w-6 text-emerald-500" />}
              title="Community"
              description="Join a growing community of learners committed to academic success."
              delay="delay-200"
            />
             <ValueCard 
              icon={<GraduationCap className="h-6 w-6 text-purple-500" />}
              title="Mastery"
              description="Focus on deep understanding rather than just memorizing facts."
              delay="delay-300"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-bold">Our Story</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Started by a group of passionate educators and engineers, ScribeMind was born out of frustration with one-size-fits-all study methods. We saw students struggling not because they lacked ability, but because they lacked personalized guidance.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        We combined advanced AI technology with proven pedagogical principles to create a platform that understands you. Whether you're preparing for college entrance exams or professional certifications, ScribeMind adapts to your needs.
                    </p>
                </div>
                <div className="flex-1 relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center relative overflow-hidden">
                        <Image 
                           src="/feature_ai_tutor.png" 
                           alt="Fusion of AI and Learning" 
                           fill
                           className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
    return (
        <Card className={`border-none shadow-lg bg-background/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700 ${delay} hover:translate-y-[-4px] transition-transform`}>
            <CardContent className="pt-6">
                <div className="mb-4 p-3 bg-muted rounded-xl w-fit">
                    {icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
