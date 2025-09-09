import { create } from "zustand";
import { find_ride } from "../services/rideService";
import { emitRideRequest, joinRiderRoom } from "../utils/socket";
import { userStore } from "./user";

export const getRide = create<{
  startRide: (from: string, to: string) => Promise<void>;
  getRide: () => string;
  listenRideEvents: () => void;
}>((set, get) => ({
  startRide: async (from: string, to: string) => {
    let user = userStore.getState().user;

    // If no user in store, fetch it from backend
    if (!user) {
      user = await userStore.getState().getUser();
    }

    console.log("Current user in getRide:", user);
    const res = await find_ride({ from, to });
    joinRiderRoom(user.firebaseUid);
    emitRideRequest(res, user.firebaseUid);
    console.log("Ride data:", res);
  },
  getRide: () => get().startRide.toString(),
  listenRideEvents: () => {
    //Implement later
  },
}));
