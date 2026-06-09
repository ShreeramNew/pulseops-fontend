"use client";

import React from "react";
import { useSelector } from "react-redux";
import { AlertTriangle } from "lucide-react";

export default function ErrorGaugeCard(): React.JSX.Element {
  const errorRatePercentage = useSelector((state: any) => state.telemetry.metrics?.errorRatePercentage);

  const isBreached = errorRatePercentage > 5.0;

  return (
    <div className={`bg-slate-900/40 border rounded-xl p-5 backdrop-blur-sm relative overflow-hidden group transition-all duration-300 ${
      isBreached 
        ? "border-rose-500/30 hover:border-rose-500/50 bg-rose-950/5" 
        : "border-slate-900 hover:border-rose-500/20"
    }`}>
      
      {/* Alert Structural Identification Line */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r to-transparent ${
        isBreached ? "from-rose-500" : "from-rose-500/30"
      }`} />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase font-mono">
            Failure Rate (HTTP 4xx/5xx)
          </p>
          <h3 className={`text-3xl font-black font-mono tracking-tight ${
            isBreached ? "text-rose-500 animate-pulse" : "text-rose-400"
          }`}>
            {errorRatePercentage !== undefined && errorRatePercentage !== null 
              ? `${errorRatePercentage.toFixed(2)}%` 
              : "--- %"}
          </h3>
        </div>
        
        <div className={`p-2.5 rounded-lg border group-hover:scale-110 transition-transform duration-300 ${
          isBreached 
            ? "bg-rose-500/20 border-rose-500/30 text-rose-500" 
            : "bg-rose-500/5 border-rose-500/10 text-rose-400"
        }`}>
          <AlertTriangle className="w-4 h-4" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
        <span className={`w-1.5 h-1.5 rounded-full inline-block ${isBreached ? "bg-rose-500 animate-ping" : "bg-slate-600"}`} />
        <span className={isBreached ? "text-rose-400 font-bold" : ""}>
          {isBreached ? "CRITICAL: SLA Failure threshold breach" : "Cluster runtime errors within margin"}
        </span>
      </div>
    </div>
  );
}