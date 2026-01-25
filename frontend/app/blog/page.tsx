
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Learning Hub | ScribeMind",
  description: "Explore our collection of articles on study techniques, productivity, and mental health for students.",
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-background pb-20 mt-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full px-4 py-1">
             ScribeMind Academy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            The Learning <span className="text-primary">Hub</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Evidence-based strategies to help you master any subject. Updated weekly.
          </p>
        </div>

        {/* Featured Post (First one) */}
        {blogPosts.length > 0 && (
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block relative rounded-3xl overflow-hidden border border-border/50 bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
               <div className={`absolute inset-0 bg-gradient-to-br ${blogPosts[0].gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
               <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                   <div className="aspect-video w-full rounded-2xl relative overflow-hidden shadow-inner">
                       <img 
                           src={blogPosts[0].image} 
                           alt={blogPosts[0].title} 
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                   </div>
                   <div className="space-y-6">
                       <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                           <Badge variant="secondary">{blogPosts[0].category}</Badge>
                           <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blogPosts[0].readTime}</span>
                           <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blogPosts[0].date}</span>
                       </div>
                       <h2 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">{blogPosts[0].title}</h2>
                       <p className="text-muted-foreground text-lg line-clamp-3">{blogPosts[0].excerpt}</p>
                       <div className="flex items-center gap-3 pt-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {blogPosts[0].author.charAt(0)}
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-foreground">{blogPosts[0].author}</p>
                                <p className="text-xs text-muted-foreground">Author</p>
                            </div>
                       </div>
                   </div>
               </div>
            </Link>
          </div>
        )}

        {/* Grid for Rest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <div className="h-56 w-full relative overflow-hidden">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
                        <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur text-foreground border-transparent z-10">{post.category}</Badge>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                         <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-medium">
                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                             <span>•</span>
                             <span>{post.date}</span>
                         </div>
                         <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                         <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                         <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                             <div className="flex items-center gap-2 text-xs font-semibold">
                                 <User className="w-3 h-3" /> {post.author}
                             </div>
                             <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                 Read <ArrowRight className="w-3 h-3" />
                             </span>
                         </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
