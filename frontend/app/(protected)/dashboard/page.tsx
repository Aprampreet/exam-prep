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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
                <div key={session.id} className="group relative flex flex-col bg-card rounded-2xl border border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
                    <Link href={`/session/${session.id}`} className="absolute inset-0 z-0" aria-label={`Open session ${session.title}`} />
                    
                    {/* Card Header: Icon + Actions */}
                    <div className="p-5 flex justify-between items-start">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                            session.original_file_url ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                            {session.original_file_url ? <FileText className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
                        </div>
                        
                        <div className="flex items-center gap-2 relative z-10">
                             <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                session.status === 'completed' 
                                ? 'bg-green-500/10 text-green-600 border-green-200' 
                                : 'bg-secondary text-secondary-foreground border-border'
                            }`}>
                                {session.status === 'completed' ? 'Done' : 'Active'}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-red-500 hover:bg-red-50 focus:bg-red-50 transition-colors"
                                onClick={(e) => handleDelete(e, session.id)}
                                title="Delete Session"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Card Body: Title + Info */}
                    <div className="px-5 pb-5 flex-1 flex flex-col gap-3 pointer-events-none">
                         <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                             {session.title || "Untitled Session"}
                         </h3>
                         <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {new Date(session.created_at).toLocaleDateString()}
                            </span>
                            {session.original_file_url && (
                                <span className="flex items-center gap-1">
                                    <FileText className="h-3.5 w-3.5" />
                                    Doc
                                </span>
                            )}
                         </div>
                    </div>

                    {/* Hover Footer (Visual cue) */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
            ))}
        </div>
      )}

    </div>
  );
}
