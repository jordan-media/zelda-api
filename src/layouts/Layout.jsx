import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl";
import { Home, Gamepad2, Heart, Search } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navigationItems = [
    {
      title: "Home",
      url: createPageUrl("Home"),
      icon: Home,
    },
    {
      title: "Saved Collection",
      url: createPageUrl("SavedCollection"),
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6 text-slate-900" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Zelda Collection
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Discover Hyrule's Legacy</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-amber-500/20 text-amber-300 shadow-lg shadow-amber-500/10"
                        : "text-slate-300 hover:text-amber-300 hover:bg-slate-700/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Powered by{" "}
              <a 
                href="https://zelda.fanapis.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Zelda Fan API
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}