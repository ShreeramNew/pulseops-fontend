'use client';

import React from 'react';
import { useTelemetry } from './hooks/useTelemetry';
import CpuCard from './components/CpuCard';
import LogStream from './components/LogStream';

export default function DashboardHome(): React.JSX.Element {
  // Open the connection once at the root layout point
  useTelemetry('ws://localhost:5000');

  // 🧠 CRITICAL PERFORMANCE NOTE: 
  // Because there is no useSelector here anymore, this component compiles and stands completely still. 
  // It runs EXACTLY ONCE on initial page load, and NEVER re-renders again!
  console.log("🏗️ Main Dashboard Layout Shell Rendered"); 

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      <header className="border-b border-slate-800 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-slate-100">PulseOps Core</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CpuCard />
        {/* You can extract MemoryCard and LatencyCard exactly the same way! */}
      </section>

      <LogStream />
    </main>
  );
}