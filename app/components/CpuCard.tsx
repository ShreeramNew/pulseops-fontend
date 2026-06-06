'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Cpu } from 'lucide-react';

export default function CpuCard(): React.JSX.Element {
  // This component ONLY listens to live metrics changes
  const metrics = useSelector((state: RootState) => state.telemetry.metrics);
  const cpuVal = metrics?.cpuUsagePercentage ?? null;

  return (
    <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 relative overflow-hidden backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">CPU Load</span>
          <p className="text-4xl font-black font-mono tracking-tight text-slate-100">
            {cpuVal !== null ? `${cpuVal.toFixed(1)}%` : '---'}
          </p>
        </div>
        <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
          <Cpu className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300 ease-out"
          style={{ width: cpuVal !== null ? `${Math.min(cpuVal, 100)}%` : '0%' }}
        />
      </div>
    </div>
  );
}