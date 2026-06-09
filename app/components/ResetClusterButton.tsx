"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function ResetClusterButton(): React.JSX.Element {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!confirm("Are you sure you want to completely clear all real-time cache counters from Redis?")) return;
    
    setIsResetting(true);
    try {
      // 🛡️ Ensure environment URLs clean up trailing slash formatting mismatches
      const baseApiUrl = process.env.NEXT_PUBLIC_PULSEOPS_API_URL || "http://localhost:3000/api";
      const cleanUrl = `${baseApiUrl}/metrics/reset`.replace(/([^:]\/)\/+/g, "$1");

      const res = await fetch(cleanUrl, {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        alert("Redis memory structures flushed successfully!");
      }
    } catch (err) {
      console.error("Failed to execute cluster reset sequence:", err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 border border-rose-500/10 hover:border-rose-500/20 font-mono text-[11px] transition-all duration-200 disabled:opacity-50 group"
    >
      <RefreshCw className={`w-3.5 h-3.5 coding-icon ${isResetting ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
      <span>{isResetting ? "Flushing Cache..." : "Reset Cluster Counters"}</span>
    </button>
  );
}