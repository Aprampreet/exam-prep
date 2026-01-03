
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Layout, Library, Trophy, Zap, Star, Quote } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useAuth } from "@/lib/context/AuthContext"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[5000ms]"></div>
          
          <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-5xl z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-secondary/50 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              New: AI-Powered Study Plans 2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
              Master Your Exams <br />
              <span className="text-muted-foreground relative">
                With Precision.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              The elite platform for competitive exam preparation. Use AI to analyze your weak spots and turn them into your biggest strengths.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] transition-shadow duration-300">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-primary/20 hover:bg-primary/10 transition-colors">
                Explore Syllabus
              </Button>
            </div>

            {/* Social Proof/Trusted By */}
            <div className="mt-24 pt-8 border-t border-border/40 w-full animate-in fade-in duration-1000 delay-500">
                <p className="text-sm text-muted-foreground mb-6 font-medium tracking-widest uppercase">Trusted by 50,000+ Students from</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Text Logos for Universities */}
                    <span className="text-xl font-bold font-serif">HARVARD</span>
                    <span className="text-xl font-bold font-mono">MIT</span>
                    <span className="text-xl font-bold font-sans tracking-tighter">STANFORD</span>
                    <span className="text-xl font-bold font-serif italic">OXFORD</span>
                    <span className="text-xl font-bold font-mono tracking-widest">IIT-B</span>
                </div>
            </div>
          </div>
        </section>

        {/* Features Grid with Hover Effects */}
        <section className="py-32 bg-secondary/5 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Engineered for Success</h2>
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

        {/* Testimonials Section (New) */}
        <section className="py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-20 text-center">Don't just take our word for it</h2>
                
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

        {/* Stats Section Redesigned */}
        <section className="py-24 border-y bg-secondary/10">
           <div className="container mx-auto px-4">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-border/20">
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter">50k+</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">Active Students</p>
               </div>
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter">1M+</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">Questions Solved</p>
               </div>
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter">95%</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">Success Rate</p>
               </div>
               <div className="space-y-2">
                 <h3 className="text-5xl font-bold tracking-tighter">4.9/5</h3>
                 <p className="text-muted-foreground uppercase text-xs tracking-widest font-semibold">User Rating</p>
               </div>
             </div>
           </div>
        </section>


        {/* FAQ Section */}
        <section className="py-32 max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-border/40">
                <AccordionTrigger className="text-lg">How does the AI study plan work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI analyzes your initial assessment and ongoing performance to create a dynamic study schedule that adapts to your learning speed and retention. It constantly recalibrates based on your quiz scores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-border/40">
                <AccordionTrigger className="text-lg">Can I access content offline?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! You can download video lectures and notes for offline access via our mobile app, perfect for studying on the go or in low-connectivity areas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-border/40">
                <AccordionTrigger className="text-lg">Is there a money-back guarantee?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a 7-day no-questions-asked refund policy if you are not satisfied with our premium plans. No hidden clauses.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4" className="border-b-border/40">
                <AccordionTrigger className="text-lg">Can I switch plans later?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. You can upgrade or downgrade your plan at any time. The difference will be pro-rated.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to top the ranks?</h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Join the community of achievers. Your journey to excellence begins with a single click.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button size="lg" className="h-14 px-12 text-lg rounded-full">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-12 text-lg rounded-full hover:bg-background/50">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-background" />
                </div>
                <span className="font-bold text-xl">ExamPrep.</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Empowering students with technology-driven education. Built for the modern aspirant.
              </p>
              <div className="flex gap-4">
                 {/* Social Icons Placeholder */}
                 <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"><span className="sr-only">Twitter</span><svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></div>
                 <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"><span className="sr-only">GitHub</span><svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-foreground">Platform</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary hover:underline transition-all">Browse Courses</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline transition-all">Live Classes</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline transition-all">Practice Tests</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-6 text-foreground">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary hover:underline transition-all">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline transition-all">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary hover:underline transition-all">Blog</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-6 text-foreground">Stay Updated</h4>
              <div className="flex gap-2">
                <Input placeholder="Email address" className="max-w-[200px] bg-secondary/50 border-border/50 focus:border-primary transition-colors" />
                <Button size="icon" className="shrink-0"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
          <Separator className="mb-8 bg-border/40" />
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 ExamPrep Inc. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="group border-border/40 bg-card/10 hover:bg-card/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
      <CardHeader>
        <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
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
        <Card className="bg-transparent border-border/30 p-8 relative hover:bg-secondary/20 transition-colors">
            <Quote className="absolute top-8 right-8 h-8 w-8 text-secondary-foreground/20" />
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
