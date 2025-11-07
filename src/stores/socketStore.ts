import { create } from "zustand";
import { useRideStore } from "./useRiderStore";
import { eventHandler } from "../utils/eventHandler";

export const socketStore = create<SocketState>((get, set) => ({
  eventReceived: (event, data) => {
    console.log("Socket event received:", event);
    // Here you can add logic to handle different events
    eventHandler(event, data);
  },
}));

interface SocketState {
  // what we need when event is received we call the coorect funtion in SocketState
  // eg: onRideRequested, onRideAccepted, onRideCompleted
  eventReceived: (event: string, data: any) => void;
}
