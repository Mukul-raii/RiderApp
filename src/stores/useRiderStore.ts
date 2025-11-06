import { create } from "zustand";
import { RideService } from "../services/rideService";
import { joinRiderRoom } from "../utils/socket";
import { userStore } from "./user";

const rideService = new RideService();

export const useRideStore = create<RideState>((set, get) => ({
  allrides: null,
  liveRide: null,
  loading: false,
  error: null,
  rideForm: {
    from_lat: 0,
    from_lng: 0,
    from_address: "",
    to_lat: 0,
    to_lng: 0,
    to_address: "",
  },
  isRideReady: false,
  setRideForm: (
    from_lat: number,
    from_lng: number,
    from_address: string,
    to_lat: number,
    to_lng: number,
    to_address: string,
  ) => {
    set({
      rideForm: {
        from_lat,
        from_lng,
        from_address,
        to_lat,
        to_lng,
        to_address,
      },
    });
  },

  startRide: async () => {
    set({ loading: true, error: null });
    try {
      let user = userStore.getState().user;
      if (!user) {
        user = await userStore.getState().fetchUser();
      }
      const { from_lat, from_lng, from_address, to_lat, to_lng, to_address } =
        useRideStore.getState().rideForm;

      const ride = await rideService.findRide({
        from_lat,
        from_lng,
        from_address,
        to_lat,
        to_lng,
        to_address,
      });

      joinRiderRoom(user.firebaseUid);
      await rideService.requestRide(ride);
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
  rideDetails: {
    estimatedTime: 0,
    estimatedDistance: 0,
    estimatedfare: 0,
  },
  setRideDetails: (details: rideDetails) => {
    set((state) => ({ rideDetails: { ...state.rideDetails, ...details } }));
  },
  clearRide: () => {
    set({
      rideForm: {
        from_lat: 0,
        from_lng: 0,
        from_address: "",
        to_lat: 0,
        to_lng: 0,
        to_address: "",
      },
      isRideReady: false,
      rideDetails: {
        estimatedTime: 0,
        estimatedDistance: 0,
        estimatedfare: 0,
      },
    });
  },
}));

interface RideForm {
  from_lat: number;
  from_lng: number;
  from_address: string;
  to_lat: number;
  to_lng: number;
  to_address: string;
}

interface RideState {
  rideForm: RideForm;
  allrides: any;
  liveRide: any;
  getliveRide: () => Promise<void>;
  setRideForm: (
    from_lat: number,
    from_lng: number,
    from_address: string,
    to_lat: number,
    to_lng: number,
    to_address: string,
  ) => void;
  startRide: () => Promise<void>;
  getAllRides: () => Promise<void>;
  loading: boolean;
  error: string | null;
  isRideReady: boolean;
  rideDetails: rideDetails;
  setRideDetails: (details: rideDetails) => void;
  clearRide: () => void;
}

export interface rideDetails {
  estimatedTime: number;
  estimatedDistance: number;
  estimatedfare: number;
}
