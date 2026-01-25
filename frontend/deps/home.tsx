
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, BookOpen, Flame, Sparkles, Zap, Star, Quote, TrendingUp, Target, Brain, Clock, ChevronRight, Activity, Trophy } from "lucide-react"
import React from "react"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
      
      <main className="flex-1 z-10 relative">
        
        {/* Hero Section - Immersive & Premium */}
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden border-b border-border/40">
           
           {/* Background Elements */}
           <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 opacity-50"></div>

          <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-5xl z-10 relative">
            
             {/* Announcement Pill - Shimmering */}
            <div className="group relative inline-flex items-center rounded-full border border-primary/20 bg-background/50 px-6 py-2 text-sm font-medium text-foreground mb-10 overflow-hidden backdrop-blur-md hover:bg-primary/5 hover:border-primary/30 transition-all cursor-default">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-semibold mr-1">New:</span> 
              <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">Advanced Weakness Detection</span>
              <ChevronRight className="ml-1 h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent translate-y-[1px]" />
            </div>
            
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
              Master Your Exams<br />
              <span className="bg-gradient-to-b from-primary via-indigo-500 to-indigo-600 bg-clip-text text-transparent pb-4">
                With Precision.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-2xl leading-relaxed font-normal text-balance animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              The elite platform trusted by <span className="font-semibold text-foreground">50,000+ students</span>. 
              We turn your study data into a competitive advantage using advanced AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-1 transition-all bg-primary hover:bg-primary/90 text-primary-foreground border-t border-white/20">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm text-foreground">
                View Pricing
              </Button>
            </div>

            {/* Social Proof Text */}
            <div className="mt-24 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-forwards">
                 <p className="text-sm font-semibold tracking-widest text-muted-foreground/60 uppercase mb-8">Trusted by Top Scholars From</p>
                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                     {["Harvard", "MIT", "Stanford", "Oxford", "IIT-B"].map((uni) => (
                         <span key={uni} className="text-xl md:text-2xl font-bold font-serif text-foreground/80 hover:text-primary transition-colors cursor-default">{uni.toUpperCase()}</span>
                     ))}
                 </div>
            </div>
          </div>
        </section>

        {/* Features - Modern Bento Grid */}
        <section className="py-32 border-b border-border/40 relative dark:bg-zinc-950/50">
             {/* Subtle Technical Grid in Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
             
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary px-3 py-1 text-sm tracking-wide">WHY CHOOSE US</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
                Engineered for <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent italic font-serif pr-2">Success</span>
              </h2>
              <p className="text-muted-foreground text-xl font-normal leading-relaxed text-balance">
                 A clutter-free ecosystem designed for raw performance. We stripped away the noise so you can focus on the signal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<BookOpen className="h-6 w-6" />}
                title="Comprehensive Material"
                description="Thousands of detailed notes and video lectures curated by top rankers."
                className="lg:col-span-2"
                gradient="from-blue-500/5 to-indigo-500/5"
              />
              <FeatureCard 
                icon={<TrendingUp className="h-6 w-6" />}
                title="Real-time Analytics"
                description="Live performance tracking with granular breakdown of every topic."
                gradient="from-violet-500/5 to-purple-500/5"
              />
              <FeatureCard 
                icon={<Brain className="h-6 w-6" />}
                title="AI-Powered Learning"
                description="Our neural engine adapts your schedule based on retention rates."
                 gradient="from-pink-500/5 to-rose-500/5"
              />
               <FeatureCard 
                icon={<Sparkles className="h-6 w-6" />}
                title="Minimalist Interface"
                description="A brutalist, distraction-free environment for deep work."
                className="lg:col-span-2"
                 gradient="from-amber-500/5 to-orange-500/5"
              />
               <FeatureCard 
                icon={<Zap className="h-6 w-6" />}
                title="Offline Mode"
                description="Download everything. Study on the subway or the moon."
                 gradient="from-emerald-500/5 to-green-500/5"
              />
               <FeatureCard 
                icon={<Target className="h-6 w-6" />}
                title="24/7 Mentorship"
                description="Instant doubt resolution from subject matter experts."
                 gradient="from-cyan-500/5 to-sky-500/5"
              />
            </div>
          </div>
        </section>

        {/* Stats Section - Floating Cards */}
        <section className="relative py-24 bg-background border-b border-border/40">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { value: "50k+", label: "Active Students", icon: <Activity className="h-4 w-4 mb-2 text-primary" /> },
                    { value: "1M+", label: "Questions Solved", icon: <TrendingUp className="h-4 w-4 mb-2 text-indigo-500" /> },
                    { value: "95%", label: "Success Rate", icon: <Trophy className="h-4 w-4 mb-2 text-amber-500" /> },
                    { value: "4.9", label: "Average Rating", icon: <Star className="h-4 w-4 mb-2 text-yellow-500" /> },
                ].map((stat, idx) => (
                    <Card
                    key={idx}
                    className="group relative overflow-hidden text-center hover:-translate-y-1 transition-all duration-300 border-border/50 bg-background/50 hover:border-primary/20 hover:shadow-lg"
                    >
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                        <CardContent className="pt-8 pb-6 flex flex-col items-center">
                            {stat.icon}
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-1">
                            {stat.value}
                            </h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                            {stat.label}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </div>
        </section>
        
        {/* Testimonials - Refined Layout */}
        <section className="py-32 overflow-hidden bg-background relative border-b border-border/40">
             {/* Decorative Background */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-foreground mb-6">Loved by top performers</h2>
                  <p className="text-lg text-muted-foreground text-balance">
                      Join thousands of students who have transformed their grades.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <TestimonialCard 
                        name="Alex Chen" 
                        role="Medical Entrance Topper" 
                        quote="The analytics are frighteningly accurate. It detected my Organic Chemistry weakness two weeks before I noticed it."
                        rating={5}
                    />
                    <TestimonialCard 
                        name="Sarah Johnson" 
                        role="Civil Services Aspirant" 
                        quote="No ads, no distractions. Just pure learning. My focus time increased by 40% in the first month alone."
                        highlight
                        rating={5}
                        className="md:-mt-8 shadow-2xl skew-y-0"
                    />
                    <TestimonialCard 
                        name="Rahul Gupta" 
                        role="Engineering Student" 
                        quote="It's like having a personal AI coach who knows exactly what I can handle. This changed my entire study approach."
                        rating={5}
                    />
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 max-w-3xl mx-auto px-4 bg-background">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-muted text-muted-foreground">FAQ</Badge>
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
        </section>

        {/* CTA Section - Gradient Glow */}
        <section className="py-32 relative overflow-hidden border-t border-border/50">
           <div className="absolute inset-0 bg-background z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] z-0"></div>
          
          <div className="container mx-auto px-4 text-center z-20 relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-foreground text-balance">Ready to top the ranks?</h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto font-light">
              Join 50,000+ high achievers. Your journey to excellence begins with a single click.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
               <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground border-t border-white/20">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold rounded-full border-border hover:bg-muted/50 bg-background/50 backdrop-blur-md">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description, className, gradient }: { icon: React.ReactNode, title: string, description: string, className?: string, gradient?: string }) {
  return (
    <Card className={`group relative overflow-hidden border-border/50 bg-card hover:bg-card/80 transition-all duration-500 hover:border-primary/20 hover:shadow-xl ${className}`}>
        {/* Subtle hover gradient bloom */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-primary/5 via-transparent to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        
      <CardHeader className="relative z-10">
        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-indigo-500/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/10 group-hover:border-primary/20 shadow-sm">
          {icon}
        </div>
        <CardTitle className="text-xl mb-3 font-bold group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function TestimonialCard({ name, role, quote, highlight, rating, className }: { name: string, role: string, quote: string, highlight?: boolean, rating: number, className?: string }) {
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
