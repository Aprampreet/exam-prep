
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createMCQ, createShortAnswer } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileQuestion, ListChecks, BrainCircuit, ArrowLeft, Bot, BarChart } from "lucide-react";

export default function SessionSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id ? parseInt(params.id as string) : -1;

  const [loading, setLoading] = useState<"mcq" | "short" | null>(null);

  const handleCreateMCQ = async () => {
    if (sessionId === -1) return;
    setLoading("mcq");
    try {
      await createMCQ(sessionId);
      router.push(`/session/${sessionId}/mcq`);
    } catch (error) {
      console.error("Failed to create MCQ", error);
    } finally {
        setLoading(null);
    }
  };

  const handleCreateShortAnswer = async () => {
    if (sessionId === -1) return;
    setLoading("short");
    try {
      await createShortAnswer(sessionId);
      router.push(`/session/${sessionId}/short`);
    } catch (error) {
      console.error("Failed to create Short Answer", error);
    } finally {
        setLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl animate-in fade-in zoom-in duration-500">
      <Button 
        variant="ghost" 
        className="mb-8 pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors group"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Button>

      <div className="mb-16 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-foreground">
          Choose Exam Mode
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Select how you want to test your knowledge. AI-generated questions based on your material.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* MCQ Card */}
        <Card 
            className="group relative border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer"
            onClick={handleCreateMCQ}
        >
          <CardHeader className="pt-8">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 border border-border group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors duration-300">
              <ListChecks className="h-6 w-6 text-foreground group-hover:text-blue-500 transition-colors" />
            </div>
            <CardTitle className="text-xl font-bold">Multiple Choice</CardTitle>
            <CardDescription className="text-sm pt-2">
                Quick revision and testing factual recall. 20 Questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
             <Button variant="outline" className="w-full justify-between group-hover:border-blue-500 group-hover:text-blue-500 transition-colors" disabled={loading !== null}>
                {loading === "mcq" ? <Loader2 className="animate-spin h-4 w-4" /> : "Start MCQ"}
                <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
             </Button>
          </CardContent>
        </Card>

        {/* Short Answer Card */}
        <Card 
            className="group relative border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer"
            onClick={handleCreateShortAnswer}
        >
          <CardHeader className="pt-8">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 border border-border group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors duration-300">
              <BrainCircuit className="h-6 w-6 text-foreground group-hover:text-purple-500 transition-colors" />
            </div>
            <CardTitle className="text-xl font-bold">Short Answer</CardTitle>
            <CardDescription className="text-sm pt-2">
                Deep dive into concepts. AI evaluates your logic. 10 Questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
             <Button variant="outline" className="w-full justify-between group-hover:border-purple-500 group-hover:text-purple-500 transition-colors" disabled={loading !== null}>
                {loading === "short" ? <Loader2 className="animate-spin h-4 w-4" /> : "Start Short Answer"}
                <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
             </Button>
          </CardContent>
        </Card>

        {/* Chat with AI Card */}
        <Card 
            className="group relative border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/session/${sessionId}/chat-ai`)}
        >
          <CardHeader className="pt-8">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 border border-border group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors duration-300">
              <Bot className="h-6 w-6 text-foreground group-hover:text-emerald-500 transition-colors" />
            </div>
            <CardTitle className="text-xl font-bold">Chat with AI</CardTitle>
            <CardDescription className="text-sm pt-2">
                Ask questions to your document and clear your doubts instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
             <Button variant="outline" className="w-full justify-between group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors" disabled={loading !== null}>
                Start Chat
                <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
             </Button>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card 
            className="group relative border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/session/${sessionId}/analytics`)}
        >
          <CardHeader className="pt-8">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 border border-border group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-colors duration-300">
              <BarChart className="h-6 w-6 text-foreground group-hover:text-orange-500 transition-colors" />
            </div>
            <CardTitle className="text-xl font-bold">Analytics</CardTitle>
            <CardDescription className="text-sm pt-2">
                View detailed performance reports and AI-generated insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
             <Button variant="outline" className="w-full justify-between group-hover:border-orange-500 group-hover:text-orange-500 transition-colors" disabled={loading !== null}>
                View Report
                <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
             </Button>
          </CardContent>
        </Card>

        {/* Long Question Card (Disabled) */}
        <Card 
            className="group relative border border-border/50 bg-muted/10 opacity-60 cursor-not-allowed"
        >
          <CardHeader className="pt-8">
            <div className="w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center mb-4 border border-border/50">
              <FileQuestion className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 mb-0">
                <CardTitle className="text-xl font-bold text-muted-foreground">Long Questions</CardTitle>
                <div className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-medium uppercase tracking-wider text-muted-foreground border border-border">Soon</div>
            </div>
            <CardDescription className="text-sm pt-2">
                Practice detailed essay-type answers with comprehensive AI feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
             <Button variant="ghost" className="w-full justify-start cursor-not-allowed text-muted-foreground pl-0 hover:bg-transparent" disabled>
                Locked
             </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
