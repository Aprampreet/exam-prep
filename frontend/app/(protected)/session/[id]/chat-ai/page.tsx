"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { chatWithAI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Bot, User, ArrowLeft, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatAIPage() {
  const params = useParams();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const { user } = useAuth();
  const sessionId = params.id ? parseInt(params.id as string) : -1;
  const sample_q = [
    "What are the key concepts in this chapter?",
    "Can you explain this topic in simpler terms?",
    "Can you give me a summary of the main points?",
    "What are my weak areas?",
  ]

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I've analyzed your study material. Ask me anything about it." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(1); 

      const res = await chatWithAI(sessionId, {
        message: text,
        history: history
      });

      setStarted(true);

      const aiMsg: ChatMessage = { role: "assistant", content: res.answer };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: ChatMessage = { 
        role: "assistant", 
        content: "Sorry, I encountered an error processing your request. Please try again." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
         <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Bot className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    AI Study Companion
                </h1>
                <p className="text-sm text-muted-foreground">Session #{sessionId}</p>
            </div>
         </div>
         <Button variant="outline" size="sm" onClick={() => {setMessages([messages[0]]); setStarted(false);}}>
            <RefreshCw className="h-4 w-4 mr-2" /> Clear Chat
         </Button>
      </div>

      {/* Chat Area - Open Layout */}
      <div className="flex-1 min-h-0 flex flex-col relative">
        <ScrollArea className="flex-1 h-full px-4 mx-4">
            <div className="space-y-6">
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >

                        {msg.role === 'assistant' && (
                            <Avatar className="h-8 w-8 mt-1 border border-border bg-secondary">
                                <AvatarFallback><Bot className="h-4 w-4 text-emerald-600 dark:text-emerald-500" /></AvatarFallback>
                            </Avatar>
                        )}
                        
                        <div 
                            className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-5 py-3 shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                                : 'bg-muted rounded-tl-sm'
                            }`}
                        >
                            {msg.role === 'assistant' ? (
                                <div className="prose dark:prose-invert prose-sm max-w-none break-words">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                </div>
                            ) : (
                                <p className="text-sm break-words whitespace-pre-wrap">{msg.content}</p>
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <Avatar className="h-8 w-8 mt-1 border border-border">
                                <AvatarImage src={user?.profile?.avatar_url || ""} />
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                
                {loading && (
                    <div className="flex gap-3 justify-start animate-fade-in">
                         <Avatar className="h-8 w-8 mt-1 border border-border bg-secondary">
                             <AvatarFallback><Bot className="h-4 w-4 text-emerald-600 dark:text-emerald-500" /></AvatarFallback>
                         </Avatar>
                         <div className="bg-muted rounded-3xl rounded-tl-sm px-5 py-4 h-12 w-24 flex items-center justify-center">
                             <div className="flex gap-1.5">
                                <div className="h-1.5 w-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="h-1.5 w-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="h-1.5 w-1.5 bg-foreground/30 rounded-full animate-bounce"></div>
                             </div>
                         </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>
        </ScrollArea>
      {!started && (
      <div className="shrink-0 mb-4 px-2">
          <div className="flex flex-wrap gap-2 justify-center pb-2">
            {sample_q.map((question, index) => (
              <button
                key={index}
                onClick={() => sendMessage(question)}
                disabled={loading}
                className="
                  group relative 
                  bg-background/80 backdrop-blur-sm border border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                  dark:shadow-[0_8px_30px_rgb(255,255,255,0.05)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)]
                  text-sm font-medium text-foreground/80 hover:text-primary 
                  px-5 py-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1
                  animate-in zoom-in slide-in-from-bottom-4 fade-in fill-mode-both
                  flex items-center gap-2
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span>{question}</span>
              </button>
            ))}
          </div>
      </div>
      )}
      </div>

      

      {/* Input Area */}
      <div className="shrink-0 relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about specific concepts, summary, or explanations..."
                className="h-14 bg-card shadow-sm border border-border  focus-visible:ring-ring pl-5 pr-14 rounded-full text-base"
                disabled={loading}
            />
            <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || loading} 
                className="absolute right-2 top-2 h-10 w-10 rounded-lg shadow-sm"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
        </form>
      </div>
      
    </div>
  );
} 