import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Calendar, User, Building, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function GameDetail() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isTogglingSave, setIsTogglingSave] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    
    if (gameId) {
      loadGameDetails(gameId);
      checkIfSaved(gameId);
    } else {
      navigate(createPageUrl("Home"));
    }
  }, [navigate]);

  const loadGameDetails = async (gameId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://zelda.fanapis.com/api/games/${gameId}`);
      if (!response.ok) throw new Error('Game not found');
      
      const data = await response.json();
      setGame(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading game details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSaved = (gameId) => {
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
    setIsSaved(savedGames.some(g => g.id === gameId));
  };

  const toggleSave = async () => {
    if (!game) return;
    
    setIsTogglingSave(true);
    
    try {
      const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
      
      if (isSaved) {
        // Remove from saved
        const updatedGames = savedGames.filter(g => g.id !== game.id);
        localStorage.setItem('savedGames', JSON.stringify(updatedGames));
        setIsSaved(false);
      } else {
        // Add to saved
        const gameToSave = {
          ...game,
          savedAt: new Date().toISOString()
        };
        savedGames.push(gameToSave);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error toggling save:', err);
    } finally {
      setIsTogglingSave(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-slate-700/30 rounded-xl w-48" />
            <div className="h-96 bg-slate-700/30 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-slate-300 mb-4">Game Not Found</h1>
          <p className="text-slate-400 mb-8">{error || 'The requested game could not be loaded.'}</p>
          <Button
            onClick={() => navigate(createPageUrl("Home"))}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate(createPageUrl("Home"))}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>

            <Button
              onClick={toggleSave}
              disabled={isTogglingSave}
              className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                isSaved
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900"
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Saved
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  Save to Collection
                </>
              )}
            </Button>
          </div>

          {/* Game Details Card */}
          <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
            <CardHeader className="pb-6">
              <div className="space-y-4">
                <CardTitle className="text-3xl sm:text-4xl font-bold text-slate-100 leading-tight">
                  {game.name}
                </CardTitle>
                
                <div className="flex flex-wrap gap-3">
                  {game.released_date && (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-3 py-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {game.released_date}
                    </Badge>
                  )}
                  {game.developer && (
                    <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 px-3 py-1">
                      <User className="w-4 h-4 mr-2" />
                      {game.developer}
                    </Badge>
                  )}
                  {game.publisher && (
                    <Badge variant="outline" className="border-slate-600 text-slate-400 px-3 py-1">
                      <Building className="w-4 h-4 mr-2" />
                      {game.publisher}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {game.description && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-3">Description</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {game.description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-700/50">
                {Object.entries(game)
                  .filter(([key, value]) => 
                    !['id', 'name', 'description', 'developer', 'publisher', 'released_date'].includes(key) &&
                    value && 
                    typeof value === 'string' &&
                    value.trim() !== ''
                  )
                  .map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        {key.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-slate-200">{value}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}