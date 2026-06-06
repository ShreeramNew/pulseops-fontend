"use client";

import React from "react";
import { useSelector } from "react-redux";

export default function UptimeCard(): React.JSX.Element {
  const metrics = useSelector((state: any) => state.telemetry.metrics);
  const uptimeRaw = metrics?.uptimeSeconds || 0;

  // Format seconds into a highly digestible string layout
  const formatUptime = (seconds: number) => {
    if (seconds === 0) return "Connecting...";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">System Uptime</span>
      <div className="mt-4">
        <span className="text-2xl font-bold tracking-tight text-slate-100">
          {formatUptime(uptimeRaw)}
        </span>
      </div>
    </div>
  );
}