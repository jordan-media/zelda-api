import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl";
import { Calendar, ExternalLink, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GameCard({ game, index = 0, onRemove }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="group h-full"
        >
            <Card className="bg-slate-800/50 border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden h-[450px] flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-2">
                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                                {game.name}
                            </h3>
                            {game.released_date && (
                                <div className="flex items-center gap-2 mt-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-400">{game.released_date}</span>
                                </div>
                            )}
                        </div>
                        {onRemove && (
                            <Button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(game.id); }}
                                variant="ghost"
                                size="icon"
                                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 shrink-0"
                                aria-label="Remove from collection"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    <div className="flex-grow space-y-4">
                        {/* Description */}
                        {game.description && (
                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                                {game.description}
                            </p>
                        )}

                        {/* Developer/Publisher */}
                        <div className="flex flex-wrap gap-2">
                            {game.developer && (
                                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600">
                                    {game.developer}
                                </Badge>
                            )}
                            {game.publisher && game.publisher !== game.developer && (
                                <Badge variant="outline" className="border-slate-600 text-slate-400">
                                    {game.publisher}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 mt-auto">
                        <Link
                            to={createPageUrl(`GameDetail?id=${game.id}`)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 group/btn"
                        >
                            <span>View Details</span>
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}