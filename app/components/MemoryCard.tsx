"use client";

import React from "react";
import { useSelector } from "react-redux";

export default function MemoryCard(): React.JSX.Element {
  const metrics = useSelector((state: any) => state.telemetry.metrics);
  
  // Format numbers cleanly
  const memoryUsed = metrics?.memoryUsageMB ? metrics.memoryUsageMB.toFixed(2) : "0.00";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">RAM Allocation</span>
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-black tracking-tight text-slate-100">{memoryUsed}</span>
        <span className="text-sm font-medium text-slate-500">MB</span>
      </div>
    </div>
  );
}