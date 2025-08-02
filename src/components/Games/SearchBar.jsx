import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch, isLoading = false }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Search for Zelda games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-32 text-lg bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder:text-slate-400 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-2xl transition-all duration-300"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-400 transition-colors duration-300" />
          
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}