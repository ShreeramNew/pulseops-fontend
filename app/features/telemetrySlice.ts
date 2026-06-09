import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Layout matching our continuous database structure for line-charts
export interface HistoricalMetric {
  cpuUsagePercentage: number;
  memoryUsageMB: number;
  // 🔥 New persistent chart data bindings:
  totalRequests: number;
  avgLatencyMs: number;
  errorRatePercentage: number;
  timestamp: string;
}

// Live real-time metric payload shape emitted from backend
export interface SystemMetrics {
  cpuUsagePercentage: number;
  memoryUsageMB: number;
  uptimeSeconds: number;
  // 🔥 New live indicators:
  totalRequests: number;
  avgLatencyMs: number;
  errorRatePercentage: number;
}

interface TelemetryState {
  metrics: SystemMetrics | null;
  history: HistoricalMetric[];
  logs: string[]; // Holds the array of log strings streamed from backend terminal
  aiDiagnosis: string | null; // Real-time remediation steps from Gemini Flash
  isConnected: boolean;
}

const initialState: TelemetryState = {
  metrics: null,
  history: [],
  logs: [],
  aiDiagnosis: null,
  isConnected: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    // 🚰 HYDRATION STEP: Load initial 24-hour historical snapshot data completely
    hydrateHistory: (state, action: PayloadAction<HistoricalMetric[]>) => {
      state.history = action.payload;
    },
    // ⚡ APPEND STREAM STEP: Update live indicators and inject frame to history
    updateLiveMetrics: (state, action: PayloadAction<SystemMetrics>) => {
      state.metrics = action.payload;

      // Synchronize dynamic graph arrays by appending the complete live metric frame
      const newPoint: HistoricalMetric = {
        cpuUsagePercentage: action.payload.cpuUsagePercentage,
        memoryUsageMB: action.payload.memoryUsageMB,
        // ✅ Map the new APM data points directly to the chart array frame
        totalRequests: action.payload.totalRequests,
        avgLatencyMs: action.payload.avgLatencyMs,
        errorRatePercentage: action.payload.errorRatePercentage,
        timestamp: new Date().toISOString(),
      };

      // 🛡️ ANTI-MEMORY LEAK GUARDRAIL (FIFO):
      // Keep state bounded to max ~900 indices (approx 45 mins of high-res 3s tracking)
      // to guarantee pixel-perfect continuous graphing without bogging down browser layout cycles.
      const updatedHistory = [...state.history, newPoint];
      if (updatedHistory.length > 900) {
        state.history = updatedHistory.slice(1);
      } else {
        state.history = updatedHistory;
      }
    },
    // 📋 TERMINAL BUFFER: Overwrite terminal stream panel state with current log matrix
    updateLogs: (state, action: PayloadAction<string[]>) => {
      state.logs = action.payload;
    },
    // 🧠 AI ENGINE COUPLING: Bind Gemini Flash's automated triage reports to dashboard layout
    updateAiDiagnosis: (state, action: PayloadAction<string | null>) => {
      state.aiDiagnosis = action.payload;
    },
  },
});

export const {
  setConnectionStatus,
  hydrateHistory,
  updateLiveMetrics,
  updateLogs,
  updateAiDiagnosis,
} = telemetrySlice.actions;

export default telemetrySlice.reducer;