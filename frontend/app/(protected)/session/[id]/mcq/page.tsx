"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMCQAttempt, checkMCQ } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Save, LayoutDashboard, RotateCcw, Award } from "lucide-react";

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
            <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </div>
    )
  }

  const totalQuestions = attemptData.questions.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const score = attemptData.score !== null ? attemptData.score : attemptData.questions.filter((q: any) => q.is_correct).length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 60; 

  const currentQ = attemptData.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQ.id];

  if (showResults) {
      return (
          <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 bg-background/50">
              <Card className="w-full max-w-lg border-none shadow-2xl bg-card/80 backdrop-blur-xl overflow-hidden ring-1 ring-border/10">
                  <CardHeader className="text-center pt-12 pb-2">
                       <div className="mx-auto mb-6 relative">
                           {/* Progress Circle */}
                           <svg className="w-40 h-40 transform -rotate-90">
                              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/10 opacity-20" />
                              <circle 
                                cx="80" cy="80" r="70" 
                                stroke="currentColor" strokeWidth="8" fill="transparent" 
                                strokeDasharray={440} 
                                strokeDashoffset={440 - (440 * percentage) / 100} 
                                strokeLinecap="round"
                                className={`transition-all duration-1000 ease-out ${passed ? "text-green-500" : "text-rose-500"}`} 
                              />
                           </svg>
                           <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                               <span className="text-4xl font-bold tracking-tighter">{percentage}%</span>
                           </div>
                       </div>
                       
                       <CardTitle className="text-3xl font-bold tracking-tight mb-2">
                            {passed ? "Excellent Work!" : "Keep Practicing"}
                       </CardTitle>
                       <p className="text-muted-foreground text-sm max-w-[260px] mx-auto leading-relaxed">
                           {passed 
                             ? "You've demonstrated solid command of this topic." 
                             : "Review the incorrect answers below to close your knowledge gaps."}
                       </p>
                  </CardHeader>
                  
                  <CardContent className="px-8 py-8">
                      {/* Minimalist Stats Divider */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                      <div className="grid grid-cols-3 divide-x divide-border/60">
                          <div className="text-center px-2">
                              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Correct</p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</p>
                          </div>
                          <div className="text-center px-2">
                              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Incorrect</p>
                              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{totalQuestions - score}</p>
                          </div>
                          <div className="text-center px-2">
                               <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Total</p>
                               <p className="text-2xl font-bold">{totalQuestions}</p>
                          </div>
                      </div>
                  </CardContent>

                  <CardFooter className="p-6 pb-8 flex flex-col gap-3">
                      <Button onClick={() => setShowResults(false)} className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5" size="lg">
                          Review Answers & Solutions
                      </Button>
                      
                      <Button variant="ghost" onClick={() => router.push(`/session/${sessionId}`)} className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground">
                           Back to Dashboard
                      </Button>
                  </CardFooter>
              </Card>
          </div>
      );
  }
  
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500 pb-20 relative">
       {/* Background */}
       <div className="absolute top-0 left-0 w-full h-full -z-10 bg-background">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent" />
       </div>
      
      {/* Top Bar */}
      <div className="w-full max-w-4xl mb-8 space-y-4">
          <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent">
                  <ArrowLeft className="h-5 w-5 mr-2" /> 
                  <span className="text-lg">Exit Exam</span>
              </Button>
              {submitted && (
                  <Button variant="outline" size="sm" onClick={() => setShowResults(true)}>
                      View Results
                  </Button>
              )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground uppercase tracking-wider">
                <span>Question {currentQuestionIndex + 1} <span className="text-muted-foreground/50">/ {totalQuestions}</span></span>
                <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
      </div>

      {/* Main Question Card */}
      <Card className="shadow-2xl border-white/10 w-full max-w-4xl overflow-hidden bg-card/60 backdrop-blur-xl">
        <CardHeader className="bg-muted/30 border-b border-border/40 py-8 px-10">
          <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-1 flex gap-5">
                 <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold shadow-lg shadow-primary/30 flex-shrink-0 mt-1">
                    {currentQuestionIndex + 1}
                 </span>
                 <h2 className="text-2xl font-semibold leading-relaxed text-foreground">
                    {currentQ.question}
                 </h2>
             </div>
             {submitted && currentQ.is_correct !== undefined && (
                 <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shrink-0 self-start ${currentQ.is_correct ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
                    {currentQ.is_correct ? (
                        <><CheckCircle2 className="w-5 h-5"/> Correct</>
                    ) : (
                        <><XCircle className="w-5 h-5"/> Incorrect</>
                    )}
                 </div>
             )}
          </div>
        </CardHeader>
        
        <CardContent className="p-10">
          <RadioGroup 
            onValueChange={(val) => handleValueChange(currentQ.id, val)} 
            value={currentAnswer || ""}
            disabled={submitted || isSubmitting}
            className="grid grid-cols-1 gap-4"
          >
            {currentQ.options.map((opt: string, idx: number) => {
               let containerClass = "border-border/60 hover:border-primary/50 hover:bg-accent/40";
               let labelClass = "text-foreground/90";
               let icon = null;

               if (submitted) {
                   if (opt === currentQ.correct_answer) {
                       containerClass = "border-green-500 bg-green-500/10 shadow-[0_0_0_1px_rgba(34,197,94,0.3)]";
                       labelClass = "text-green-700 dark:text-green-300 font-bold";
                       icon = <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />;
                   } else if (opt === currentAnswer && opt !== currentQ.correct_answer) {
                       containerClass = "border-red-500 bg-red-500/10";
                       labelClass = "text-red-700 dark:text-red-300 font-medium";
                       icon = <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
                   } else {
                       containerClass = "opacity-50 border-transparent bg-muted/10 grayscale";
                   }
               } else if (currentAnswer === opt) {
                   containerClass = "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-md";
                   labelClass = "font-semibold text-primary";
               }

               return (
                <label 
                    key={idx} 
                    className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 group relative ${containerClass}`}
                >
                    <RadioGroupItem value={opt} id={`opt-${idx}`} className="sr-only" />
                    
                    <div className={`mr-6 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${currentAnswer === opt ? 'border-primary bg-primary text-primary-foreground scale-110' : 'border-muted-foreground/30 group-hover:border-primary/40'}`}>
                         {currentAnswer === opt && <div className="h-2.5 w-2.5 rounded-full bg-white shadow-sm" />}
                    </div>

                    <span className={`flex-grow text-lg leading-relaxed ${labelClass}`}>
                        {opt}
                    </span>
                    {icon && <div className="ml-4 animate-in fade-in zoom-in spin-in-12 duration-300">{icon}</div>}
                </label>
               );
            })}
          </RadioGroup>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 bg-muted/20 p-8 h-28">
            <Button 
                variant="ghost" 
                size="lg"
                onClick={handlePrev} 
                disabled={currentQuestionIndex === 0}
                className="gap-2 text-base hover:bg-background/80"
            >
                <ArrowLeft className="h-5 w-5" /> Previous Question
            </Button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
                 !submitted && (
                    <Button 
                        size="lg"
                        onClick={handleSubmitExam} 
                        disabled={isSubmitting}
                        className="min-w-[180px] h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all font-semibold rounded-xl"
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Save className="mr-2 h-5 w-5"/>}
                        Submit Exam
                    </Button>
                 )
            ) : (
                <Button 
                    size="lg"
                    onClick={handleNext} 
                    className="min-w-[160px] h-12 text-lg rounded-xl shadow-md transition-transform hover:-translate-y-0.5"
                >
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            )}

            {submitted && currentQuestionIndex === totalQuestions - 1 && (
                 <Button size="lg" onClick={() => setShowResults(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl text-lg shadow-lg shadow-emerald-600/20">
                     Finish Review <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
