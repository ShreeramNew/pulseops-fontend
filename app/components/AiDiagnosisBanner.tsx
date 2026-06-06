"use client";

import React from "react";
import { useSelector } from "react-redux";

export default function AiDiagnosisBanner(): React.JSX.Element | null {
  const aiDiagnosis = useSelector((state: any) => state.telemetry.aiDiagnosis);

  // If there are no errors in the stream, return null to keep the layout clean
  if (!aiDiagnosis) return null;

  // Split lines cleanly for presentation layout
  const lines = aiDiagnosis.split("\n").filter((l: string) => l.trim() !== "");

  return (
    <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
      {/* Design Background Glow */}
      <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">🧠</span>
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Gemini Flash Real-Time Triage Report
          </h3>
          <div className="text-sm space-y-1 font-medium text-slate-200">
            {lines.map((line: string, index: number) => (
              <p key={index} className={index === 0 ? "text-amber-200" : "text-emerald-400 font-mono text-xs bg-slate-950/60 p-2 rounded border border-slate-900 mt-1"}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}