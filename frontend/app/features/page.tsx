import React from "react";
import { FeaturesHero } from "./components/FeaturesHero";
import { FeaturesProcess } from "./components/FeaturesProcess";
import { FeaturesDeepDive } from "./components/FeaturesDeepDive";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { FeaturesCTA } from "./components/FeaturesCTA";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden scroll-smooth relative" style={{ scrollBehavior: "smooth" }}>
      <div className="fixed inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <main className="relative z-10">
        <FeaturesHero />
        <FeaturesProcess />
        <FeaturesDeepDive />
        <FeaturesGrid />
        <FeaturesCTA />
      </main>
    </div>
  );
}
