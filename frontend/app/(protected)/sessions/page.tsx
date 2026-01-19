"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSessions } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, ChevronRight, Loader2, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Session {
  id: number;
  title: string;
  created_at: string;
  original_file_url: string;
  status: string;
}

export default function SessionsPage() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getAllSessions();
      setSessions(data);
    } catch (error) {
      console.error("Failed to load sessions", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => 
    session.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">All Sessions</h1>
            <p className="text-muted-foreground mt-1">View and manage all your study sessions.</p>
        </div>
        <Link href="/session-create">
            <Button size="lg" className="w-full md:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-full transition-all">
                <PlusCircle className="mr-2 h-5 w-5" /> New Session
            </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
            placeholder="Search sessions..." 
            className="pl-10 h-10 w-full bg-background/50 backdrop-blur-sm border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sessions Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm">
             <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
             </div>
             <h3 className="text-lg font-semibold">No sessions found</h3>
             <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2 mb-6">
                {searchQuery ? "Try searching for a different keyword." : "Get started by creating your first study session."}
             </p>
             {!searchQuery && (
                <Link href="/session-create">
                    <Button variant="outline">Create Now</Button>
                </Link>
             )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
                <Link href={`/session/${session.id}`} key={session.id} className="group">
                    <Card className="h-full border-border/40 bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 overflow-hidden">
                        <div className="h-2 w-full bg-gradient-to-r from-primary/20 to-primary/60" />
                        <CardHeader className="pb-3 pt-5">
                            <div className="flex justify-between items-start gap-4">
                                <CardTitle className="text-lg font-bold line-clamp-1 leading-tight" title={session.title}>
                                    {session.title || "Untitled Session"}
                                </CardTitle>
                                <span className={`shrink-0 text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${
                                    session.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                                }`}>
                                    {session.status || "In Progress"}
                                </span>
                            </div>
                            <CardDescription className="text-xs font-medium opacity-70">
                                Created {new Date(session.created_at).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-24 bg-muted/40 rounded-lg p-3 mb-4 flex flex-col items-center justify-center group-hover:bg-primary/5 transition-colors border border-dashed border-border/50">
                                 {session.original_file_url ? (
                                    <>
                                        <FileText className="h-8 w-8 text-primary/60 mb-2 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="text-xs text-muted-foreground font-medium">Document Attached</span>
                                    </>
                                 ) : (
                                     <span className="text-xs text-muted-foreground italic">No document</span>
                                 )}
                             </div>
                             <div className="flex items-center justify-between text-sm text-primary font-semibold mt-auto pt-2 border-t border-border/30">
                                <span>Continue Studying</span>
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    <ChevronRight className="h-3 w-3" />
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      )}

    </div>
  );
}
