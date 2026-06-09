"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Activity } from "lucide-react";

export default function TrafficCard(): React.JSX.Element {
  // Read target data point directly from isolated slice state
  const totalRequests = useSelector((state: any) => state.telemetry.metrics?.totalRequests);

  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
      
      {/* Visual Anchor Top Ribbon */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent" />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase font-mono">
            Throughput (Total)
          </p>
          <h3 className="text-3xl font-black font-mono tracking-tight text-emerald-400">
            {totalRequests !== undefined && totalRequests !== null 
              ? totalRequests.toLocaleString() 
              : "---"}
          </h3>
        </div>
        
        <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
        <span>Tracking raw edge request ingestion counters</span>
      </div>
    </div>
  );
}