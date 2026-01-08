'use client';
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, X } from "lucide-react"
import Link from "next/link"
import React from "react"
import { AuthNav } from "./NavAuth"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useAuth } from "@/lib/context/AuthContext"

export function Navbar() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-background" />
          </div>
          <span className="font-bold text-xl tracking-tight">ExamPrep.</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          {user && (
            <Link href="/session-create" className="hover:text-foreground transition-colors">Create Session</Link>
          )}
          <Link href="#" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <AuthNav />
        </div>

        {/* Mobile Sidebar (Sheet) */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="-mr-2">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
                    <SheetHeader className="text-left mb-6">
                        <SheetTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-background" />
                            </div>
                            <span className="font-bold text-xl">ExamPrep.</span>
                        </SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col gap-6 flex-1">
                        <nav className="flex flex-col space-y-4">
                             <Link href="/" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                                Home
                             </Link>
                             {user && (
                               <Link href="/session-create" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                                  Create Session
                               </Link>
                             )}
                             <Link href="#" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                                Features
                             </Link>
                             <Link href="#" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                                Pricing
                             </Link>
                        </nav>
                        
                        <div className="mt-auto border-t pt-6">
                             <div className="flex flex-col gap-4">
                                <AuthNav />
                             </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  )
}
