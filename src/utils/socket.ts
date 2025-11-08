// socket connection component
import { io } from "socket.io-client";
import { socketStore } from "../stores/socketStore";

export class socketConnection {
  private socket: any;

  constructor() {
    this.socket = io(process.env.EXPO_PUBLIC_WEBSOCKET_API, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  public initSocket() {
    //Connect to socket server
    this.socket.connect();

    this.socket.on("connect", () => {
      console.log("✅ Rider Socket Connected:", this.socket.id);
    });

    this.socket.on("connect_error", (err) => {
      //console error
      // retry connection after 2 seconds
      console.error("❌ WebSocket connection error:", err);
      setTimeout(() => this.socket.connect(), 2000);
    });
    this.socket.on("disconnect", () => {
      console.warn("⚠️ Socket disconnected:", this.socket.id);
      setTimeout(() => this.socket.connect(), 2000);
    });

    //wee need to join rooom

    this.socket.on("roomJoined", (data: any) => {
      console.log("✅ Room joined succesfully:", data);
    });

    this.listenEvents();
  }

  private listenEvents() {
    this.SOCKET_EVENTS.forEach((event) => {
      this.socket.off(event); // prevent duplicates
      this.socket.on(event, (data) => {
        console.log(`✅ Event received: ${event}`);
        socketStore.getState().eventReceived(event, data);
      });
    });
  }

  // Fix the event array - should be separate strings
  private SOCKET_EVENTS = ["rideAccepted", "rideRequested", "ride_completed"];

  public joinRoom = (riderId: string) => {
    this.socket.emit("joinRiderRoom", riderId);
    console.log(`🧑 Rider ${riderId} joined room rider:${riderId}`);
  };
  public emitRideRequest = (rideData: any, userId: string) => {
    console.log("🚀 Emitting ride request:", rideData, userId);
    this.socket.emit("rideRequest", { rideData, userId });
  };
}
