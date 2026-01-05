
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMCQAttempt } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function MCQPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id ? parseInt(params.id as string) : -1;

  const [loading, setLoading] = useState(true);
  const [attemptData, setAttemptData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionId !== -1) {
      loadData();
    }
  }, [sessionId]);

  const loadData = async () => {
    try {
      const data = await getMCQAttempt(sessionId);
      setAttemptData(data);
    } catch (error) {
      console.error("Failed to load MCQ attempt", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (questionIndex: number, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Future: API call to save answers
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

  // Calculate score if submitted (local calculation for demo since backend provides correct_answer)
  const calculateScore = () => {
    let score = 0;
    attemptData.questions.forEach((q: any, idx: number) => {
        if (answers[idx] === q.correct_answer) score++;
    });
    return score;
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl animate-in fade-in duration-500">
      <div className="flex items-center mb-8">
        <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div>
            <h1 className="text-3xl font-bold">Multiple Choice Exam</h1>
            <p className="text-muted-foreground">Session #{sessionId}</p>
        </div>
        {submitted && (
            <div className="ml-auto bg-primary/10 px-6 py-3 rounded-xl border border-primary/20">
                <span className="text-2xl font-bold text-primary">{calculateScore()} / {attemptData.questions.length}</span>
                <span className="ml-2 text-sm text-muted-foreground">Score</span>
            </div>
        )}
      </div>

      <div className="space-y-8">
        {attemptData.questions.map((q: any, idx: number) => {
            const isCorrect = submitted && answers[idx] === q.correct_answer;
            const isWrong = submitted && answers[idx] !== q.correct_answer;
            
            let cardBorder = "";
            if (submitted) {
                if (answers[idx] === q.correct_answer) cardBorder = "border-green-500 bg-green-500/5";
                else if (answers[idx] && answers[idx] !== q.correct_answer) cardBorder = "border-red-500 bg-red-500/5";
            }

            return (
              <Card key={idx} className={`transition-all duration-300 ${cardBorder}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex gap-3">
                    <span className="text-muted-foreground min-w-[1.5rem]">{idx + 1}.</span>
                    <span>{q.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    onValueChange={(val) => handleValueChange(idx, val)} 
                    value={answers[idx] || ""}
                    disabled={submitted}
                    className="space-y-3"
                  >
                    {q.options.map((opt: string, optIdx: number) => (
                      <div key={optIdx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={opt} id={`q-${idx}-opt-${optIdx}`} />
                        <Label htmlFor={`q-${idx}-opt-${optIdx}`} className={`flex-grow cursor-pointer ${submitted && opt === q.correct_answer ? "text-green-600 font-bold" : ""}`}>
                            {opt}
                            {submitted && opt === q.correct_answer && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600"/>}
                            {submitted && answers[idx] === opt && answers[idx] !== q.correct_answer && <AlertCircle className="inline ml-2 h-4 w-4 text-red-600"/>}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            );
        })}
      </div>

      <div className="mt-12 mb-20 flex justify-end sticky bottom-8">
        {!submitted && (
            <Button size="lg" className="shadow-xl" onClick={handleSubmit}>
                Submit Exam
            </Button>
        )}
      </div>
    </div>
  );
}
