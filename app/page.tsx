'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useTelemetry } from './hooks/useTelemetry';
import { Activity, Cpu, HardDrive, Radio, ShieldAlert } from 'lucide-react';

export default function DashboardHome(): React.JSX.Element {
  // 🔌 Connect this page layout to our live background WebSocket stream
  useTelemetry('ws://localhost:5000');

  // Pull our live real-time state streams from the central Redux engine
  const { metrics, logs, isConnected } = useSelector((state: RootState) => state.telemetry);

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      
      {/* HEADER STATUS BLOCK */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            PulseOps Core
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time infrastructure performance matrix</p>
        </div>

        {/* 1-Second Grasp Visual Anchor: Connection Status Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-300 ${
          isConnected 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
        }`}>
          <Radio className={`w-3.5 h-3.5 ${isConnected ? 'animate-pulse' : ''}`} />
          {isConnected ? 'LIVE FEED ACTIVE' : 'STREAM DISCONNECTED'}
        </div>
      </header>

      {/* METRICS VISUAL GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: CPU UTILIZATION */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">CPU Load</span>
              <p className="text-4xl font-black font-mono tracking-tight text-slate-100">
                {metrics ? `${metrics.cpu}%` : '---'}
              </p>
            </div>
            <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          {/* Dynamic Progress Bar Micro-indicator */}
          <div className="mt-5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300 ease-out"
              style={{ width: metrics ? `${metrics.cpu}%` : '0%' }}
            />
          </div>
        </div>

        {/* CARD 2: MEMORY ALLOCATION */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Memory Footprint</span>
              <p className="text-4xl font-black font-mono tracking-tight text-slate-100">
                {metrics ? `${metrics.memory.percentage}%` : '---'}
              </p>
            </div>
            <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400 font-mono">
            {metrics ? `${metrics.memory.used} GB / ${metrics.memory.total} GB allocated` : 'Collecting allocations...'}
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300 ease-out"
              style={{ width: metrics ? `${metrics.memory.percentage}%` : '0%' }}
            />
          </div>
        </div>

        {/* CARD 3: NETWORK LATENCY */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Network Latency</span>
              <p className="text-4xl font-black font-mono tracking-tight text-slate-100">
                {metrics ? `${metrics.latency}ms` : '---'}
              </p>
            </div>
            <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          {/* 1-Second Grasp System Health Anchor */}
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold tracking-wide">
            <span className={`w-2 h-2 rounded-full ${
              metrics?.status === 'CRITICAL' ? 'bg-rose-500 animate-ping' :
              metrics?.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <span className={
              metrics?.status === 'CRITICAL' ? 'text-rose-400 font-black' :
              metrics?.status === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'
            }>
              SYSTEM STATUS: {metrics ? metrics.status : 'INITIALIZING'}
            </span>
          </div>
        </div>

      </section>

      {/* RECENT EXCEPTION LOG STREAM */}
      <section className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">Runtime Logs Exception Stream</h2>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800">
          {logs.length === 0 ? (
            <p className="text-slate-500 text-center py-24 animate-pulse">Waiting for network exception anomalies...</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-4 border-b border-slate-900/50 pb-2 last:border-none last:pb-0">
                <span className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded w-16 text-center ${
                  log.level === 'critical' ? 'bg-rose-900/40 text-rose-400 border border-rose-500/20' :
                  log.level === 'error' ? 'bg-amber-900/30 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {log.level}
                </span>
                <span className="text-slate-500 font-semibold text-[11px]">{log.service}</span>
                <span className="text-slate-300 flex-1 break-all">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </section>

    </main>
  );
}