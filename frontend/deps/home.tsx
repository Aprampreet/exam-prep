
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, BookOpen, Sparkles, Zap, TrendingUp, Target, Brain, Clock } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import { blogPosts } from "@/lib/blogData";
import TestimonialCard from "@/components/functions/TestimonialCard";
import FeatureCard from "@/components/functions/FeatureCard";
import {Hero }from "@/components/home/Hero";
import {Process }from "@/components/home/Process";
import {Stats }from "@/components/home/Stats";
import {CTA }from "@/components/home/CTA";

export default function HomePage() {

  return (
    <div className="min-h-screen mt-10 bg-black text-zinc-100 flex flex-col font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <main className="flex-1 z-10 relative">
        
        <Hero />

        <Process />

        <section className="py-20    border-b border-border/40 relative dark:bg-zinc-950/50">
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

        <Stats />
        
        <section className="py-20 overflow-hidden relative border-b border-border/40">
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

        <section className="py-20 bg-zinc-950/30 border-b border-border/40 relative">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 center items-center justify-center">
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
                </div>

                <div className="w-full relative">
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
                </div>
            </div>
        </section>

        <section className="py-20 max-w-3xl mx-auto px-4 bg-transparent">
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

        <CTA />
      </main>
    </div>
  )
}




