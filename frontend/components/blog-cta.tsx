"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function BlogCTA() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: document.title,
                url: window.location.href
            });
            return;
        } catch (err) {
            console.log("Share skipped or unused", err);
        }
    }
    
    try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (e) {
        console.error("Failed to copy", e);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
            size="lg" 
            className="rounded-full px-8 font-semibold shadow-lg hover:shadow-primary/25 transition-all hover:scale-105" 
            onClick={() => router.push("/dashboard")}
        >
            Start Studying <ArrowRight className="ml-2 w-4 h-4"/>
        </Button>
        <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 border-2 hover:bg-muted" 
            onClick={handleShare}
        >
            {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Share2 className="w-4 h-4 mr-2" />} 
            {copied ? "Link Copied!" : "Share Article"}
        </Button>
    </div>
  );
}
