import { io } from "socket.io-client";
import { useRideStore } from "../stores/rider";
import { userStore } from "../stores/user";

const socket = io("http://192.168.29.35:3000", {
  transports: ["websocket"],
  autoConnect: false,
}); // connect

export function initSocket() {
  socket.connect();

  socket.on("connect", () => {
    console.log("✅ Rider Socket Connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ WebSocket connection error:", err);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
    // Optional: try reconnecting manually
    if (reason !== "io client disconnect") {
      setTimeout(() => socket.connect(), 2000);
    }
  });

  // Add confirmation listener
  socket.on("roomJoined", (data) => {
    console.log("✅ Room joined confirmation:", data);
  });
  //As user is gets a value in store it should run it
  const user = userStore.getState().user;
  if (user?.firebaseUid) {
    joinRiderRoom(user.firebaseUid);

    // 🟢 Start listening *after* joining room
    setTimeout(() => {
      console.log("🔄 Joining done, starting listeners...");
      listenRideEvents();
    }, 200); // small delay ensures server processed the join
  }
}

export const listenRideEvents = () => {
  console.log("🚨 Setting up ride event listeners");

  // Remove old listeners to prevent duplicates
  socket.off("rideUpdate");
  socket.off("rideAccepted");

  socket.on("rideRequested", (data) => {
    console.log("✅ Ride update received:", data);
    useRideStore.setState((state) => ({
      liveRide: {
        ...state.liveRide,
        ...data,
      },
      loading: false,
    }));
  });

  socket.on("rideAccepted", (data) => {
    console.log("✅ Ride Accepted by driver:", data);
    useRideStore.setState((state) => ({
      liveRide: {
        ...state.liveRide,
        ...data,
      },
      loading: false,
    }));
  });
};

export const joinRiderRoom = (riderId: string) => {
  console.log("🚀 [Frontend] Joining rider room with ID:", riderId);
  socket.emit("joinRiderRoom", riderId);
};

export const emitRideRequest = (rideData: object, riderId: string) => {
  socket.emit("rideRequest", { ...rideData, riderId });
};
