
import React, { useState, useEffect } from "react";
import GameCard from "@/components/games/GameCard"; // Assuming this is the correct path for the new GameCard component
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl";
import { Heart, Sparkles } from "lucide-react"; // Removed Calendar, ExternalLink, Trash2 as they are now in GameCard
import { motion, AnimatePresence } from "framer-motion";

export default function SavedCollection() {
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    loadSavedGames();
  }, []);

  const loadSavedGames = () => {
    const games = JSON.parse(localStorage.getItem('savedGames') || '[]');
    setSavedGames(games);
  };

  const removeFromCollection = (gameId) => {
    const updatedGames = savedGames.filter(game => game.id !== gameId);
    setSavedGames(updatedGames);
    localStorage.setItem('savedGames', JSON.stringify(updatedGames));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-amber-400 font-medium tracking-wide">YOUR COLLECTION</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
              Saved Games
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your personal collection of favorite Zelda games
            </p>

            {savedGames.length > 0 && (
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <Heart className="w-4 h-4 text-amber-400" />
                <span>{savedGames.length} game{savedGames.length !== 1 ? 's' : ''} saved</span>
              </div>
            )}
          </div>

          {/* Games Grid */}
          {savedGames.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-700/30 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-4">No saved games yet</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Start building your collection by exploring and saving your favorite Zelda games.
              </p>
              <Link to={createPageUrl("Home")}>
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover Games
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {savedGames.map((game, index) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    index={index}
                    onRemove={removeFromCollection} // Pass the function directly
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
