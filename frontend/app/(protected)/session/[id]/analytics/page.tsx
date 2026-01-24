
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";
import ReactMarkdown from 'react-markdown';
import { Loader2 } from "lucide-react";

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
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Analytics Unavailable</h2>
        <p className="text-muted-foreground mb-8">{error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const shortAvg = data.short_stats ? data.short_stats.average_score : 0;
  const shortPct = shortAvg > 0 ? Math.round((shortAvg / 5) * 100) : 0;

  const chartData = [
    { name: "MCQ Mastery", value: data.stats.accuracy, color: "#10b981" }, // emerald-500
    { name: "Short Answer", value: shortPct, color: "#8b5cf6" },   // violet-500
  ];

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl animate-in fade-in duration-500">
      <Button
        variant="ghost"
        className="mb-8 pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors group"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Session
      </Button>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
            <p className="text-muted-foreground mt-1">Deep dive into your quiz performance and AI insights.</p>
         </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* MCQ Accuracy */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">MCQ Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{data.stats.accuracy}%</div>
                <p className="text-xs text-muted-foreground">
                    {data.stats.correct}/{data.stats.correct + data.stats.wrong} Correct
                </p>
            </CardContent>
        </Card>

        {/* Short Answer Avg */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Short Ans Avg</CardTitle>
                 <Brain className="h-4 w-4 text-violet-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-violet-600">{shortAvg} <span className="text-sm text-muted-foreground">/ 5.0</span></div>
                <p className="text-xs text-muted-foreground">
                    Based on AI grading
                </p>
            </CardContent>
        </Card>

         {/* Correct Count */}
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Correct</CardTitle>
                 <CheckCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{data.stats.correct}</div>
            </CardContent>
        </Card>

         {/* Wrong Count */}
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
                 <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-600">{data.stats.wrong}</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Column */}
        <div className="lg:col-span-1">
             <Card className="h-full">
                <CardHeader>
                    <CardTitle>Mastery Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    formatter={(value: any) => [`${value}%`, "Score"]}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
             </Card>
        </div>

        {/* AI Insight Column */}
        <div className="lg:col-span-2">
            <Card className="h-full border-primary/20 bg-primary/5">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <CardTitle className="text-primary">AI Coach Insights</CardTitle>
                    </div>
                    <CardDescription>
                        Personalized analysis of your weak areas and study recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed">
                        <ReactMarkdown>{data.ai_insight}</ReactMarkdown>
                     </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
