"use client";

import React from "react";
import { ArrowUpRight, Clock } from "lucide-react";

interface RouteProfile {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  hits: number;
  latencyMs: number;
}

// Tailored explicitly to match your core Job Portal schema paths
const mockRoutes: RouteProfile[] = [
  { path: "/api/getJobs", method: "GET", hits: 1420, latencyMs: 42 },
  { path: "/api/applyForJob", method: "PATCH", hits: 610, latencyMs: 118 },
  { path: "/api/upload", method: "POST", hits: 88, latencyMs: 412 },
  { path: "/api/metrics", method: "GET", hits: 2405, latencyMs: 8 },
];

export default function RouteLatencyList(): React.JSX.Element {
  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 backdrop-blur-sm space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold tracking-wide text-slate-200 uppercase font-mono">
            Top Route Performance
          </h3>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded">Live Traffic</span>
      </div>

      <div className="space-y-2">
        {mockRoutes.map((route, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-slate-900/80 hover:border-slate-800 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded w-14 text-center ${
                route.method === "GET" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                route.method === "POST" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {route.method}
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 tracking-tight">
                {route.path}
              </span>
            </div>

            <div className="flex items-center gap-4 text-right font-mono">
              <div className="space-y-0.5">
                <p className={`text-xs font-bold ${route.latencyMs > 200 ? "text-amber-400" : "text-slate-200"}`}>
                  {route.latencyMs} ms
                </p>
                <p className="text-[9px] text-slate-500">{route.hits.toLocaleString()} calls</p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}