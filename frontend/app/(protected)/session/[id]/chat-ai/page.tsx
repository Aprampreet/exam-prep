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
  const { user } = useAuth();
  const sessionId = params.id ? parseInt(params.id as string) : -1;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(1); 

      const res = await chatWithAI(sessionId, {
        message: userMsg.content,
        history: history
      });

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

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl h-[calc(100vh-80px)] flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
         <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    AI Study Companion
                </h1>
                <p className="text-sm text-muted-foreground">Session #{sessionId}</p>
            </div>
         </div>
         <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])}>
            <RefreshCw className="h-4 w-4 mr-2" /> Clear Chat
         </Button>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 mb-4 overflow-hidden border-border/50 bg-card/60 backdrop-blur-md shadow-xl flex flex-col">
        <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="space-y-6">
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' && (
                            <Avatar className="h-8 w-8 mt-1 border border-primary/20 bg-primary/10">
                                <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                            </Avatar>
                        )}
                        
                        <div 
                            className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                                : 'bg-muted/80 backdrop-blur-sm border border-border/50 rounded-tl-none'
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
                    <div className="flex gap-3 justify-start animate-pulse">
                         <Avatar className="h-8 w-8 mt-1 border border-primary/20 bg-primary/10">
                             <AvatarFallback><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                         </Avatar>
                         <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 h-12 w-24 flex items-center justify-center">
                             <div className="flex gap-1">
                                <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce"></div>
                             </div>
                         </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <div className="shrink-0 relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about specific concepts, summary, or explanations..."
                className="h-12 bg-card/60 backdrop-blur-md shadow-lg border-border/50 focus-visible:ring-primary/30 pl-4 pr-12 rounded-xl"
                disabled={loading}
            />
            <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || loading} 
                className="absolute right-1 top-1 h-10 w-10 rounded-lg shadow-sm"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
        </form>
      </div>
      
    </div>
  );
}