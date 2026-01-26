import React from "react";
import { FeaturesHero } from "./components/FeaturesHero";
import { FeaturesProcess } from "./components/FeaturesProcess";
import { FeaturesDeepDive } from "./components/FeaturesDeepDive";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { FeaturesCTA } from "./components/FeaturesCTA";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden scroll-smooth " style={{ scrollBehavior: "smooth" }}>
      <FeaturesHero />
      <FeaturesProcess />
      <FeaturesDeepDive />
      <FeaturesGrid />
      <FeaturesCTA />
    </div>
  );
}
