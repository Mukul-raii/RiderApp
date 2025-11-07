import { useRideStore } from "../stores/useRiderStore";

export function eventHandler(event: string, data: any) {
  switch (event) {
    case "rideRequested":
      console.log("Ride requested event received", data);
      useRideStore.setState({
        liveRide: data,
      });
      //now after ui update we need to show notification and put the validation of data received
      break;
    case "rideAccepted":
      console.log("Ride accepted event received", data);
      useRideStore.setState({
        liveRide: data,
      });
      break;
    case "rideCompleted":
      console.log("Ride completed event received", data);
      useRideStore.setState({
        liveRide: data,
      });
      break;
    default:
      console.log("Unknown event received");
  }
}
