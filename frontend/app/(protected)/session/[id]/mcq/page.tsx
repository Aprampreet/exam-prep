"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMCQAttempt, checkMCQ } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Save, LayoutDashboard, RotateCcw, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Assuming this exists, otherwise I'll fallback to a custom div
import { Separator } from "@/components/ui/separator";

export default function MCQPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id ? parseInt(params.id as string) : -1;

  const [loading, setLoading] = useState(true);
  const [attemptData, setAttemptData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (sessionId !== -1) {
      loadData();
    }
  }, [sessionId]);

  const loadData = async () => {
    try {
      const data = await getMCQAttempt(sessionId);
      setAttemptData(data);
      
      const initialAnswers: Record<number, string> = {};
      let isExamSubmitted = false;
      
      data.questions.forEach((q: any) => {
          if (q.user_answer) {
              initialAnswers[q.id] = q.user_answer;
              if (q.is_correct !== null && q.is_correct !== undefined) {
                  isExamSubmitted = true;
              }
          }
      });
      setAnswers(initialAnswers);
      setSubmitted(isExamSubmitted);
      if (isExamSubmitted) {
          setShowResults(true);
      }
    } catch (error) {
      console.error("Failed to load MCQ attempt", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (questionId: number, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (attemptData && currentQuestionIndex < attemptData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = async () => {
    if (!attemptData) return;
    setIsSubmitting(true);

    try {
        const updatedData = await checkMCQ(sessionId, { answers });
        setAttemptData(updatedData);
        setSubmitted(true);
        setShowResults(true);
    } catch (error) {
        console.error("Failed to submit exam", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!attemptData) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-2">Failed to load exam</h2>
            <p className="text-muted-foreground mb-4">It seems there was an error retrieving the session data.</p>
            <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </div>
    )
  }

  const totalQuestions = attemptData.questions.length;
  const answeredCount = Object.keys(answers).length; // Rough count
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const score = attemptData.score || attemptData.questions.filter((q: any) => q.is_correct).length || 0;
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 60; // Example threshold

  if (showResults) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-background py-10 px-4">
              <Card className="w-full max-w-lg shadow-xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
                  <CardHeader className="text-center pb-2 pt-8">
                      <h1 className="text-2xl font-bold tracking-tight">Exam Completed</h1>
                      <p className="text-muted-foreground">Session #{sessionId}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-8 pt-4">
                      <div className="flex flex-col items-center">
                          <div className="relative h-48 w-48 flex items-center justify-center">
                              {/* Glowing effect behind */}
                              <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              
                              <svg className="h-full w-full transform -rotate-90 drop-shadow-xl">
                                  <circle 
                                    cx="96" cy="96" r="88" 
                                    stroke="currentColor" 
                                    strokeWidth="12" 
                                    fill="transparent" 
                                    className="text-muted/20" 
                                  />
                                  <circle 
                                    cx="96" cy="96" r="88" 
                                    stroke="currentColor" 
                                    strokeWidth="12" 
                                    fill="transparent" 
                                    strokeDasharray={552} 
                                    strokeDashoffset={552 - (552 * percentage) / 100} 
                                    strokeLinecap="round"
                                    className={`transition-all duration-1000 ease-out ${passed ? "text-green-500" : "text-red-500"}`} 
                                  />
                              </svg>
                              <div className="absolute flex flex-col items-center mt-2">
                                  <span className="text-5xl font-extrabold tracking-tighter text-foreground">{percentage}%</span>
                                  <span className={`text-sm font-bold uppercase tracking-widest mt-1 px-2 py-0.5 rounded-full ${passed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                      {passed ? 'Passed' : 'Failed'}
                                  </span>
                              </div>
                          </div>
                      
                          <div className="mt-8 text-center space-y-1">
                              <h3 className="text-xl font-semibold">
                                {percentage === 100 ? "Perfect Score!" : passed ? "Great Job!" : "Keep Practicing"}
                              </h3>
                              <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
                                  {passed 
                                    ? "You clearly understand the core concepts." 
                                    : "Review the material and try again to improve your score."}
                              </p>
                          </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                          <div className="flex flex-col items-center p-3 rounded-xl bg-secondary/40 border border-border/50">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Score</span>
                              <span className="text-xl font-bold">{score} <span className="text-sm text-muted-foreground">/ {totalQuestions}</span></span>
                          </div>
                          <div className="flex flex-col items-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                              <span className="text-[10px] text-green-700 dark:text-green-400 uppercase font-bold tracking-wider mb-1">Correct</span>
                              <span className="text-xl font-bold text-green-700 dark:text-green-400">{score}</span>
                          </div>
                          <div className="flex flex-col items-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                              <span className="text-[10px] text-red-700 dark:text-red-400 uppercase font-bold tracking-wider mb-1">Incorrect</span>
                              <span className="text-xl font-bold text-red-700 dark:text-red-400">{totalQuestions - score}</span>
                          </div>
                      </div>
                  </CardContent>

                  <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row gap-3">
                      <Button size="lg" onClick={() => setShowResults(false)} className="w-full shadow-sm font-semibold">
                          <RotateCcw className="w-4 h-4 mr-2"/> Review Answers
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => router.push(`/session/${sessionId}`)} className="w-full border-2 font-semibold hover:bg-background">
                           <LayoutDashboard className="w-4 h-4 mr-2"/> Dashboard
                      </Button>
                  </CardFooter>
              </Card>
          </div>
      );
  }

  const currentQ = attemptData.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQ.id];
  
  return (
    <div className="min-h-screen container mx-auto py-8 px-4 max-w-3xl flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Exit Exam
        </Button>
        <div className="flex items-center gap-2">
             {submitted && (
                 <Button variant="outline" size="sm" onClick={() => setShowResults(true)}>
                     View Results
                 </Button>
             )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progressPercent)}% completed</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
               <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
      </div>

      {/* Main Card */}
      <div className="flex-grow flex flex-col justify-center pb-12">
      <Card className="shadow-lg border-muted md:p-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
             <div className="flex items-center gap-3">
                 <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                    {currentQuestionIndex + 1}
                 </span>
                 <h2 className="text-lg font-semibold leading-tight text-foreground/90">
                    {currentQ.question}
                 </h2>
             </div>
             {submitted && currentQ.is_correct !== undefined && (
                 <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shrink-0 ${currentQ.is_correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {currentQ.is_correct ? (
                        <><CheckCircle2 className="w-3.5 h-3.5"/> Correct</>
                    ) : (
                        <><XCircle className="w-3.5 h-3.5"/> Incorrect</>
                    )}
                 </div>
             )}
          </div>
        </CardHeader>
        
        <CardContent className="mt-2">
          <RadioGroup 
            onValueChange={(val) => handleValueChange(currentQ.id, val)} 
            value={currentAnswer || ""}
            disabled={submitted || isSubmitting}
            className="space-y-3"
          >
            {currentQ.options.map((opt: string, idx: number) => {
               // Styling logic for reviewed answers
               let containerClass = "border-muted hover:border-primary/50 hover:bg-accent/50";
               let labelClass = "text-foreground";
               let icon = null;

               if (submitted) {
                   if (opt === currentQ.correct_answer) {
                       containerClass = "border-green-500 bg-green-50 dark:bg-green-900/10";
                       labelClass = "text-green-700 dark:text-green-400 font-medium";
                       icon = <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
                   } else if (opt === currentAnswer && opt !== currentQ.correct_answer) {
                       containerClass = "border-red-500 bg-red-50 dark:bg-red-900/10";
                       labelClass = "text-red-700 dark:text-red-400 font-medium";
                       icon = <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
                   } else {
                       containerClass = "opacity-50 border-transparent bg-muted/20";
                   }
               } else if (currentAnswer === opt) {
                   containerClass = "border-primary bg-primary/5 shadow-sm";
                   labelClass = "font-medium text-primary";
               }

               return (
                <label 
                    key={idx} 
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 group relative overflow-hidden ${containerClass}`}
                >
                    <RadioGroupItem value={opt} id={`opt-${idx}`} className="sr-only" />
                    
                    {/* Checkbox-like indicator */}
                    <div className={`mr-4 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${currentAnswer === opt ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30 group-hover:border-primary/50'}`}>
                         {currentAnswer === opt && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>

                    <span className={`flex-grow text-base ${labelClass}`}>
                        {opt}
                    </span>
                    {icon && <div className="ml-3 animate-in fade-in zoom-in">{icon}</div>}
                </label>
               );
            })}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex justify-between pt-6 mt-4 border-t">
            <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={currentQuestionIndex === 0}
                className="w-32"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
                 !submitted && (
                    <Button 
                        onClick={handleSubmitExam} 
                        disabled={isSubmitting}
                        className="w-40 bg-primary hover:bg-primary/90 shadow-md"
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                        Submit Exam
                    </Button>
                 )
            ) : (
                <Button 
                    onClick={handleNext} 
                    className="w-32"
                >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
            

            {submitted && currentQuestionIndex === totalQuestions - 1 && (
                 <Button onClick={() => setShowResults(true)}>
                     Finish Review
                 </Button>
            )}
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
