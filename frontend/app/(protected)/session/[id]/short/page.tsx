
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getShortAnswerAttempt } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Using the installed component
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function ShortAnswerPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id ? parseInt(params.id as string) : -1;

  const [loading, setLoading] = useState(true);
  const [attemptData, setAttemptData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({}); // State to toggle visibility of ideal match

  useEffect(() => {
    if (sessionId !== -1) {
      loadData();
    }
  }, [sessionId]);

  const loadData = async () => {
    try {
      const data = await getShortAnswerAttempt(sessionId);
      setAttemptData(data);
    } catch (error) {
      console.error("Failed to load Short Answer attempt", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };

  const toggleReveal = (idx: number) => {
    setRevealed(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!attemptData) {
     return (
        <div className="container mx-auto py-20 text-center">
            <h2 className="text-2xl font-bold text-destructive">Failed to load exam.</h2>
            <Button variant="outline" className="mt-4" onClick={() => router.back()}>Go Back</Button>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl animate-in fade-in duration-500">
      <div className="flex items-center mb-8">
        <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div>
            <h1 className="text-3xl font-bold">Short Answer Exam</h1>
            <p className="text-muted-foreground">Session #{sessionId} • {attemptData.answers.length} Questions</p>
        </div>
      </div>

      <div className="space-y-10">
        {attemptData.answers.map((q: any, idx: number) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg flex gap-3">
                <span className="text-primary font-mono min-w-[1.5rem]">{idx + 1}.</span>
                <span>{q.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Your Answer:</Label>
                <Textarea 
                    placeholder="Type your explanation here..."
                    className="min-h-[120px] resize-y bg-background"
                    value={answers[idx] || ""}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                />
              </div>

              <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleReveal(idx)}
                    className="text-xs"
                  >
                    {revealed[idx] ? <EyeOff className="mr-2 h-3 w-3" /> : <Eye className="mr-2 h-3 w-3" />}
                    {revealed[idx] ? "Hide Ideal Answer" : "Show Ideal Answer"}
                  </Button>
                  
                  {revealed[idx] && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-md animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Ideal Answer:</p>
                        <p className="text-sm text-foreground/90 leading-relaxed">{q.ideal_answer}</p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="mt-12 mb-20 flex justify-end">
            <Button size="lg" className="shadow-xl" onClick={() => router.push("/dashboard")}>
                Finish & Exit
            </Button>
      </div>
    </div>
  );
}
