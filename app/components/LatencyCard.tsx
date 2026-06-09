"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Zap } from "lucide-react";

export default function LatencyCard(): React.JSX.Element {
  const avgLatencyMs = useSelector((state: any) => state.telemetry.metrics?.avgLatencyMs);

  const isHighLatency = avgLatencyMs > 200;

  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
      
      {/* Top Ribbon Gradient Shift */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase font-mono">
            Average Latency
          </p>
          <h3 className={`text-3xl font-black font-mono tracking-tight ${
            isHighLatency ? "text-amber-400" : "text-cyan-400"
          }`}>
            {avgLatencyMs !== undefined && avgLatencyMs !== null 
              ? `${avgLatencyMs.toFixed(2)} ms` 
              : "--- ms"}
          </h3>
        </div>
        
        <div className={`p-2.5 rounded-lg border group-hover:scale-110 transition-transform duration-300 ${
          isHighLatency 
            ? "bg-amber-500/5 border-amber-500/10 text-amber-400" 
            : "bg-cyan-500/5 border-cyan-500/10 text-cyan-400"
        }`}>
          <Zap className="w-4 h-4" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
        <span className={`w-1.5 h-1.5 rounded-full inline-block ${isHighLatency ? "bg-amber-400" : "bg-cyan-400"}`} />
        <span>{isHighLatency ? "Downstream pipe throttling detected" : "API processing gates running optimal"}</span>
      </div>
    </div>
  );
}