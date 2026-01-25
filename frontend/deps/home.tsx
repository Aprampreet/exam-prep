
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, BookOpen, Flame, Sparkles, Zap, Star, Quote, TrendingUp, Target, Brain, Clock, ChevronRight, Activity, Trophy } from "lucide-react"
import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { win32 } from "path"
import Link from "next/link"
import { blogPosts } from "@/lib/blogData";

export default function HomePage() {


  return (
    <div className="min-h-screen mt-10 bg-black text-zinc-100 flex flex-col font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
      {/* Global Background Grid */}
      <div className="fixed inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <main className="flex-1 z-10 relative">
        
        {/* Hero Section - Immersive & Premium */}
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden border-b border-border/40">
           
           {/* Background Elements */}

    
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
                <Link href="/register">Start Free Trial</Link> <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-full border-zinc-900 dark:border-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors dark:bg-zinc-950/50 backdrop-blur-sm text-foreground">
                View Pricing
              </Button>
            </div>

            {/* Product Showcase Mockup */}
            <div className="mt-20 relative w-full max-w-6xl mx-auto z-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                <div className="rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md p-2 shadow-2xl shadow-indigo-500/20 ring-1 ring-white/10">
                     <div className="rounded-lg overflow-hidden relative bg-zinc-950 aspect-[16/10] md:aspect-[21/9] flex">
                         {/* Mock Sidebar */}
                         <div className="w-12 md:w-20 border-r border-white/10 flex flex-col items-center py-6 gap-6 bg-zinc-900/50 flex-shrink-0">
                             <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4"><Zap className="h-5 w-5" /></div>
                             <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground"><BookOpen className="h-4 w-4" /></div>
                             <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground"><TrendingUp className="h-4 w-4" /></div>
                             <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground"><Target className="h-4 w-4" /></div>
                         </div>
                         
                         {/* Mock Content */}
                         <div className="flex-1 flex flex-col min-w-0">
                             {/* Mock Header */}
                             <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-zinc-900/30">
                                 <div className="flex items-center gap-2">
                                     <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                                     <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                                     <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                      <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                                 </div>
                             </div>
                             
                             {/* Dashboard Grid */}
                             <div className="p-4 md:p-6 grid grid-cols-12 gap-6 h-full overflow-hidden">
                                 {/* Main Stats Area (Full on mobile, 8/12 on desktop) */}
                                 <div className="col-span-12 md:col-span-8 flex flex-col gap-4 md:gap-6">
                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                         {[
                                             { label: "Focus Score", val: "92%", color: "text-emerald-400" },
                                             { label: "Questions", val: "1.2k", color: "text-blue-400" },
                                             { label: "Accuracy", val: "88%", color: "text-purple-400" },
                                             { label: "Streak", val: "12d", color: "text-orange-400" }
                                         ].map((s, i) => (
                                             <div key={i} className="h-16 md:h-20 rounded-xl border border-white/5 bg-white/[0.02] p-3 flex flex-col justify-between">
                                                 <div className="h-1.5 w-8 md:w-12 bg-white/10 rounded-full"></div>
                                                 <div className={`text-lg md:text-xl font-bold ${s.color}`}>{s.val}</div>
                                             </div>
                                         ))}
                                     </div>
                                     
                                     {/* Charts Row */}
                                     {/* On mobile, stack these vertical or hide one. Let's stack. */}
                                     <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 min-h-0 overflow-y-auto md:overflow-hidden">
                                         {/* Performance Chart */}
                                         <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 relative overflow-hidden flex flex-col h-32 md:h-auto">
                                             <div className="flex justify-between items-center mb-4">
                                                 <div className="h-3 w-24 bg-white/10 rounded-full"></div>
                                             </div>
                                              {/* CSS Line Chart simulation */}
                                             <div className="flex-1 relative w-full">
                                                <svg className="w-full h-full absolute bottom-0 left-0 overflow-visible" preserveAspectRatio="none">
                                                    <path d="M0,80 C50,60 100,90 150,40 S250,50 300,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                                                    <path d="M0,80 C50,60 100,90 150,40 S250,50 300,20 L300,100 L0,100 Z" fill="url(#gradient)" opacity="0.1" />
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                                            <stop offset="0%" stopColor="rgb(99 102 241)" />
                                                            <stop offset="100%" stopColor="transparent" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                             </div>
                                         </div>

                                          {/* Weakness Heatmap - Hide on text-xs screens maybe? Keep for now */}
                                         <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col h-32 md:h-auto">
                                            <div className="h-3 w-28 bg-white/10 rounded-full mb-4"></div>
                                            <div className="grid grid-cols-4 gap-2 flex-1">
                                                {[...Array(16)].map((_, i) => (
                                                    <div key={i} className={`rounded-md ${[2,5,11,14].includes(i) ? 'bg-red-500/20 border border-red-500/30' : 'bg-emerald-500/5 border border-emerald-500/10'}`}></div>
                                                ))}
                                            </div>
                                         </div>
                                     </div>
                                 </div>
                                 
                                 {/* Side Panel (Hidden on mobile) */}
                                 <div className="hidden md:flex md:col-span-4 border-l border-white/10 pl-6 flex-col gap-6">
                                      {/* Ranking Card */}
                                      <div className="h-28 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-4 flex flex-row items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40"><Trophy className="h-6 w-6 text-white" /></div>
                                            <div>
                                                <div className="text-sm font-bold text-white">Top 10%</div>
                                                <div className="text-xs text-indigo-300">Global Rank #402</div>
                                            </div>
                                      </div>

                                      <div className="space-y-4 flex-1">
                                          <div className="h-3 w-20 bg-white/10 rounded-full mb-2"></div>
                                          {/* Mini Bar Graph */}
                                          <div className="flex items-end justify-between h-32 px-2 pb-2 border-b border-white/10">
                                              {[40, 70, 45, 90, 60, 80].map((h, i) => (
                                                  <div key={i} className="w-2 rounded-t-sm bg-primary/40 hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
                                              ))}
                                          </div>
                                      </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
                {/* Glow behind the dashboard */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-xl blur-[80px] opacity-10 -z-10"></div>
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

        {/* How It Works - Unified Premium Section */}
        <section className="py-10 relative overflow-hidden">

             <div className="container mx-auto px-4 relative z-10">
                 <div className="max-w-6xl mx-auto bg-zinc-900/20 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                     {/* Inner Ambient Glow */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"></div>

                     <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
                         <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary px-3 py-1 text-sm tracking-wide">THE PROCESS</Badge>
                         <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">From <span className="text-muted-foreground line-through decoration-red-500/50 decoration-4">Chaos</span> to <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">Clarity</span></h2>
                         <p className="text-xl text-muted-foreground/80 leading-relaxed">
                            A unified ecosystem designed to streamline your path to the top. All your needs, in one place.
                         </p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                         {/* Connecting Line Graphic */}
                         <div className="absolute top-[3.5rem] left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent hidden md:block">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                         </div>
                         
                         {[
                             { 
                                title: "Connect", 
                                subtitle: "Centralize Your Data",
                                desc: "Sync past scores, notes, and study material into one unified dashboard.", 
                                icon: <Zap className="h-6 w-6 text-white" />,
                                color: "bg-amber-500"
                            },
                             { 
                                title: "Analyze", 
                                subtitle: "AI-Powered Insights",
                                desc: "Our neural engine pinpoints weak topics and forgetting curves instantly.", 
                                icon: <Brain className="h-6 w-6 text-white" />,
                                color: "bg-indigo-500"
                            },
                             { 
                                title: "Conquer", 
                                subtitle: "Personalized Action",
                                desc: "Execute a daily plan tailored to ensure 99% retention and mastery.", 
                                icon: <Trophy className="h-6 w-6 text-white" />,
                                color: "bg-emerald-500"
                            }
                         ].map((step, i) => (
                             <div key={i} className="relative flex flex-col items-center text-center group">
                                 {/* Step Icon Bubble */}
                                 <div className={`relative w-28 h-28 rounded-full ${step.color} p-1 mb-8 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                     <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent"></div>
                                     <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center border-4 border-zinc-900 relative overflow-hidden">
                                          <div className={`absolute inset-0 opacity-20 ${step.color} blur-md group-hover:opacity-40 transition-opacity`}></div>
                                          {step.icon}
                                     </div>
                                     {/* Number Tag */}
                                     <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-md font-bold shadow-lg">
                                         {i + 1}
                                     </div>
                                 </div>

                                 <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                                 <span className="text-xs font-bold tracking-widest text-primary/80 uppercase mb-4 block">{step.subtitle}</span>
                                 <p className="text-muted-foreground leading-relaxed max-w-xs">{step.desc}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>

        {/* Features - Interactive Tabs */}
        <section className="py-32    border-b border-border/40 relative dark:bg-zinc-950/50">
             {/* Subtle Technical Grid in Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
             
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary px-3 py-1 text-sm tracking-wide">features</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
                Everything you need to <span className="text-primary italic font-serif pr-2">Excel</span>
              </h2>
              <p className="text-muted-foreground text-xl font-normal leading-relaxed text-balance">
                 We've broken down the science of high performance into a suite of powerful tools.
              </p>
            </div>

            <Tabs defaultValue="learn" className="w-full max-w-5xl mx-auto">
              <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-zinc-900/50 border border-border/50 p-1">
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                    <TabsTrigger value="analyze">Analyze</TabsTrigger>
                    <TabsTrigger value="succeed">Succeed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="learn" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard 
                        icon={<BookOpen className="h-6 w-6" />}
                        title="Comprehensive Material"
                        description="Thousands of detailed notes and video lectures curated by top rankers."
                        className="lg:col-span-2"
                        gradient="from-blue-500/5 to-indigo-500/5"
                    />
                     <FeatureCard 
                        icon={<Zap className="h-6 w-6" />}
                        title="Offline Mode"
                        description="Download everything. Study on the subway or the moon."
                         gradient="from-emerald-500/5 to-green-500/5"
                    />
                </div>
              </TabsContent>
              
              <TabsContent value="analyze" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard 
                        icon={<TrendingUp className="h-6 w-6" />}
                        title="Real-time Analytics"
                        description="Live performance tracking with granular breakdown of every topic to pinpoint weakness."
                        gradient="from-violet-500/5 to-purple-500/5"
                        className="lg:col-span-2"
                    />
                     <FeatureCard 
                        icon={<Brain className="h-6 w-6" />}
                        title="AI-Powered Learning"
                        description="Our neural engine adapts your schedule based on retention rates."
                         gradient="from-pink-500/5 to-rose-500/5"
                    />
                </div>
              </TabsContent>

               <TabsContent value="succeed" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard 
                        icon={<Target className="h-6 w-6" />}
                        title="24/7 Mentorship"
                        description="Instant doubt resolution from subject matter experts anytime, anywhere."
                         gradient="from-cyan-500/5 to-sky-500/5"
                         className="lg:col-span-2"
                    />
                     <FeatureCard 
                        icon={<Sparkles className="h-6 w-6" />}
                        title="Minimalist Interface"
                        description="A brutalist, distraction-free environment for deep work."
                         gradient="from-amber-500/5 to-orange-500/5"
                    />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="relative py-16 border-b border-border/40">
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
                    className="group relative overflow-hidden text-center hover:-translate-y-1 transition-all duration-300 border-border/50 bg-zinc-950/40 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg"
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
        
        {/* Testimonials - Carousel */}
        <section className="py-32 overflow-hidden relative border-b border-border/40">
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
        </section>

        {/* SEO Content Section - Latest Insights */}
        <section className="py-32 bg-zinc-950/30 border-b border-border/40 relative">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">SCRIBEMIND ACADEMY</Badge>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">Master the Art of <span className="text-primary">Learning</span></h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Strategies from cognitive science to help you study smarter, not harder.
                        </p>
                    </div>
                    <Link href="/blog">
                        <Button variant="ghost" className="hidden md:flex group hover:bg-primary/10 hover:text-primary">
                            View All Articles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="w-full relative">
                     <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                         <CarouselContent className="-ml-4">
                            {blogPosts.map((post, i) => (
                                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                                    <Link href={`/blog/${post.slug}`} className="block h-full">
                                        <Card className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden flex flex-col h-full ring-1 ring-white/5">
                                            {/* Abstract Header Image */}
                                            <div className={`h-56 w-full bg-gradient-to-br ${post.gradient} relative overflow-hidden flex-shrink-0`}>
                                                <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: post.pattern, backgroundSize: '20px 20px' }}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90"></div>
                                                
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
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 max-w-3xl mx-auto px-4 bg-transparent">
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
        </section>

        {/* CTA Section - Gradient Glow */}
        <section className="py-32 relative overflow-hidden border-t border-border/50">

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
