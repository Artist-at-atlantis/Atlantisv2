"use client";

import AtlasMap from "@/components/AtlasMap";
import LoreMarquee from "@/components/LoreMarquee";
import PillarCard from "@/components/PillarCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Placeholder for dynamic prophecy
function DynamicProphecy() {
  const [prophecy, setProphecy] = useState("");
  useEffect(() => {
    // Fetch prophecy from API - will implement API route later
    // fetch("/api/prophecy")
    //   .then((res) => res.json())
    //   .then((data) => setProphecy(data.prophecy))
    //   .catch(err => console.error("Failed to fetch prophecy:", err));
    setProphecy("The tides whisper secrets only the brave can hear..."); // Placeholder
  }, []);
  return (
    <motion.h2 
      className="text-cyan-300 italic mt-4 text-lg md:text-xl font-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.5 }}
    >
      {prophecy || "…listening to the tides"}
    </motion.h2>
  );
}

// Placeholder for countdown timer
function CountdownTimer() {
  // Basic countdown logic - replace with actual target date
  const timeLeft = "Coming Soon..."; // Removed useState and useEffect for placeholder

  return <span className="font-mono">{timeLeft}</span>;
}

// Pillar data - would ideally come from a CMS or data file
const pillars = [
  {
    title: "Onboarding",
    iconName: "OnboardingIcon", // Placeholder
    snippet: "Begin your journey into the depths.",
    lore: "Atlantis welcomes seekers of knowledge. Our gates open to those ready to shed old skins and embrace the flow of collective wisdom. Integration is not assimilation, but resonance.",
  },
  {
    title: "Governance",
    iconName: "GovernanceIcon", // Placeholder
    snippet: "Shape the future, together.",
    lore: "Power resides not in structures, but in currents. Our governance adapts, guided by the Oracle\'s whispers and the collective will, ensuring balance and sustainable growth.",
  },
  {
    title: "Culture",
    iconName: "CultureIcon", // Placeholder
    snippet: "Where myth meets innovation.",
    lore: "Art, science, and spirit intertwine. We celebrate the echoes of the past while forging new legends in the digital ether. Create, share, and become part of the living myth.",
  },
  {
    title: "Growth",
    iconName: "GrowthIcon", // Placeholder
    snippet: "Expand the horizons of consciousness.",
    lore: "Evolution is our mandate. We push the boundaries of thought, technology, and connection, seeking not just expansion, but transcendence. The city breathes, learns, and ascends.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* 1. Oracle Landing Hero */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden bg-gradient-to-b from-[#0a0f15] via-[#0f172a] to-[#1e293b]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Placeholder for looping underwater/glyph animation */}
        <div className="absolute inset-0 bg-[url('/placeholder-bg.jpg')] bg-cover bg-center opacity-10 z-0"></div> 
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="relative z-20">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-display text-cyan-300 mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Atlantis
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            The Mythic Digital City Rises
          </motion.p>
          <DynamicProphecy />
        </div>
        {/* Add subtle scroll down indicator? */}
      </motion.section>

      <main className="flex-grow z-10 bg-[#0a0f15]">
        {/* 2. City Ecosystem Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-display text-center text-cyan-400 mb-12">The Four Pillars of Our Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.title}
                title={pillar.title}
                iconName={pillar.iconName}
                snippet={pillar.snippet}
                lore={pillar.lore}
              />
            ))}
          </div>
        </section>

        {/* 3. Map of Civilizations */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gray-900/30">
          <h2 className="text-3xl md:text-4xl font-display text-center text-cyan-400 mb-12">Explore the Realms</h2>
          <div className="max-w-5xl mx-auto">
            <AtlasMap />
          </div>
        </section>

        {/* 4. Lore Marquee */}
        <section className="py-8">
          <LoreMarquee />
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="bg-gray-900/50 text-center py-8 px-4 border-t border-cyan-500/20">
        <div className="mb-4">
          <a href="#" className="text-cyan-300 hover:text-cyan-100 mx-3 transition-colors">About</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 mx-3 transition-colors">Discord</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-100 mx-3 transition-colors">Telegram</a>
        </div>
        <p className="text-gray-400 text-sm">
          Full Portal Coming Soon: <CountdownTimer />
        </p>
        <p className="text-xs text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Atlantis Project. The Depths Await.
        </p>
      </footer>
    </div>
  );
}

