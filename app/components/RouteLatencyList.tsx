"use client";

import React from "react";
import { useSelector } from "react-redux";
import { ArrowUpRight, Clock, Inbox } from "lucide-react";
import { RouteProfile } from "../features/telemetrySlice";

export default function RouteLatencyList(): React.JSX.Element {
  // 🛰️ Select real-time dynamic path arrays directly from your live metrics channel
  const routes = useSelector((state: any) => state.telemetry.metrics?.routes) as RouteProfile[] | undefined;

  // Dynamically sort endpoints to prioritize highest traffic load factors
  const sortedRoutes = routes ? [...routes].sort((a, b) => b.hits - a.hits) : [];

  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 backdrop-blur-sm space-y-4 min-h-[310px] flex flex-col justify-between">
      
      <div className="space-y-4 flex-1">
        {/* HEADER PANEL */}
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold tracking-wide text-slate-200 uppercase font-mono">
              Top Route Performance
            </h3>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded animate-pulse">
            Live Stream
          </span>
        </div>

        {/* CONDITION VIEWPORT GRID */}
        {sortedRoutes.length === 0 ? (
          /* Empty State Fallback Viewport */
          <div className="flex flex-col items-center justify-center py-14 text-slate-600 space-y-2 h-full">
            <Inbox className="w-7 h-7 text-slate-800 stroke-[1.5]" />
            <p className="text-xs font-mono">Waiting for real traffic metrics...</p>
          </div>
        ) : (
          /* Live Population Matrix Mapping Real Inputs */
          <div className="space-y-2 overflow-y-auto max-h-[260px] pr-1 scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent">
            {sortedRoutes.map((route, index) => (
              <div 
                key={`${route.method}-${route.path}-${index}`} 
                className="flex justify-between items-center p-3 rounded-lg bg-slate-950/40 border border-slate-900/80 hover:border-slate-800 transition-colors duration-200 group"
              >
                {/* Method Badge & Normalized String Endpoint */}
                <div className="flex items-center gap-3 overflow-hidden mr-2">
                  <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded w-14 text-center shrink-0 ${
                    route.method === "GET" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    route.method === "POST" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                    route.method === "PATCH" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}>
                    {route.method}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-300 tracking-tight truncate">
                    {route.path}
                  </span>
                </div>

                {/* Real-time Tickers */}
                <div className="flex items-center gap-4 text-right font-mono shrink-0">
                  <div className="space-y-0.5">
                    <p className={`text-xs font-bold ${route.latencyMs > 200 ? "text-amber-400" : "text-slate-200"}`}>
                      {route.latencyMs} ms
                    </p>
                    <p className="text-[9px] text-slate-500">{route.hits.toLocaleString()} calls</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER METADATA LABEL */}
      <div className="text-[10px] text-slate-600 font-mono border-t border-slate-900 pt-3 mt-2">
        Dynamic telemetry profiling verified via production loop.
      </div>
    </div>
  );
}