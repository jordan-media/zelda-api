// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`rounded-xl border p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`${className}`}>{children}</div>;
}
