
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, UploadCloud, FileText, CheckCircle } from "lucide-react";

export default function CreateSessionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">New Study Session</CardTitle>
          <CardDescription className="text-lg">
            Upload your study material (PDF, Docs) to let AI generate insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">Session Title</Label>
              <Input
                id="title"
                placeholder="e.g. Organic Chemistry Chapter 1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 bg-background/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">Study Material</Label>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer hover:bg-secondary/20 ${file ? 'border-primary bg-primary/5' : 'border-border'}`}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  
                  {file ? (
                    <div className="flex flex-col items-center text-primary animate-in zoom-in duration-300">
                        <CheckCircle className="h-10 w-10 mb-2" />
                        <span className="font-semibold text-lg">{file.name}</span>
                        <span className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        <p className="text-xs mt-2 underline">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                        <FileText className="h-10 w-10 mb-3 opacity-50" />
                        <span className="font-medium text-lg">Click to browse or drag file here</span>
                        <span className="text-sm">Supports PDF, DOCX, TXT (Max 10MB)</span>
                    </div>
                  )}
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md text-center">
                {error}
              </div>
            )}

            <Button type="submit" disabled={uploading || !file || !title} className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Session...
                </>
              ) : (
                "Start Analyzing"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
