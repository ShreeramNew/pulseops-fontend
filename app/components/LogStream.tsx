'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ShieldAlert } from 'lucide-react';

export default function LogStream(): React.JSX.Element {
  // This component ONLY listens to logs. It will NEVER re-render every 500ms when CPU numbers shift!
  const logs = useSelector((state: RootState) => state.telemetry.logs);

  return (
    <section className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-4 h-4 text-rose-400" />
        <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">Runtime Logs Exception Stream</h2>
      </div>

      <div className="bg-slate-950 border border-slate-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs space-y-2.5">
        {logs.length === 0 ? (
          <p className="text-slate-500 text-center py-24 animate-pulse">Waiting for anomalies...</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-4 border-b border-slate-900/50 pb-2 last:border-none last:pb-0">
              <span className={`font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded w-16 text-center ${
                log.level === 'critical' ? 'bg-rose-900/40 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'
              }`}>
                {log.level}
              </span>
              <span className="text-slate-300 flex-1 break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}