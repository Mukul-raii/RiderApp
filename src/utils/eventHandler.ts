import { useRideStore } from "../stores/useRiderStore";

export function eventHandler(event: string, data: any) {
  switch (event) {
    case "rideRequested":
      console.log("Ride requested event received", data);
      useRideStore.setState((state) => ({
        liveRide: {
          ...state.liveRide,
          ...data,
        },
        loading: false,
      }));
      //now after ui update we need to show notification and put the validation of data received
      break;
    case "rideAccepted":
      console.log("Ride accepted event received", data);
      useRideStore.setState((state) => ({
        liveRide: {
          ...state.liveRide,
          ...data,
        },
        loading: false,
      }));
      break;
    case "rideCompleted":
      console.log("Ride completed event received", data);
      useRideStore.getState().getliveRide();
      break;
    default:
      console.log("Unknown event received");
  }
}
