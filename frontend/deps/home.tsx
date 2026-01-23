
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Layout, Library, Trophy, Zap, Star, Quote } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 flex flex-col items-center justify-center min-h-[80vh] border-b border-border">
          
          <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-5xl z-10">
            <div className="inline-flex items-center rounded-full border border-primary/50 bg-background px-4 py-1.5 text-sm font-medium text-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              New: AI-Powered Study Plans 2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both text-foreground">
              Master Your Exams <br />
              <span className="text-muted-foreground">
                With Precision.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              The elite platform for competitive exam preparation. Use AI to analyze your weak spots and turn them into your biggest strengths.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-sm transition-transform hover:scale-105">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-border hover:bg-secondary transition-colors">
                Explore Syllabus
              </Button>
            </div>

            {/* Social Proof/Trusted By */}
            <div className="mt-24 pt-8 border-t border-border w-full animate-in fade-in duration-1000 delay-500">
                <p className="text-sm text-muted-foreground mb-6 font-medium tracking-widest uppercase">Trusted by 50,000+ Students from</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-bold font-serif text-foreground">HARVARD</span>
                    <span className="text-xl font-bold font-mono text-foreground">MIT</span>
                    <span className="text-xl font-bold font-sans tracking-tighter text-foreground">STANFORD</span>
                    <span className="text-xl font-bold font-serif italic text-foreground">OXFORD</span>
                    <span className="text-xl font-bold font-mono tracking-widest text-foreground">IIT-B</span>
                </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Engineered for Success</h2>
              <p className="text-muted-foreground text-xl">
                 We've stripped away the clutter to focus on raw performance and learning efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<BookOpen className="h-8 w-8" />}
                title="Comprehensive Material"
                description="Access thousands of detailed notes, video lectures, and practice questions curated by national rank holders."
              />
              <FeatureCard 
                icon={<Trophy className="h-8 w-8" />}
                title="Real-time Analytics"
                description="Our algorithms track every click and answer to generate a detailed performance report of your progress."
              />
              <FeatureCard 
                icon={<Zap className="h-8 w-8" />}
                title="AI-Powered Learning"
                description="Get a personalized study schedule that adapts in real-time to your learning speed and retention rates."
              />
               <FeatureCard 
                icon={<Layout className="h-8 w-8" />}
                title="Zero Distraction"
                description="A brutalist, minimalist interface designed to keep your dopamine receptors focused on studying."
              />
               <FeatureCard 
                icon={<Library className="h-8 w-8" />}
                title="Offline Architecture"
                description="Download materials and practice tests. Study in the mountains or the subway. No internet required."
              />
               <FeatureCard 
                icon={<CheckCircle2 className="h-8 w-8" />}
                title="24/7 Expert Access"
                description="Stuck on a problem at 3 AM? Your dedicated mentor is just a chat away to resolve doubts instantly."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 overflow-hidden bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-20 text-center text-foreground">Don't just take our word for it</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard 
                        name="Alex Chen" 
                        role="Medical Entrance Topper" 
                        quote="The analytics are frighteningly accurate. It told me I was weak in Organic Chemistry two weeks before I realized it myself."
                    />
                    <TestimonialCard 
                        name="Sarah Johnson" 
                        role="Civil Services Aspirant" 
                        quote="Minimalism changes everything. No ads, no popups, just pure study material. It increased my focus time by 40%."
                    />
                    <TestimonialCard 
                        name="Rahul Gupta" 
                        role="Engineering Student" 
                        quote="The AI study plan feels like having a personal coach who knows exactly how much I can handle each day. Game changer."
                    />
                </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-b border-border bg-background">
           <div className="container mx-auto px-4">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-border">
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter text-foreground">50k+</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">Active Students</p>
               </div>
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter text-foreground">1M+</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">Questions Solved</p>
               </div>
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter text-foreground">95%</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">Success Rate</p>
               </div>
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter text-foreground">4.9/5</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">User Rating</p>
               </div>
             </div>
           </div>
        </section>


        {/* FAQ Section */}
        <section className="py-32 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center text-foreground">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-border">
                <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors">How does the AI study plan work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI analyzes your initial assessment and ongoing performance to create a dynamic study schedule that adapts to your learning speed and retention. It constantly recalibrates based on your quiz scores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-border">
                <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors">Can I access content offline?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! You can download video lectures and notes for offline access via our mobile app, perfect for studying on the go or in low-connectivity areas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-border">
                <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors">Is there a money-back guarantee?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a 7-day no-questions-asked refund policy if you are not satisfied with our premium plans. No hidden clauses.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4" className="border-b-border">
                <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors">Can I switch plans later?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. You can upgrade or downgrade your plan at any time. The difference will be pro-rated.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-foreground">Ready to top the ranks?</h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Join the community of achievers. Your journey to excellence begins with a single click.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button size="lg" className="h-14 px-12 text-lg rounded-full shadow-sm hover:translate-y-[-2px] transition-transform">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-12 text-lg rounded-full hover:bg-secondary">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="group border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-sm">
      <CardHeader>
        <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-foreground group-hover:text-primary transition-colors duration-300 border border-border">
          {icon}
        </div>
        <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function TestimonialCard({ name, role, quote }: { name: string, role: string, quote: string }) {
    return (
        <Card className="bg-card border-border p-8 relative hover:bg-secondary/10 transition-colors">
            <Quote className="absolute top-8 right-8 h-8 w-8 text-muted-foreground/20" />
            <div className="flex items-center gap-1 mb-6 text-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                ))}
            </div>
            <p className="text-lg text-foreground/90 mb-6 leading-relaxed">"{quote}"</p>
            <div>
                <p className="font-bold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
        </Card>
    )
}
