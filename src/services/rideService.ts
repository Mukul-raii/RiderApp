import { apiCalls } from "../utils/apicall";

export class RideService {
  async findRide(
    from: string,
    to: string,
    pickUpLat?: string,
    pickUpLong?: string,
    dropLat?: string,
    dropLong?: string
  ) {
    return await apiCalls({
      url: "ride/find-ride",
      method: "POST",
      body: { from, to, pickUpLat, pickUpLong, dropLat, dropLong },
    });
  }

  async getRides() {
    const data = await apiCalls({
      url: "ride/user-rides",
      method: "GET",
    });
    console.log("Rides fetched from service:", data);
    return data;
  }

  async getLiveRide() {
    return await apiCalls({
      url: "ride/live-rides",
      method: "GET",
    });
  }

  async requestRide(rideData: object) {
    return await apiCalls({
      url: "ride/request-ride",
      method: "PUT",
      body: { rideData },
    });
  }
}
