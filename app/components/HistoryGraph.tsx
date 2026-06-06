"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { Activity } from "lucide-react";

export default function HistoryGraph(): React.JSX.Element {
  // Subscribe explicitly to the 24-hour unified baseline history state
  const history = useSelector((state: RootState) => state.telemetry.history);

  // Custom styling formatting for chart hover tooltip card
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 p-3 rounded-lg shadow-xl font-mono text-xs space-y-1">
          <p className="text-slate-500 mb-1">
            {new Date(payload[0].payload.timestamp).toLocaleTimeString()}
          </p>
          <p className="text-indigo-400">
            CPU: <span className="text-slate-100 font-bold">{payload[0].value.toFixed(2)}%</span>
          </p>
          <p className="text-cyan-400">
            RAM: <span className="text-slate-100 font-bold">{payload[1].value.toFixed(2)} MB</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-4 h-4 text-indigo-400" />
        <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">
          24-Hour Telemetry Analytics Timeline
        </h2>
      </div>

      <div className="w-full h-72 font-mono text-[10px]">
        {history.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-500 animate-pulse">
            Analyzing baseline data points...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Visual Anchor Gradients */}
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              
              <XAxis 
                dataKey="timestamp" 
                stroke="#475569"
                tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                minTickGap={60}
              />
              
              <YAxis stroke="#475569" domain={[0, 'auto']} />
              
              <Tooltip content={<CustomTooltip />} />

              {/* Area Line for CPU Metrics */}
              <Area
                type="monotone"
                dataKey="cpuUsagePercentage"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#cpuGrad)"
                name="CPU Usage"
              />

              {/* Area Line for RAM Metrics */}
              <Area
                type="monotone"
                dataKey="memoryUsageMB"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#memGrad)"
                name="RAM Allocation"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}