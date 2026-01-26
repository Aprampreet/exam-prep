"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSessions, getProfileTabs, deleteSession } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Clock, FileText, ChevronRight, Loader2, Search, Zap, Trophy, Flame, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/context/AuthContext";

  export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<any>({ total_sessions: 0, avg_mcq_score: 0, avg_short_score: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sessionsData, statsData] = await Promise.all([
          getAllSessions(),
          getProfileTabs()
      ]);
      setSessions(sessionsData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, sessionId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      try {
        await deleteSession(sessionId);
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        setStats((prev: any) => ({...prev, total_sessions: Math.max(0, prev.total_sessions - 1)}));
      } catch (error) {
        console.error("Failed to delete session", error);
        alert("Failed to delete session");
      }
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
                <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Courses</CardTitle>
                <BookOpen className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground">{stats.total_sessions}</div>
                <p className="text-sm text-muted-foreground mt-1">Total active sessions</p>
            </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-200/20 shadow-xl overflow-hidden relative group">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame className="h-24 w-24 text-purple-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">Avg. MCQ Score</CardTitle>
                <Zap className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground">{Math.round(stats.avg_mcq_score)}%</div>
                <p className="text-sm text-green-500 font-medium mt-1 flex items-center">
                   Based on your attempts
                </p>
            </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-200/20 shadow-xl overflow-hidden relative group">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="h-24 w-24 text-amber-500" />
            </div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">Avg. Short Ans.</CardTitle>
                <Trophy className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent className="relative z-10">
                <div className="text-4xl font-bold text-foreground">{Math.round(stats.avg_short_score * 10) / 10} <span className="text-lg text-muted-foreground">/ 5</span></div>
                <p className="text-sm text-muted-foreground mt-1">Average performance</p>
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
        <div className="min-h-[300px] flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
            </div>
            <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border/50 rounded-3xl bg-card/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-500 group">
             <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                <BookOpen className="h-10 w-10 text-primary/40 group-hover:text-primary transition-colors" />
             </div>
             <h3 className="text-2xl font-bold tracking-tight mb-2">No study sessions yet</h3>
             <p className="text-muted-foreground text-base max-w-md mx-auto mb-8">
                 {searchQuery ? "No matches found. Try a different search term." : "Your journey to mastery begins here. Create your first session to get started."}
             </p>
             {!searchQuery && (
                <Link href="/session-create">
                    <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">Create First Session</Button>
                </Link>
             )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {filteredSessions.map((session, index) => {
                const gradients = [
                    "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
                    "from-purple-500/20 via-pink-500/20 to-rose-500/20", 
                    "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
                    "from-emerald-500/20 via-green-500/20 to-lime-500/20",
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                <div key={session.id} className="group relative flex flex-col rounded-3xl bg-card border border-border/60 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1 overflow-hidden">
                    
                    {/* Decorative Header */}
                    <div className={`h-32 w-full bg-gradient-to-br ${gradient} relative`}>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <Button
                                variant="destructive"
                                size="icon"
                                className="h-9 w-9 rounded-full shadow-lg bg-white/20 hover:bg-red-500 hover:text-white backdrop-blur-md border border-white/10 text-destructive-foreground/70"
                                onClick={(e) => handleDelete(e, session.id)}
                                title="Delete Session"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="absolute bottom-4 left-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm backdrop-blur-md ${
                                session.status === 'completed' 
                                ? 'bg-green-500/80 text-white border-green-400/50' 
                                : 'bg-white/30 dark:bg-black/30 text-foreground border-white/20'
                            }`}>
                                {session.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <Link href={`/session/${session.id}`} className="flex-1 flex flex-col p-6 pt-10 relative">
                        {/* Floating Icon */}
                        <div className="absolute -top-10 left-6 h-16 w-16 rounded-2xl bg-background shadow-lg border border-border flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                             {session.original_file_url ? (
                                <FileText className="h-8 w-8 text-primary" />
                             ) : (
                                <BookOpen className="h-8 w-8 text-primary/50" />
                             )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-bold leading-tight line-clamp-2 pr-2" title={session.title}>
                                    {session.title || "Untitled Session"}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2 font-medium">
                                    <Clock className="h-3.5 w-3.5 opacity-70" />
                                    Created on {new Date(session.created_at).toLocaleDateString(undefined, {
                                        month: 'short', day: 'numeric', year: 'numeric'
                                    })}
                                </p>
                            </div>
                            
                            <div className="pt-4 mt-auto border-t border-border/40 flex items-center justify-between">
                                <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                                    Continue Learning
                                </span>
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )})}
        </div>
      )}

    </div>
  );
}
