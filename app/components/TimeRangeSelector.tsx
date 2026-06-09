"use client";

import React, { useState } from "react";

type TimeRange = "1H" | "6H" | "24H" | "7D";

export default function TimeRangeSelector(): React.JSX.Element {
  const [activeRange, setActiveRange] = useState<TimeRange>("24H");
  const ranges: TimeRange[] = ["1H", "6H", "24H", "7D"];

  return (
    <div className="flex items-center bg-slate-950 border border-slate-900 p-1 rounded-lg">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => setActiveRange(range)}
          className={`px-3 py-1 text-[11px] font-mono font-bold uppercase transition-all duration-200 rounded-md ${
            activeRange === range
              ? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm"
              : "text-slate-500 hover:text-slate-300 border border-transparent"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}