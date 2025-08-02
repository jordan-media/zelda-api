// src/components/ui/input.jsx
import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`block w-full rounded-xl border border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${className}`}
      {...props}
    />
  );
});
