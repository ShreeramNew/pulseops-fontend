import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Strict definitions matching our backend telemetry structures
export interface SystemMetrics {
  cpu: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  latency: number;
  status: "HEALTHY" | "WARNING" | "CRITICAL";
}

export interface LogEntry {
  id: string;
  message: string;
  level: "warning" | "error" | "critical";
  service: string;
}

interface TelemetryState {
  metrics: SystemMetrics | null;
  logs: LogEntry[];
  isConnected: boolean;
}

const initialState: TelemetryState = {
  metrics: null,
  logs: [],
  isConnected: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    updateMetrics: (state, action: PayloadAction<SystemMetrics>) => {
      state.metrics = action.payload;
    },
    addLog: (state, action: PayloadAction<LogEntry>) => {
      // 🛡️ ANTI-MEMORY LEAK GUARDRAIL:
      // If the dashboard runs for 3 days straight, arrays grow infinitely in RAM.
      // We append the new log to the front, and slice off anything past index 50
      // to keep browser memory footprint perfectly flat and stable.
      state.logs = [action.payload, ...state.logs].slice(0, 50);
    },
  },
});

export const { setConnectionStatus, updateMetrics, addLog } =
  telemetrySlice.actions;

export default telemetrySlice.reducer;
