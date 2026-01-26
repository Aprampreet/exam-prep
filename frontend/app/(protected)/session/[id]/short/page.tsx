"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getShortAnswerAttempt, checkShortAnswer } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { Loader2, ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
export default function ShortAnswerPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id ? parseInt(params.id as string) : -1;

  const [loading, setLoading] = useState(true);
  const [attemptData, setAttemptData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAnswerChange = (questionId: number, val: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const toggleReveal = (idx: number) => {
    setRevealed(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleNext = () => {
    if (attemptData && currentQuestionIndex < attemptData.answers.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  const handleSubmit = async () => {
    if (!currentAnswer.trim()) return;
    
    setIsSubmitting(true);
    try {
        const updatedAttempt = await checkShortAnswer(sessionId, {
            question_id: Number(currentQ.id),
            answer: currentAnswer
        });
        setAttemptData(updatedAttempt);
        
    } catch (error) {
        console.error("Failed to submit short answer", error);
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleProceed = () => {
      if (currentQuestionIndex < attemptData.answers.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
      } else {
          router.push(`/session/${sessionId}`);
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
            <h2 className="text-2xl font-bold text-destructive mb-2">Failed to load exam.</h2>
            <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </div>
    )
  }

  const currentQ = attemptData.answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === attemptData.answers.length - 1;
  const currentAnswer = answers[currentQ.id] || "";
  const isRevealed = revealed[currentQuestionIndex] || currentQ.score !== null; 
  const isEvaluated = currentQ.score !== null && currentQ.score !== undefined;

  const totalQuestions = attemptData.answers.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;


  return (
      <div className="min-h-[calc(100vh-80px)]  w-full flex flex-col items-center justify-center p-10 md:p-8 animate-in fade-in duration-500  pb-20 mt-10 mb-10">
        
        {isEvaluated && (
            <div className={`w-full max-w-3xl mb-6 p-4 rounded-xl shadow-sm flex items-center justify-between border ${currentQ.score >= 3 ? "bg-green-500/10 border-green-500/50" : "bg-orange-500/10 border-orange-500/50"}`}>
                <div className="flex items-center gap-4">
                     <div className={`p-2 rounded-full ${currentQ.score >= 3 ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-orange-500/20 text-orange-700 dark:text-orange-400"}`}>
                        {currentQ.score >= 3 ? <CheckCircle2 className="w-6 h-6"/> : <AlertCircle className="w-6 h-6"/>}
                     </div>
                     <div>
                         <h3 className={`text-lg font-bold ${currentQ.score >= 3 ? "text-green-800 dark:text-green-300" : "text-orange-800 dark:text-orange-300"}`}>
                             Score: {currentQ.score} / 5
                         </h3>
                         <p className="text-sm opacity-90">
                             {currentQ.score >= 4 ? "Excellent work!" : currentQ.score >= 3 ? "Good effort." : "Keep practicing."}
                         </p>
                     </div>
                </div>
            </div>
        )}

        {/* Main Question Card */}
        <Card className="shadow-2xl border-border/60 w-full max-w-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border/50 py-6">
              <div className="flex items-start gap-4">
                 <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-sm flex-shrink-0 mt-0.5">
                    {currentQuestionIndex + 1}
                 </span>
                 <h2 className="text-xl font-semibold leading-snug text-foreground">
                    {currentQ.question}
                 </h2>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">Your Explanation</Label>
                <Textarea 
                    placeholder="Type your answer here..."
                    className={`min-h-[200px] resize-y text-base p-4 leading-relaxed focus-visible:ring-primary/50 ${isEvaluated ? "opacity-90 bg-muted/20" : "bg-background"}`}
                    value={currentQ.user_answer || currentAnswer}
                    disabled={isEvaluated || isSubmitting}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                />
              </div>

               {/* Feedback Section - Below Input */}
               {isEvaluated && (
                   <div className="pt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                          <h4 className="flex items-center gap-2 font-semibold text-sm mb-3 text-blue-700 dark:text-blue-400">
                              <span className="h-2 w-2 rounded-full bg-blue-500"/> AI Feedback
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                              {currentQ.feedback}
                          </p>
                      </div>

                      <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
                          <h4 className="flex items-center gap-2 font-semibold text-sm mb-3 text-green-700 dark:text-green-400">
                              <CheckCircle2 className="w-4 h-4"/> Ideal Answer
                          </h4>
                          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-medium">
                              {currentQ.correct_answer}
                          </p>
                      </div>
                   </div>
               )}

               {!isEvaluated && (
                  <div className="pt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleReveal(currentQuestionIndex)}
                        className="text-xs text-muted-foreground hover:text-foreground h-auto py-2"
                      >
                        {isRevealed ? <EyeOff className="mr-2 h-3 w-3" /> : <Eye className="mr-2 h-3 w-3" />}
                        {isRevealed ? "Hide Ideal Answer" : "Peek Ideal Answer (Grading Disabled)"}
                      </Button>
                      
                      {isRevealed && (
                        <div className="mt-4 p-4 bg-yellow-500/10 border-l-4 border-yellow-500/50 rounded-r-lg animate-in slide-in-from-top-2 duration-300">
                            <p className="text-xs font-bold text-yellow-600 dark:text-yellow-500 mb-2 uppercase tracking-wide">Preview Ideal Answer</p>
                            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{currentQ.correct_answer}</p>
                        </div>
                      )}
                  </div>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-border/50 bg-muted/10 p-6 md:px-8 h-24">
                 <Button 
                    variant="outline" 
                    onClick={handlePrev} 
                    disabled={currentQuestionIndex === 0}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Previous
                </Button>

                {!isEvaluated && (
                    <Button 
                        onClick={handleSubmit} 
                        className="min-w-[140px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
                        disabled={isSubmitting || !currentAnswer.trim()}
                    >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Answer"} 
                    </Button>
                )}
                
                {isEvaluated && (
                     <Button 
                        onClick={handleProceed} 
                        className={isLastQuestion ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                    >
                        {isLastQuestion ? "Finish Review" : "Next Question"} <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
      </div>
  );
}
