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

// New control and tracking panels:
import RouteLatencyList from "./components/RouteLatencyList";
import TimeRangeSelector from "./components/TimeRangeSelector";
import ResetClusterButton from "./components/ResetClusterButton";

export default function DashboardHome(): React.JSX.Element {
  // Execute the telemetry hook without arguments to use the cloud ws fallback automatically
  useTelemetry();

  console.log("🏗️ Main Dashboard Layout Shell Rendered");

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8 text-slate-100 max-w-7xl mx-auto space-y-6 selection:bg-cyan-500/30">
      
      {/* 🔝 GLOBAL HEADER SYSTEM */}
      <header className="border-b border-slate-900/80 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            PulseOps Core
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Production Cluster Tracking • Live Ingestion Channel
          </p>
        </div>
        
        {/* Interactive Action Header Elements */}
        <div className="flex items-center gap-3">
          <ResetClusterButton />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 font-mono text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">Stream Node Active</span>
          </div>
        </div>
      </header>

      {/* 🧠 DIAGNOSTICS: GENI AI SYSTEM LOG TRIAGE */}
      <AiDiagnosisBanner />

      {/* 🎛️ INFRASTRUCTURE: HOST NODE VITAL SIGNS (HARDWARE METRICS) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
          Host Node Vital Signs
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <CpuCard />
          <MemoryCard />
          <UptimeCard />
        </section>
      </div>

      {/* 🚀 APPLICATION: APM PERFORMANCE OBSERVABILITY (SOFTWARE METRICS) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
          Application Performance Monitoring (APM)
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TrafficCard />
          <LatencyCard />
          <ErrorGaugeCard />
        </section>
      </div>

      {/* 📊 ANALYTICS: ASYMMETRIC CONTROL GRID VIEWPORTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column Span: Historical Chart Ecosystem */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
              Metrics Time Series History
            </h2>
            <TimeRangeSelector />
          </div>
          <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-1 h-full">
            <HistoryGraph />
          </div>
        </div>

        {/* Right Column Span: Granular Route Micro-Vitals */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
            Route Observability
          </h2>
          <RouteLatencyList />
        </div>

      </div>

      {/* 📋 LOGS: RAW STREAM LOGGER RUNTIME FIELD */}
      <div className="space-y-2 pt-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-mono pl-1">
          Standard Output Log Feed
        </h2>
        <section className="bg-slate-900/20 border border-slate-900 rounded-xl p-1">
          <LogStream />
        </section>
      </div>
      
    </main>
  );
}