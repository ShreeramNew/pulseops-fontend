"use client";

import React, { useState, useEffect } from "react";
import { useTelemetry } from "./hooks/useTelemetry";
import CpuCard from "./components/CpuCard";
import MemoryCard from "./components/MemoryCard";
import UptimeCard from "./components/UptimeCard";
import TrafficCard from "./components/TrafficCard";
import LatencyCard from "./components/LatencyCard";
import ErrorGaugeCard from "./components/ErrorGaugeCard";
import AiDiagnosisBanner from "./components/AiDiagnosisBanner";
import LogStream from "./components/LogStream";
import HistoryGraph from "./components/HistoryGraph";
import RouteLatencyList from "./components/RouteLatencyList";
import { HelpCircle, ExternalLink, X, Activity, Radio } from "lucide-react";

export default function DashboardHome(): React.JSX.Element {
  // Start the live data stream connection
  useTelemetry();

  // Keep track of whether the welcome box is open
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("pulseops_returning_user");
      return !hasVisited;
    }
    return false; // Safe fallback for the server
  });

  // Remember the user so the box doesn't pop up next time
  useEffect(() => {
    if (typeof window !== "undefined" && showWelcomeModal) {
      localStorage.setItem("pulseops_returning_user", "true");
    }
  }, [showWelcomeModal]);

  console.log("🏗️ High-Density Responsive Layout Shell Rendered");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
        {/* 🔝 1. GLOBAL PLATFORM HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                PulseOps Core
              </h1>
              <span className="hidden sm:inline-flex items-center rounded bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400 border border-cyan-500/20 font-mono">
                v2.1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Production Cluster Telemetry Stream Node Active
            </p>
          </div>

          {/* Connection Badge & Info Button */}
          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
            {/* Info Button to reopen the welcome box anytime */}
            <button
              onClick={() => setShowWelcomeModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/40 hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 font-mono text-[11px] text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
              title="About this project"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xs:inline">Info</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-[11px] backdrop-blur-sm flex-1 sm:flex-initial justify-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400">Ingestion Channel Active</span>
            </div>
          </div>
        </header>

        {/* 🧠 2. INTELLIGENCE SUITE */}
        <div className="w-full">
          <AiDiagnosisBanner />
        </div>

        {/* 🎛️ 3. METRICS GRID */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
            Cluster Metrics Grid
          </h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CpuCard />
            <MemoryCard />
            <TrafficCard />
            <LatencyCard />
            <ErrorGaugeCard />
            <UptimeCard />
          </section>
        </div>

        {/* 📊 4. CHARTS AND ROUTES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
              Time Series Analytics (Rolling 24H)
            </h2>
            <div className="flex-1 bg-slate-900/10 border border-slate-900 rounded-xl p-2 min-h-[340px] flex flex-col justify-center">
              <HistoryGraph />
            </div>
          </div>

          <div className="flex flex-col space-y-3 h-full">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
              Endpoint Distribution Matrix
            </h2>
            <div className="flex-1 h-full">
              <RouteLatencyList />
            </div>
          </div>
        </div>

        {/* 📋 5. LIVE RUNTIME CONSOLE */}
        <div className="space-y-3 pt-2">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
            System Event Output Stream (Standard Output)
          </h2>
          <section className="bg-slate-900/10 border border-slate-900 rounded-xl p-1 overflow-hidden">
            <LogStream />
          </section>
        </div>
      </div>

      {/* 🚀 SIMPLIFIED WELCOME BOX */}
      {showWelcomeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowWelcomeModal(false)}
        >
          <div
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOX HEADER */}
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold tracking-wide text-slate-200 uppercase font-mono">
                  Welcome to PulseOps
                </h3>
              </div>
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="text-slate-500 hover:text-slate-200 p-1 rounded-lg bg-slate-950/40 border border-slate-900/60 hover:border-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SIMPLIFIED MESSAGE BODY */}
            <div className="space-y-3 font-mono text-xs text-slate-400 leading-relaxed">
              <p>
                This dashboard tracks how well our server is running by showing
                live charts, speeds, and error logs.
              </p>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-950 text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px] uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  Connected to JobNow
                </div>
                <p className="text-[11px] text-slate-400">
                  This page gets its live data directly from the JobNow website:
                </p>
                <a
                  href="https://jobnow24.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-bold break-all transition-colors"
                >
                  https://jobnow24.vercel.app/
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <p className="text-[11px] border-l-2 border-slate-700 pl-3 italic text-slate-500">
                How to test it: Open the JobNow website and click around (look
                for jobs, create posts, etc.). As you use it, you will see the
                numbers jump and lines update on this dashboard instantly!
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 pt-2 border-t border-slate-800/40">
              <a
                href="https://jobnow24.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-1.5 px-4 py-2 text-xs font-bold font-mono text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-lg shadow transition-all duration-150 transform active:scale-[0.98]"
              >
                Open JobNow Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="px-4 py-2 text-xs font-bold font-mono text-slate-300 hover:text-slate-100 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/60 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
