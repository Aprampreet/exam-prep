
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Stats } from "@/components/home/Stats";
import { CTA } from "@/components/home/CTA";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeBlog } from "@/components/home/HomeBlog";
import { HomeFAQ } from "@/components/home/HomeFAQ";

export default function HomePage() {
  return (
    <div className="min-h-screen mt-10 bg-black text-zinc-100 flex flex-col font-sans selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <main className="flex-1 z-10 relative">
        <Hero />
        <Process />
        <HomeFeatures />
        <Stats />
        <HomeTestimonials />
        <HomeBlog />
        <HomeFAQ />
        <CTA />
      </main>
    </div>
  )
}
