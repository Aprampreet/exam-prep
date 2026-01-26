
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, UploadCloud, FileText, CheckCircle, File, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";

export default function CreateSessionPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);

  // Auth redirect
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/session-create");
    }
  }, [user, loading, router]);

  // Processing steps animation
  const steps = [
      "Uploading Document...",
      "Extracting Text Content...", 
      "Vectorizing Content (RAG)...",
      "Generating AI Insights..."
  ];

  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (uploading) {
          interval = setInterval(() => {
              setProcessingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
          }, 3000); // Change step every 3 seconds roughly
      } else {
          setProcessingStep(0);
      }
      return () => clearInterval(interval);
  }, [uploading]);


  if (loading) return null; // Or a full page loader

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          setFile(e.dataTransfer.files[0]);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      setError("Please provide both a title and a file.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      const res = await createSession(formData);
      router.push(`/session/${res.id}`); 
    } catch (err: any) {
      console.error(err);
      setError("Failed to create session. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4  relative overflow-hidden">
        

      <Card className="w-full max-w-2xl border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="absolute top-0 left-0 w-full h-1 " />
        
        <CardHeader className="text-center space-y-4 pt-10 pb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 border border-primary/20 shadow-inner">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Create Study Session
            </CardTitle>
            <CardDescription className="text-lg max-w-md mx-auto">
                Upload your course material and let our AI generate questions, summaries, and personalized insights.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-10">
          {uploading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                      <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
                  </div>
                  <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{steps[processingStep]}</h3>
                      <p className="text-muted-foreground text-sm">This typically takes 10-30 seconds.</p>
                  </div>
                  {/* Progress Indicators */}
                  <div className="flex gap-2 mt-4">
                      {[0, 1, 2, 3].map((i) => (
                          <div key={i} className={`h-1.5 w-12 rounded-full transition-colors duration-500 ${i <= processingStep ? "bg-primary" : "bg-muted"}`} />
                      ))}
                  </div>
              </div>
          ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                    <Label htmlFor="title" className="text-base font-semibold">Session Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g. Introduction to Neural Networks"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-12 bg-background/50 border-input transition-all focus:ring-2 focus:ring-primary/20 text-lg"
                        required
                    />
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">Study Material (PDF)</Label>
                    <div 
                        className={`group relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${
                            file 
                            ? 'border-primary bg-primary/5' 
                            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
                        }`}
                        onClick={() => document.getElementById('file-upload')?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={handleDrop}
                    >
                        <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange} 
                            accept=".pdf,.doc,.docx,.txt"
                        />
                        
                        {file ? (
                             <div className="relative z-10 flex flex-col items-center animate-in zoom-in duration-300">
                                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                     <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-lg text-foreground mb-1">{file.name}</h4>
                                <p className="text-sm text-muted-foreground mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                    <CheckCircle className="h-3.5 w-3.5" /> Ready to upload
                                </span>
                                <p className="absolute -bottom-8 text-xs text-muted-foreground/60">Click or Drag to replace</p>
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-center text-muted-foreground group-hover:text-foreground transition-colors">
                                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <UploadCloud className="h-8 w-8 opacity-60" />
                                </div>
                                <h4 className="font-medium text-lg mb-2">Drag & Drop or Click to Browse</h4>
                                <p className="text-sm opacity-60 max-w-[200px] leading-relaxed">
                                    Supports PDF, DOCX, & TXT up to 10MB
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium text-center animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <Button 
                    type="submit" 
                    disabled={!file || !title} 
                    className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                    Generate Session
                </Button>
              </form>
          )}
        </CardContent>
      </Card>
      
      {/* Decorative text footer */}
      <div className="absolute bottom-8 left-0 w-full text-center text-xs text-muted-foreground opacity-40">
           Powered by RAG Engine & LLM Analysis
      </div>
    </div>
  );
}
