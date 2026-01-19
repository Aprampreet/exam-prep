
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createMCQ, createShortAnswer } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileQuestion, ListChecks, BrainCircuit, ArrowLeft, Bot } from "lucide-react";

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
    <div className="container mx-auto py-20 px-4 max-w-4xl animate-in fade-in zoom-in duration-500">
      <Button 
        variant="ghost" 
        className="mb-8 pl-0 hover:bg-transparent hover:text-primary"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Choose Your Exam Mode
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select how you want to test your knowledge. Our AI will generate questions based on your study material.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* MCQ Card */}
        <Card 
            className="group relative overflow-hidden border hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 bg-card"
            onClick={handleCreateMCQ}
        >
          <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <ListChecks className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-xl font-bold mb-2">Multiple Choice</CardTitle>
            <CardDescription className="text-sm px-4">
                Quick revision and testing factual recall. 20 Questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 flex justify-center">
             <Button variant="secondary" className="w-32 group-hover:bg-blue-600 group-hover:text-white transition-colors" disabled={loading !== null}>
                {loading === "mcq" ? <Loader2 className="animate-spin h-4 w-4" /> : "Start"}
             </Button>
          </CardContent>
        </Card>

        {/* Short Answer Card */}
        <Card 
            className="group relative overflow-hidden border hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1 bg-card"
            onClick={handleCreateShortAnswer}
        >
          <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <BrainCircuit className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl font-bold mb-2">Short Answer</CardTitle>
            <CardDescription className="text-sm px-4">
                Deep dive into concepts. AI evaluates your logic. 10 Questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 flex justify-center">
             <Button variant="secondary" className="w-32 group-hover:bg-purple-600 group-hover:text-white transition-colors" disabled={loading !== null}>
                {loading === "short" ? <Loader2 className="animate-spin h-4 w-4" /> : "Start"}
             </Button>
          </CardContent>
        </Card>

        {/* Chat with AI Card */}
        <Card 
            className="group relative overflow-hidden border hover:border-emerald-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 bg-card"
            onClick={() => router.push(`/session/${sessionId}/chat-ai`)}
        >
          <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Bot className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-bold mb-2">Chat with AI</CardTitle>
            <CardDescription className="text-sm px-4">
                Ask questions to your document and clear your doubts instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 flex justify-center">
             <Button variant="secondary" className="w-32 group-hover:bg-emerald-600 group-hover:text-white transition-colors" disabled={loading !== null}>
                Start
             </Button>
          </CardContent>
        </Card>

        {/* Long Question Card (Disabled) */}
        <Card 
            className="group relative overflow-hidden border-2 border-dashed opacity-60 cursor-not-allowed bg-muted/20"
        >
            <CardHeader className="text-center pt-10">
            <div className="mx-auto w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-6 border border-border/50">
              <FileQuestion className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-xl text-muted-foreground">Long Questions</CardTitle>
                <div className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border">Coming Soon</div>
            </div>
            <CardDescription className="text-sm">
                Practice detailed essay-type answers with comprehensive AI feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 flex justify-center">
             <Button variant="secondary" className="w-40" disabled>
                Locked
             </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
