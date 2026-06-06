'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ShieldAlert } from 'lucide-react';

export default function LogStream(): React.JSX.Element {
  // Subscribes cleanly to the string matrix stream
  const logs = useSelector((state: RootState) => state.telemetry.logs);

  // Helper utility to flag error severity levels based on standard string footprints
  const getLogLevel = (logLine: string) => {
    const lower = logLine.toLowerCase();
    if (lower.includes('error') || lower.includes('exception') || lower.includes('failed')) {
      return 'error';
    }
    return 'info';
  };

  return (
    <section className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-4 h-4 text-rose-400" />
        <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">Runtime Logs Stream</h2>
      </div>

      <div className="bg-slate-950 border border-slate-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs space-y-2.5">
        {logs.length === 0 || (logs.length === 1 && logs[0].includes("No error logs found")) ? (
          <p className="text-slate-500 text-center py-24 animate-pulse">Waiting for telemetry logs...</p>
        ) : (
          logs.map((logLine, idx) => {
            const level = getLogLevel(logLine);
            return (
              <div key={idx} className="flex gap-4 border-b border-slate-900/50 pb-2 last:border-none last:pb-0 items-start">
                <span className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded w-16 text-center select-none shrink-0 ${
                  level === 'error' 
                    ? 'bg-rose-900/40 text-rose-400 border border-rose-500/20' 
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/30'
                }`}>
                  {level}
                </span>
                <span className="text-slate-300 flex-1 break-all whitespace-pre-wrap">{logLine}</span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}