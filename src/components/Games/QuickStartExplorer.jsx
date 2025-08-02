// src/components/QuickStartExplorer.jsx
import React from "react";
import { Button } from "@/components/ui/button";

export default function QuickStartExplorer({ onSelectExample }) {
  const categories = [
    {
      title: "Dungeons",
      examples: ["Forest Temple", "Hyrule Castle"],
    },
    {
      title: "Characters",
      examples: ["Link", "Zelda"],
    },
    {
      title: "Locations",
      examples: ["Kakariko Village", "Death Mountain"],
    },
    {
      title: "Monsters",
      examples: ["Lizalfos", "ReDead"],
    },
    {
      title: "Items",
      examples: ["Master Sword", "Hookshot"],
    },
  ];

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          <p className="text-slate-400 text-lg">Not sure where to start?</p>

          {categories.map((category) => (
            <div key={category.title} className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 transition-shadow">
              <h3 className="text-xl font-semibold text-slate-100 mb-3">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.examples.map((example) => (
                  <Button
                    key={example}
                    variant="ghost"
                    size="sm"
                    className="border border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    onClick={() => onSelectExample(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
