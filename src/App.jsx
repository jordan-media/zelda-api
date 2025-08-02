// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";
import GameDetail from "@/pages/GameDetail";
import SavedCollection from "@/pages/SavedCollection";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GameDetail" element={<GameDetail />} />
          <Route path="/SavedCollection" element={<SavedCollection />} />
          <Route path="*" element={<div className="text-center p-20 text-slate-300 text-xl">404 – Page Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
