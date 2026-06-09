"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setConnectionStatus,
  hydrateHistory,
  updateLiveMetrics,
  updateLogs,
  updateAiDiagnosis,
  HistoricalMetric, // Added type assignment safety checks
  SystemMetrics
} from "../features/telemetrySlice";

// 📡 Server-side proxy target handles the HTTP -> HTTPS upgrade automatically
const HTTP_PROXY_URL = (process.env.NEXT_PUBLIC_PULSEOPS_API_URL || "") + "/analytics/history";

// WebSockets cannot be proxied via standard Next.js HTTP rewrites,
// so we connect directly to the public EC2 socket gateway using the native ws protocol
const WS_URL = "ws://56.228.31.230:5000";

export const useTelemetry = (url: string = WS_URL) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 🚰 PHASE 1: HTTP Baseline History Hydration via Secure Proxy Route
    const hydrateDashboardBaseline = async () => {
      try {
        const response = await fetch(HTTP_PROXY_URL);
        const json = await response.json();
        
        if (json.success && Array.isArray(json.data)) {
          console.log(`📊 Hydrated dashboard with ${json.count} baseline metrics.`);
          dispatch(hydrateHistory(json.data as HistoricalMetric[]));
        }
      } catch (error) {
        console.error("❌ Failed to pull historical baseline telemetry via proxy:", error);
      }
    };

    hydrateDashboardBaseline();

    // ⚡ PHASE 2: Live WebSocket Continuous Stream Append
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("🚀 Connected to Live PulseOps Production Cloud Pipeline Server!");
      dispatch(setConnectionStatus(true));
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        const { type, data } = parsed;

        switch (type) {
          case "metrics":
            // ✅ Automatically routes the expanded object straight to our updated reducer
            dispatch(updateLiveMetrics(data as SystemMetrics));
            break;
          case "logs":
            dispatch(updateLogs(data));
            break;
          case "ai-diagnosis":
            dispatch(updateAiDiagnosis(data));
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("⚠️ Error parsing incoming live telemetry WebSocket frame:", error);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ Exception isolated inside active WebSocket channel:", err);
      dispatch(setConnectionStatus(false));
    };

    ws.onclose = () => {
      console.warn("⚠️ WebSocket connection dropped from target PulseOps stream infrastructure.");
      dispatch(setConnectionStatus(false));
    };

    return () => {
      ws.close();
    };
  }, [url, dispatch]);
};