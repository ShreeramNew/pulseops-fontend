"use client";

import React from "react";
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

export default function DashboardHome(): React.JSX.Element {
  // Establish native WebSocket ingestion channel connectivity loops
  useTelemetry();

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
          
          {/* Edge Connection Badge Anchor */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-[11px] backdrop-blur-sm self-stretch sm:self-auto justify-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">Ingestion Channel Active</span>
          </div>
        </header>

        {/* 🧠 2. INTELLIGENCE SUITE: GENI AI LOG TRIAGE DIAGNOSTICS */}
        <div className="w-full">
          <AiDiagnosisBanner />
        </div>

        {/* 🎛️ 3. HARDWARE & APM METRICS MATRIX BLOCK */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
            Cluster Metrics Grid
          </h2>
          
          {/* Responsive 1-2-3 Grid Engine */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CpuCard />
            <MemoryCard />
            <TrafficCard />
            <LatencyCard />
            <ErrorGaugeCard />
            <UptimeCard />
          </section>
        </div>

        {/* 📊 4. ANALYTICS OBSERVABILITY GRID WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Left Column Layout: Historical Analytics Timeline */}
          <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
              Time Series Analytics (Rolling 24H)
            </h2>
            <div className="flex-1 bg-slate-900/10 border border-slate-900 rounded-xl p-2 min-h-[340px] flex flex-col justify-center">
              <HistoryGraph />
            </div>
          </div>

          {/* Right Column Layout: Active Ingestion Paths */}
          <div className="flex flex-col space-y-3 h-full">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
              Endpoint Distribution Matrix
            </h2>
            <div className="flex-1 h-full">
              <RouteLatencyList />
            </div>
          </div>

        </div>

        {/* 📋 5. LIVE RUNTIME CONSOLE DATA FEED */}
        <div className="space-y-3 pt-2">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
            System Event Output Stream (Standard Output)
          </h2>
          <section className="bg-slate-900/10 border border-slate-900 rounded-xl p-1 overflow-hidden">
            <LogStream />
          </section>
        </div>
        
      </div>
    </div>
  );
}