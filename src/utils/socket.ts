import { io } from "socket.io-client";
import { useRideStore } from "../stores/rider";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
}); // connect

socket.on("connect", () => {
  console.log("Socket Connected:", socket.id);
});

export const joinRiderRoom = (riderId: string) => {
  console.log("Joining rider room with ID:", riderId);
  socket.emit("joinRiderRoom", riderId);
};

export const emitRideRequest = (rideData: object, riderId: string) => {
  socket.emit("rideRequest", { ...rideData, riderId });
};

export const listenRideEvents = () => {
  socket.off("rideUpdate"); // remove previous listener to avoid duplicates
  socket.on("rideUpdate", (data) => {
    console.log("Ride update received:", data);

    // Update the ride state directly
    useRideStore.setState((state) => ({
      ride: {
        ...state.liveRide, // keep existing ride data
        ...data, // merge updated fields from socket
      },
      loading: false,
    }));
  });
};

listenRideEvents();
