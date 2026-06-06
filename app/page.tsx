"use client";

import React from "react";
import { useTelemetry } from "./hooks/useTelemetry";
import CpuCard from "./components/CpuCard";
import MemoryCard from "./components/MemoryCard";
import UptimeCard from "./components/UptimeCard";
import AiDiagnosisBanner from "./components/AiDiagnosisBanner";
import LogStream from "./components/LogStream";
import HistoryGraph from "./components/HistoryGraph";

export default function DashboardHome(): React.JSX.Element {
  // Execute the telemetry hook without arguments to use the cloud ws fallback automatically
  useTelemetry();

  // 🧠 CRITICAL PERFORMANCE NOTE:
  // Because there is no useSelector here, this main page layout shell renders exactly ONCE
  // and stands completely still. Data renders happen exclusively inside isolated sub-components!
  console.log("🏗️ Main Dashboard Layout Shell Rendered");

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100 max-w-7xl mx-auto space-y-6">
      <header className="border-b border-slate-900 pb-5">
        <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          PulseOps Core
        </h1>
      </header>

      <AiDiagnosisBanner />

      {/* METRICS METADATA VIEWPORT */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CpuCard />
        <MemoryCard />
        <UptimeCard />
      </section>

      {/* 📊 THE HISTORY TIMELINE LINE-CHART */}
      <HistoryGraph />

      {/* LOG STREAM OVERVIEW */}
      <LogStream />
    </main>
  );
}
