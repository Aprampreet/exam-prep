
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSessions } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Clock, FileText, ChevronRight, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
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
    <div className="container mx-auto py-10 px-4 animate-in fade-in duration-500">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage all your study sessions and track progress.</p>
        </div>
        <Link href="/session-create">
            <Button size="lg" className="w-full md:w-auto shadow-lg hover:shadow-primary/25 transition-all">
                <PlusCircle className="mr-2 h-5 w-5" /> New Session
            </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{sessions.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Active study materials</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Hours Studied</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12.5</div>
                <p className="text-xs text-muted-foreground mt-1 text-green-500">+2.5 hours this week</p>
            </CardContent>
        </Card>
        <Card>
             <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Score</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">85%</div>
                 <p className="text-xs text-muted-foreground mt-1">Based on recent quizzes</p>
            </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
            placeholder="Search sessions..." 
            className="pl-10 h-10 w-full md:w-[400px]"
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
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
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
                    <Card className="h-full hover:border-primary/50 transition-all hover:shadow-md cursor-pointer group-hover:-translate-y-1 duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold line-clamp-1 pr-2" title={session.title}>
                                    {session.title || "Untitled Session"}
                                </CardTitle>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                                    session.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                                }`}>
                                    {session.status || "In Progress"}
                                </span>
                            </div>
                            <CardDescription className="text-xs">
                                Created {new Date(session.created_at).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-20 bg-muted/30 rounded-md p-3 mb-4 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                                 {session.original_file_url ? (
                                    <div className="text-center">
                                        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-1 group-hover:text-primary transition-colors" />
                                        <span className="text-xs text-muted-foreground">Document Attached</span>
                                    </div>
                                 ) : (
                                     <span className="text-xs text-muted-foreground italic">No document</span>
                                 )}
                             </div>
                             <div className="flex items-center justify-between text-sm text-primary font-medium mt-auto">
                                <span>Continue Studying</span>
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
