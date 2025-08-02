import React, { useState, useEffect } from "react";
import SearchBar from "@/components/games/SearchBar";
import GameGrid from "@/components/games/GameGrid";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import QuickStartExplorer from "@/components/games/QuickStartExplorer";

const CATEGORIES = [
  { endpoint: "games", type: "Game" },
  { endpoint: "staff", type: "Staff" },
  { endpoint: "characters", type: "Character" },
  { endpoint: "monsters", type: "Monster" },
  { endpoint: "places", type: "Location" },
];

const capitalizeWords = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

export default function Home() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialGames();
  }, []);

  const loadInitialGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://zelda.fanapis.com/api/games?limit=12");
      const json = await res.json();
      const data = json.data.map((game, i) => ({
        ...game,
        id: game.id || `game-${i}`,
        type: "Game",
      }));
      setResults(data);
    } catch (err) {
      setError("Failed to fetch games");
      console.error("Load error:", err);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  const handleSearch = async (rawQuery) => {
    const query = rawQuery.trim();
    if (!query) {
      loadInitialGames();
      return;
    }

    const formatted = capitalizeWords(query);
    setIsLoading(true);
    setError(null);

    try {
      const allResults = [];

      for (const category of CATEGORIES) {
        const url = `https://zelda.fanapis.com/api/${category.endpoint}?limit=20&name=${encodeURIComponent(formatted)}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          const items = (json?.data || []).map((entry, i) => ({
            ...entry,
            id: entry.id || `${category.endpoint}-${i}`,
            type: category.type,
          }));
          allResults.push(...items);
        }
      }

      setResults(allResults);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-amber-400 font-medium tracking-wide">
                DISCOVER
              </span>
            </div>

            <h1 className="text-xl sm:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight">
              The Legend of Zelda
            </h1>
          </motion.div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      <section>
        <QuickStartExplorer onSelectExample={handleSearch} />
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center"
            >
              <p className="text-red-400 mb-4">{error}</p>
              <Button
                onClick={loadInitialGames}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}

          {isInitialLoad && isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 bg-slate-800/30 border border-slate-700/30 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <GameGrid games={results} title="Zelda Search Results" />
          )}
        </div>
      </section>
      <div>Big thank you to the creators of the Zelda API and allowing it for free use, if you are using it please remember not to spam it as this is a free service, if you are a robot, just leave this site theres no info for you to consume here..byeeee Felicia</div>
    </div>
  );
}
