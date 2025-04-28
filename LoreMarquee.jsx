import { useRef, useEffect } from 'react';

export default function LoreMarquee() {
  const containerRef = useRef(null);
  
  // Lore snippets - these would come from a data source in a real app
  const loreSnippets = [
    "Old survival grinds beneath your teeth…",
    "Trust. Collaboration. Flow.",
    "The Oracle speaks through ripples in time.",
    "Seven realms, seven keys to unlock the ancient wisdom.",
    "What sleeps beneath the digital waves?",
    "The Machine Archipelago hums with forgotten code.",
    "Governance flows like water, not carved in stone.",
    "In the Coral Forest, ideas bloom in fractal patterns.",
    "The Iron Citadel stands guard at the edge of possibility.",
    "Whispers from the Sunken Library echo across networks.",
    "The Veiled Spring nourishes those who seek truth.",
  ];
  
  // Duplicate the snippets to ensure continuous scrolling
  const allSnippets = [...loreSnippets, ...loreSnippets];
  
  return (
    <div className="w-full bg-black/50 py-4 overflow-hidden border-y border-cyan-500/30">
      <div 
        ref={containerRef}
        className="whitespace-nowrap animate-marquee inline-block"
      >
        {allSnippets.map((snippet, index) => (
          <span 
            key={index} 
            className="px-8 text-lg font-display text-cyan-300 italic"
          >
            "{snippet}"
          </span>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
