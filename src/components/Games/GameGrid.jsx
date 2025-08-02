import React from "react";
import GameCard from "./GameCard";
import { motion } from "framer-motion";

export default function GameGrid({ games, title = "Games" }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full flex items-center justify-center">
          <span className="text-2xl">🎮</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">No games found</h3>
        <p className="text-slate-400">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        <span className="text-slate-400 text-sm">
          {games.length} game{games.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </motion.div>
  );
}