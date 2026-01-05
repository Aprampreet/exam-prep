
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createMCQ, createShortAnswer } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileQuestion, ListChecks, BrainCircuit, ArrowLeft } from "lucide-react";

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
            className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 bg-card/50"
            onClick={handleCreateMCQ}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="text-center pt-10">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ListChecks className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">Multiple Choice</CardTitle>
            <CardDescription className="text-base">
                Ideal for quick revision and testing factual recall. 20 Questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 flex justify-center">
             <Button variant="default" className="w-40" disabled={loading !== null}>
                {loading === "mcq" ? <Loader2 className="animate-spin" /> : "Start MCQ"}
             </Button>
          </CardContent>
        </Card>

        {/* Short Answer Card */}
        <Card 
            className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 bg-card/50"
            onClick={handleCreateShortAnswer}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="text-center pt-10">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl mb-2">Short Answer</CardTitle>
            <CardDescription className="text-base">
                Deep dive into concepts. AI evaluates your logic and understanding. 10 Questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 flex justify-center">
             <Button variant="default" className="w-40" disabled={loading !== null}>
                {loading === "short" ? <Loader2 className="animate-spin" /> : "Start Theory"}
             </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
