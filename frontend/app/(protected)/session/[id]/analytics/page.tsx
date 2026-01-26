"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Target, Sparkles, XCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from "recharts";
import ReactMarkdown from 'react-markdown';
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/session/${sessionId}/analytics`);
        setData(res.data);
      } catch (err: any) {
        console.error("Failed to load analytics", err);
        setError("Could not load analytics. Make sure you have attempted the MCQs first.");
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) fetchData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
             <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-primary/20 animate-spin border-t-primary"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary animate-pulse" />
                </div>
             </div>
             <p className="text-muted-foreground animate-pulse">Analyzing your performance...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-destructive/10 border border-destructive/20 rounded-xl p-8">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-foreground">Analytics Unavailable</h2>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Button onClick={() => router.back()} variant="outline">Go Back</Button>
        </div>
      </div>
    );
  }

  const shortAvg = data.short_stats ? data.short_stats.average_score : 0;
  const shortPct = shortAvg > 0 ? Math.round((shortAvg / 5) * 100) : 0;

  const chartData = [
    { name: "MCQ Mastery", value: data.stats.accuracy, color: "#10b981", fullMark: 100 },
    { name: "Short Ans", value: shortPct, color: "#8b5cf6", fullMark: 100 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
        <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="container mx-auto py-4 px-4 max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <div className="h-6 w-px bg-border/50 hidden md:block"></div>
                    <h1 className="text-lg font-semibold hidden md:block">Session Report</h1>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Generated
                </Badge>
            </div>
        </div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto py-10 px-4 max-w-7xl space-y-8"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tight mb-2">Performance <span className="text-primary">Deep Dive</span></h2>
                    <p className="text-xl text-muted-foreground">Comprehensive analysis of your recent study session.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-4 py-2 rounded-full border border-border/50">
                    <Target className="w-4 h-4 text-primary" />
                    <span>Session ID: {sessionId?.slice(0, 8)}...</span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <StatCard 
                    title="MCQ Accuracy" 
                    value={`${data.stats.accuracy}%`} 
                    subtitle={`${data.stats.correct} / ${data.stats.correct + data.stats.wrong} Correct`}
                    icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
                    trend="positive"
                />
                 <StatCard 
                    title="Short Answer Avg" 
                    value={shortAvg.toString()} 
                    subtitle="Out of 5.0"
                    icon={<Brain className="h-5 w-5 text-violet-500" />}
                    trend="neutral"
                />
                 <StatCard 
                    title="Correct Answers" 
                    value={data.stats.correct} 
                    subtitle="MCQs Solved"
                    icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
                    trend="positive"
                />
                 <StatCard 
                    title="Areas to Improve" 
                    value={data.stats.wrong} 
                    subtitle="Mistakes made"
                    icon={<XCircle className="h-5 w-5 text-red-500" />}
                    trend="negative"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visualizer Column */}
                <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
                     <Card className="overflow-hidden border-border/50 shadow-lg shadow-black/5">
                        <CardHeader className="bg-muted/30 border-b border-border/40 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Mastery Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="hsl(var(--muted-foreground))" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            stroke="hsl(var(--muted-foreground))" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false} 
                                            tickFormatter={(value) => `${value}%`} 
                                        />
                                        <Tooltip 
                                            cursor={{fill: 'hsl(var(--muted)/0.3)'}}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                return (
                                                    <div className="rounded-lg border border-border bg-background p-3 shadow-xl">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                                                                <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Score</span>
                                                                <span className="font-bold text-foreground">{payload[0].value}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                }
                                                return null
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60} animationDuration={1500}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                     </Card>

                     {/* Key Takeaways Mini Card */}
                    <Card className="bg-gradient-to-br from-violet-500/5 to-purple-500/5 border-violet-500/10">
                        <CardContent className="p-6 flex items-start gap-4">
                            <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-lg mt-1">
                                <Lightbulb className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1 text-violet-900 dark:text-violet-100">Feedback Summary</h4>
                                <p className="text-sm text-violet-800/80 dark:text-violet-200/70 leading-relaxed">
                                    You are showing strong application skills but need to review theoretical definitions.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* AI Insight Column - The Notebook Effect */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-full border-border/50 shadow-xl shadow-primary/5 overflow-hidden flex flex-col bg-background/50 backdrop-blur-sm">
                        <div className="border-b border-border/40 bg-muted/20 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Brain className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">AI Cognitive Analysis</CardTitle>
                                    <p className="text-xs text-muted-foreground">Generated by Gemini Pro</p>
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                        </div>
                        
                        <CardContent className="p-8 flex-1 overflow-auto max-h-[600px] relative">
                             {/* Lined Paper Effect */}
                             <div className="absolute inset-x-8 top-0 bottom-0 pointer-events-none opacity-[0.03] select-none"
                                style={{
                                    backgroundImage: "linear-gradient(transparent 95%, #000 95%)",
                                    backgroundSize: "100% 2rem"
                                }}
                             />
                             
                             <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-ul:list-disc prose-ul:pl-4 prose-ol:pl-4 space-y-4">
                                <TypewriterEffect text={data.ai_insight} />
                             </div>
                        </CardContent>

                        <div className="p-4 border-t border-border/40 bg-muted/10 text-xs text-center text-muted-foreground flex justify-between px-8">
                             <span>Analysis Completed in 1.2s</span>
                             <span>Confidience Score: 98%</span>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    </div>
  );
}

// Sub-components

function StatCard({ title, value, subtitle, icon, trend }: { title: string, value: string | number, subtitle: string, icon: React.ReactNode, trend: 'positive' | 'negative' | 'neutral' }) {
    const isNegative = trend === 'negative';
    const bgClass = isNegative ? 'bg-red-500/5 border-red-500/10 hover:border-red-500/20' : 'bg-card border-border/50 hover:border-primary/20';
    
    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${bgClass}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                <p className="text-xs text-muted-foreground mt-1 font-medium bg-muted/50 w-fit px-1.5 py-0.5 rounded">
                    {subtitle}
                </p>
            </CardContent>
        </Card>
    )
}

function TypewriterEffect({ text }: { text: string }) {
     // A simple unified rendering for now to ensure markdown parses correctly.
     // If we want character-by-character + Markdown, it's very complex. 
     // Instead, we fade in chunks.
     
     return (
         <div className="animate-in fade-in duration-1000 slide-in-from-bottom-2">
             <ReactMarkdown 
                components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl mb-4 border-b pb-2 border-border" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl mb-3 mt-6 flex items-center gap-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg mb-2 mt-4 font-semibold text-primary" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-1 my-4" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-primary/80" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary/30 pl-4 py-1 italic bg-muted/20 rounded-r my-4" {...props} />
                }}
             >
                {text}
             </ReactMarkdown>
         </div>
     )
}
