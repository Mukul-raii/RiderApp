import { create } from "zustand";
import { RideService } from "../services/rideService";
import { joinRiderRoom, listenRideEvents } from "../utils/socket";
import { userStore } from "./user";

const rideService = new RideService();

export const useRideStore = create<RideState>((set, get) => ({
  allrides: null,
  liveRide: null,
  loading: false,
  error: null,
  rideForm: { from: "", to: "" },
  setRideForm: (from: string, to: string) => {
    set({ rideForm: { from, to } });
  },

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
      listenRideEvents();
      // emitRideRequest(res, user.firebaseUid);

      set({ liveRide: ride });
    } catch (error) {
      console.error("❌ Failed to start ride:", error);
      set({ error: "Failed to start ride" });
    }
  },
  getAllRides: async () => {
    set({ loading: true, error: null });
    try {
      const rideData = await rideService.getRides();
      set({ allrides: rideData, loading: false });
    } catch (error) {
      console.error("❌ Failed to get rides:", error);
      set({ loading: false, error: "Failed to get rides" });
    }
  },
  getliveRide: async () => {
    try {
      set({ loading: true, error: null });
      const result = await rideService.getLiveRide();
      set({ liveRide: result, loading: false });
    } catch (error) {
      console.error("❌ Failed to fetch live ride:", error);
      set({ loading: false, error: "Failed to fetch live ride" });
    }
  },
  listenRideEvents: () => {
    listenRideEvents();
  },
}));

interface RideForm {
  from: string;
  to: string;
}
interface RideState {
  rideForm: RideForm;
  allrides: any;
  liveRide: any;
  getliveRide: () => Promise<void>;
  setRideForm: (from: string, to: string) => void;
  startRide: (from: string, to: string) => Promise<void>;
  getAllRides: () => Promise<void>;
  loading: boolean;
  error: string | null;
  listenRideEvents: () => void;
}
