"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addLog,
  setConnectionStatus,
  updateMetrics,
} from "../features/telemetrySlice"; 

export const useTelemetry = (url: string = "ws://localhost:5000") => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(url);

    //On connection successfull
    ws.onopen = () => {
      console.log("Telemetry Simulator is connected!");
      dispatch(setConnectionStatus(true));
    };

    //On server sends data
    ws.onmessage = (event) => {
      try {
        let parsed = JSON.parse(event.data);
        let { type, data } = parsed;

        if (type === "metrics") {
          dispatch(updateMetrics(data));
        } else if (type === "logs") {
          dispatch(addLog(data));
        }
      } catch (error) {
        console.log("Error parsing the WebSocket frames!");
      }
    };

    //-----------Handle error/close of connection-----------
    ws.onerror = (err) => {
      console.log("Error occurred in WebSocket Pipeline:", err);
      dispatch(setConnectionStatus(false));
    };

    ws.onclose = () => {
      console.log("Closed WebSocket connection!");
      dispatch(setConnectionStatus(false));
    };

    // 🧹 ANTI-MEMORY LEAK CLEANUP:
    // If the developer navigates away or refreshes, forcefully shut down the socket link
    // to prevent duplicate ghost connections hanging around in browser memory.
    return () => {
      ws.close();
    };
  }, [url, dispatch]);
};
