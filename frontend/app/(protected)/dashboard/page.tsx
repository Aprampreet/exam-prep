"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSessions } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Clock, FileText, ChevronRight, Loader2, Search, Zap, Trophy, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
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
    <div className="container mx-auto py-10 px-4 animate-in fade-in duration-700">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
               Hello, {user?.profile?.full_name?.split(' ')[0] || 'Scholar'} 👋
            </h1>
            <p className="text-muted-foreground text-lg">Ready to conquer your study goals today?</p>
        </div>
        <div className="flex gap-3">
             <Link href="/session-create">
                <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-full px-8">
                    <PlusCircle className="mr-2 h-5 w-5" /> New Session
                </Button>
            </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-200/20 shadow-xl overflow-hidden relative group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen className="h-24 w-24 text-blue-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Total Sessions</CardTitle>
                <BookOpen className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground">{sessions.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Active materials</p>
            </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-200/20 shadow-xl overflow-hidden relative group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame className="h-24 w-24 text-purple-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">Study Streak</CardTitle>
                <Zap className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground">3 <span className="text-xl font-normal text-muted-foreground">Days</span></div>
                <p className="text-sm text-green-500 font-medium mt-1 flex items-center">
                    <Flame className="h-3 w-3 mr-1" /> On fire!
                </p>
            </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-200/20 shadow-xl overflow-hidden relative group">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="h-24 w-24 text-amber-500" />
            </div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">Avg. Score</CardTitle>
                <Trophy className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground">88%</div>
                <p className="text-sm text-muted-foreground mt-1">Top 10% of students</p>
            </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Recent Sessions</h2>
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search..." 
                className="pl-10 h-10 w-full bg-background/50 backdrop-blur-sm border-border/50 focus:bg-background transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
      </div>

      {/* Sessions Grid */}
      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm">
             <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
             </div>
             <h3 className="text-xl font-semibold">No sessions found</h3>
             <p className="text-muted-foreground text-base max-w-sm mx-auto mt-2 mb-8">
                 {searchQuery ? "No matches found." : "Get started by creating your first session."}
             </p>
             {!searchQuery && (
                <Link href="/session-create">
                    <Button variant="outline" className="rounded-full px-8">Create Now</Button>
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
                                {new Date(session.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-24 bg-muted/40 rounded-lg p-3 mb-4 flex flex-col items-center justify-center group-hover:bg-primary/5 transition-colors border border-dashed border-border/50">
                                 {session.original_file_url ? (
                                    <>
                                        <FileText className="h-8 w-8 text-primary/60 mb-2 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="text-xs text-muted-foreground font-medium">Document contains insights</span>
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
