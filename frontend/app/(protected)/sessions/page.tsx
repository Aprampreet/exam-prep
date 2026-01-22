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
            <Button size="lg" className="w-full md:w-auto shadow-sm rounded-full transition-all">
                <PlusCircle className="mr-2 h-5 w-5" /> New Session
            </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
            placeholder="Search sessions..." 
            className="pl-10 h-10 w-full bg-background border-border"
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
        <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-2xl bg-card">
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
                    <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
                        <CardHeader className="pb-3 pt-6">
                            <div className="flex justify-between items-start gap-4">
                                <CardTitle className="text-xl font-bold line-clamp-1 leading-tight" title={session.title}>
                                    {session.title || "Untitled Session"}
                                </CardTitle>
                                <span className={`shrink-0 text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${
                                    session.status === 'completed' ? 'text-green-600 border-green-200 dark:border-green-800' : 'text-blue-600 border-blue-200 dark:border-blue-800'
                                }`}>
                                    {session.status || "In Progress"}
                                </span>
                            </div>
                            <CardDescription className="text-xs font-medium text-muted-foreground flex items-center mt-1">
                                <span>Created on {new Date(session.created_at).toLocaleDateString()}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-20 bg-muted rounded-lg p-3 mb-4 flex items-center gap-3 border border-border">
                                 {session.original_file_url ? (
                                    <>
                                        <div className="h-10 w-10 bg-secondary rounded-lg flex items-center justify-center shrink-0 border border-border">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-medium truncate">Document Attached</span>
                                            <span className="text-xs text-muted-foreground">Ready for analysis</span>
                                        </div>
                                    </>
                                 ) : (
                                     <span className="text-xs text-muted-foreground italic pl-2">No document attached</span>
                                 )}
                             </div>
                             <div className="flex items-center justify-between text-sm font-medium mt-auto pt-4 border-t border-border/50 group-hover:text-primary transition-colors">
                                <span>Continue Session</span>
                                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
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
