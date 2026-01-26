import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Navbar } from "@/deps/Navbar";
import {Footer} from "@/deps/footer"
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ScribeMind - AI Study Companion",
    default: "ScribeMind | Master Your Exams with AI",
  },
  description: "The #1 AI-powered study platform for high achievers. Personalized study plans, weakness detection, and instant mentorship to help you top your exams.",
  keywords: ["exam preparation", "AI study tool", "personalized learning", "study analytics", "exam prep app", "student dashboard", "learning optimization"],
  authors: [{ name: "ScribeMind Team" }],
  creator: "ScribeMind",
  publisher: "ScribeMind Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ScribeMind | Master Your Exams with AI",
    description: "Join 50,000+ students using AI to optimize their study schedules and ace their exams. Get started for free.",
    url: "https://scribemind.com",
    siteName: "ScribeMind",
    images: [
      {
        url: "https://scribemind.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ScribeMind Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScribeMind | Master Your Exams with AI",
    description: "The #1 AI-powered study platform for high achievers.",
    images: ["https://scribemind.com/twitter-image.jpg"],
    creator: "@scribemind",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ScribeMind",
              "url": "https://scribemind.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://scribemind.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "name": "ScribeMind",
               "url": "https://scribemind.com",
               "logo": "https://scribemind.com/logo.png",
               "sameAs": [
                 "https://twitter.com/scribemind",
                 "https://linkedin.com/company/scribemind"
               ]
             })
           }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <AuthProvider>
        <Navbar />
        <main className="flex-1 w-full">
            {children}  
        </main>
        </AuthProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
