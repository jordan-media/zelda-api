// src/components/ui/button.jsx
import React from "react";

export const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      default: "bg-amber-500 hover:bg-amber-600 text-slate-900",
      outline: "border border-slate-600 text-slate-300 hover:bg-slate-700/50",
      ghost: "hover:bg-slate-700/30 text-slate-300",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3",
      lg: "h-12 px-6",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
