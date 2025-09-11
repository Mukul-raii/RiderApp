import { io } from "socket.io-client";
import { getRide } from "../stores/rider";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
}); // connect

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

export const joinRiderRoom = (riderId: string) => {
  console.log("Joining rider room with ID:", riderId);
  socket.emit("joinRiderRoom", riderId);
};

export const emitRideRequest = (rideData: object, riderId: string) => {
  socket.emit("rideRequest", { ...rideData, riderId });
};

export const listenRideEvents = () => {
  socket.on("rideUpdate", (data) => {
    console.log("Ride update received:", data);
    getRide.getState().liveRide(data.id);
  });
};
