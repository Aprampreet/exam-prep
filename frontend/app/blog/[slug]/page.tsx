
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Article Not Found | ScribeMind",
    };
  }
  return {
    title: `${post.title} | ScribeMind Learning Hub`,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
    }
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-20 mt-10">
      {/* Progress Bar (Optional, could be added later) */}
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Hub
        </Link>

        {/* Header */}
        <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1">{post.category}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold border border-indigo-500/30">
                        {post.author.charAt(0)}
                     </div>
                     <span className="font-medium text-foreground">{post.author}</span>
                </div>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
            </div>
        </header>

        {/* Featured Image */}
        <div className="w-full aspect-[21/9] rounded-3xl relative overflow-hidden mb-16 shadow-2xl">
             <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
             <div className="lead text-xl md:text-2xl font-medium text-muted-foreground mb-10 leading-relaxed border-l-4 border-primary pl-6 italic">
                {post.excerpt}
             </div>
             
             {/* Creating HTML content safely */}
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-10 border-t border-border/50">
            <div className="bg-muted/30 rounded-2xl p-8 md:p-12 text-center border border-border">
                <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Start applying these techniques today with ScribeMind's AI-powered study tools.</p>
                <div className="flex justify-center gap-4">
                     <Button size="lg" className="rounded-full px-8">Start Studying</Button>
                     <Button variant="outline" size="lg" className="rounded-full px-8"><Share2 className="w-4 h-4 mr-2" /> Share Article</Button>
                </div>
            </div>
        </div>
      </div>
    </article>
  );
}
