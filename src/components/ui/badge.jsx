// src/components/ui/badge.jsx
import React from "react";

export function Badge({ children, className = "", variant = "default" }) {
  const base = "inline-flex items-center rounded-full text-xs font-medium px-2.5 py-0.5";
  const variants = {
    default: "bg-slate-700 text-white",
    outline: "border border-slate-500 text-slate-300",
    secondary: "bg-slate-600 text-slate-200",
  };

  return (
    <span className={`${base} ${variants[variant] || ""} ${className}`}>
      {children}
    </span>
  );
}
