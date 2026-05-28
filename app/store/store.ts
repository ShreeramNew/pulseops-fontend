import { configureStore } from "@reduxjs/toolkit";
import telemetryReducer from "../features/telemetrySlice";

export const store = configureStore({
  reducer: {
    telemetry: telemetryReducer,
  },
});

// TypeScript compiler helpers to provide absolute auto-completion across components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
