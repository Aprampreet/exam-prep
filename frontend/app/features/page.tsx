import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
    Brain, 
    BarChart3, 
    FileText, 
    Bot, 
    Clock, 
    Sparkles, 
    Layers, 
    ShieldCheck, 
    Upload, 
    Cpu, 
    MessageSquare, 
    TrendingUp,
    CheckCircle2,
    Zap,
    Search
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
         <div className="container mx-auto max-w-5xl">
            <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 transition-colors rounded-full">
                <Sparkles className="w-3 h-3 mr-2" />
                Intelligent Study Ecosystem
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-tight">
                From Raw Notes to <br className="hidden md:block" /> 
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Complete Mastery</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A complete walkthrough of how ExamPrep transforms your study materials into an active learning engine.
            </p>
         </div>
      </section>

      {/* The Process Section (Step-by-Step) */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground">Four simple steps to upgrade your learning workflow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-muted-foreground/20 via-primary/20 to-muted-foreground/20 -z-10" />

                <ProcessStep 
                    number="01"
                    icon={<Upload className="w-6 h-6 text-white" />}
                    title="Upload Material"
                    description="Drop your PDFs, lecture notes, or textbooks. We support multiple formats."
                    color="bg-blue-500"
                />
                <ProcessStep 
                    number="02"
                    icon={<Cpu className="w-6 h-6 text-white" />}
                    title="AI Processing"
                    description="Our engine chunks, embeds, and analyzes your content to build a knowledge graph."
                    color="bg-purple-500"
                />
                 <ProcessStep 
                    number="03"
                    icon={<Zap className="w-6 h-6 text-white" />}
                    title="Active Recall"
                    description="Practice with auto-generated MCQs and Short Answer questions specifically targeting key concepts."
                    color="bg-amber-500"
                />
                 <ProcessStep 
                    number="04"
                    icon={<TrendingUp className="w-6 h-6 text-white" />}
                    title="Analytics Loop"
                    description="We identify weak spots and adapt the next set of questions to bridge the gaps."
                    color="bg-emerald-500"
                />
            </div>
        </div>
      </section>

      {/* Deep Dive Features */}
      <section className="py-24 container mx-auto px-4 max-w-7xl space-y-32">
        
        {/* Feature 1: The AI Tutor Chat (Left Image, Right Text) */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 w-full relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b bg-muted/50 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                        <div className="w-3 h-3 rounded-full bg-green-400/50" />
                    </div>
                    <div className="p-6 flex-1 bg-neutral-950/5 relative">
                        {/* Mock Chat UI */}
                        <div className="space-y-4 max-w-sm mx-auto mt-4 text-sm font-medium">
                            <div className="bg-muted p-3 rounded-lg rounded-tl-none w-fit max-w-[80%]">
                                Explain the concept of Quantum Entanglement from page 42.
                            </div>
                            <div className="bg-primary/10 text-primary p-3 rounded-lg rounded-tr-none w-fit ml-auto border border-primary/20 max-w-[90%] shadow-sm">
                                Based on your notes, Quantum Entanglement is described as...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    <span>Context-Aware RAG</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Chat with your Data.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Gone are the days of Ctrl+F. Our AI understands the semantic meaning of your documents. You can ask conceptual questions, request summaries, or ask for examples, and clear doubts instantly without leaving the platform.
                </p>
                <div className="space-y-3">
                    <FeatureCheck text="Context Retention: Remembers previous questions." />
                    <FeatureCheck text="Source Citations: Tells you exactly where info came from." />
                    <FeatureCheck text="Persona Tuning: Acts as a patient tutor." />
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="flex-1 w-full relative group">
                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col p-8 items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <div className="col-span-1 h-32 bg-primary/5 rounded-lg border border-primary/10 p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-primary/20" />
                            <div className="h-2 w-1/2 bg-primary/20 rounded" />
                        </div>
                         <div className="col-span-1 h-32 bg-primary/5 rounded-lg border border-primary/10 p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded bg-primary/20" />
                             <div className="h-2 w-3/4 bg-primary/20 rounded" />
                        </div>
                        <div className="col-span-2 h-16 bg-primary/10 rounded-lg border border-primary/20 p-4 flex items-center">
                            <div className="flex-1 space-y-2">
                                <div className="h-2 w-full bg-primary/20 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    <span>Dynamic Assessment</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Tests that actually teach.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    We don't just ask random questions. We generate high-quality Multiple Choice (MCQ) and Short Answer questions derived directly from your study material, ensuring you are prepared for the real deal.
                </p>
                <div className="space-y-3">
                    <FeatureCheck text="Auto-Grading: Instant scores for all question types." />
                    <FeatureCheck text="Constructive Feedback: Explains why an answer is wrong." />
                    <FeatureCheck text="Short Answer Evaluation: AI grades your written responses." />
                </div>
            </div>
        </div>

        {/* Feature 3: Smart Analytics (Left Image, Right Text) */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 w-full relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                <div className="relative aspect-video bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden flex items-center justify-center">
                    {/* Abstract Chart UI */}
                    <div className="flex items-end gap-3 h-40">
                         <div className="w-8 bg-emerald-500/20 h-[40%] rounded-t-sm" />
                         <div className="w-8 bg-emerald-500/40 h-[60%] rounded-t-sm" />
                         <div className="w-8 bg-emerald-500/60 h-[30%] rounded-t-sm" />
                         <div className="w-8 bg-emerald-500 h-[80%] rounded-t-sm shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                         <div className="w-8 bg-emerald-500/30 h-[50%] rounded-t-sm" />
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium">
                    <BarChart3 className="w-4 h-4" />
                    <span>Performance Intelligence</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Uncover your Blind Spots.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Traditional studying leaves you guessing what you know. Our dashboard visualizes your mastery level across different topics, showing you exactly where to focus your efforts next.
                </p>
                <div className="space-y-3">
                    <FeatureCheck text="Topic-Level Mastery: See which chapters need work." />
                    <FeatureCheck text="Trend Analysis: Watch your accuracy improve over time." />
                    <FeatureCheck text="AI Insights: Get textual revision strategies based on data." />
                </div>
            </div>
        </div>
      </section>

      {/* Feature Grid for smaller things */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <h2 className="text-2xl font-bold mb-12 text-center">And so much more...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SmallFeatureCard 
                icon={<Brain className="w-5 h-5 text-indigo-500" />}
                title="Adaptive Difficulty"
                desc="Questions get harder as you get better, keeping you in the flow state."
            />
            <SmallFeatureCard 
                icon={<Search className="w-5 h-5 text-indigo-500" />}
                title="Semantic Search"
                desc="Find any concept in your uploaded documents instantly using natural language."
            />
            <SmallFeatureCard 
                icon={<Layers className="w-5 h-5 text-indigo-500" />}
                title="Multi-Session Management"
                desc="Keep different subjects organized in separate, isolated workspaces."
            />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center mt-12 bg-gradient-to-b from-transparent to-muted/20 border-t border-border/50">
          <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-6">Ready to stop studying hard<br/>and start studying smart?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
                   <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Data Privacy Guaranteed</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background/50 px-4 py-2 rounded-full border shadow-sm">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Powered by Gemini AI</span>
                   </div>
              </div>
          </div>
      </section>
    </div>
  );
}


function ProcessStep({ number, icon, title, description, color }: any) {
    return (
        <div className="flex flex-col items-center text-center relative z-10">
            <div className={`w-14 h-14 ${color} rounded-2xl shadow-lg flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300 ring-4 ring-background`}>
                {icon}
            </div>
            <div className="mb-2 text-sm font-bold text-muted-foreground tracking-widest">STEP {number}</div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-[250px] leading-relaxed">{description}</p>
        </div>
    )
}

function FeatureCheck({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
             <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <CheckCircle2 className="w-3.5 h-3.5" />
             </div>
             <span className="font-medium text-muted-foreground">{text}</span>
        </div>
    )
}

function SmallFeatureCard({ icon, title, desc }: any) {
    return (
        <Card className="bg-muted/20 border-border/50 hover:bg-muted/40 transition-colors">
            <CardContent className="p-6">
                <div className="mb-4 bg-background p-2 w-fit rounded-lg shadow-sm border border-border/50">
                    {icon}
                </div>
                <h4 className="font-bold mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
        </Card>
    )
}
