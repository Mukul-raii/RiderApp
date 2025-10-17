import { create } from "zustand";
import { RideService } from "../services/rideService";
import { joinRiderRoom, listenRideEvents } from "../utils/socket";
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
      if (!user) {
        user = await userStore.getState().fetchUser();
      }

      const ride = await rideService.findRide(from, to);

      joinRiderRoom(user.firebaseUid);
      await rideService.requestRide(ride);
      // emitRideRequest(res, user.firebaseUid);

      listenRideEvents();

      set({ ride: ride });
    } catch (error) {
      console.error("❌ Failed to start ride:", error);
      set({ error: "Failed to start ride" });
    }
  },
  getRide: () => get().startRide.toString(),
  listenRideEvents: () => {
    listenRideEvents();
  },
  liveRide: async () => {
    try {
      set({ loading: true, error: null });
      const result = await rideService.getLiveRide();
      set({ ride: result, loading: false });
    } catch (error) {
      console.error("❌ Failed to fetch live ride:", error);
      set({ loading: false, error: "Failed to fetch live ride" });
    }
  },
}));

export const Ride = create<{
  rides: any[];
  loading: boolean;
  error: string | null;
  fetchRides: () => Promise<void>;
}>((set) => ({
  rides: [],
  loading: false,
  error: null,
  fetchRides: async () => {
    const rideService = new RideService();
    const rideData = await rideService.getRides();
    console.log(rideData);
    set({ rides: rideData });
  },
}));
