import { create } from "zustand";
import { RideService } from "../services/rideService";
import {
  emitRideRequest,
  joinRiderRoom,
  listenRideEvents,
} from "../utils/socket";
import { userStore } from "./user";

const rideService = new RideService();

export const getRide = create<{
  ride: any;
  loading: boolean;
  error: string | null;
  liveRide: any;
  startRide: (from: string, to: string) => Promise<void>;
  getRide: () => string;
  listenRideEvents: () => void;
}>((set, get) => ({
  ride: null,
  loading: false,
  error: null,

  startRide: async (from: string, to: string) => {
    set({ loading: true, error: null });
    try {
      let user = userStore.getState().user;
      console.log("Current user in startRide:", user);
      if (!user) {
        user = await userStore.getState().fetchUser();
        console.log("User fetched for user:", user);
      }

      const res = await rideService.findRide(from, to);
      console.log("Ride started successfully:", res);
      joinRiderRoom(user.firebaseUid);
      emitRideRequest(res, user.firebaseUid);

      listenRideEvents();

      set({ loading: false });
      2;
    } catch (error) {
      console.error("❌ Failed to start ride:", error);
      set({ error: "Failed to start ride" });
    }
  },
  getRide: () => get().startRide.toString(),
  listenRideEvents: () => {
    listenRideEvents();
  },
  liveRide: async (rideId: number) => {
    try {
      set({ loading: true, error: null });
      const result = await rideService.getLiveRide(rideId);
      console.log("Live ride data received:", result);
      set({ ride: result, loading: false });
    } catch (error) {
      console.error("❌ Failed to fetch live ride:", error);
      set({ error: "Failed to fetch live ride" });
    }
  },
}));
