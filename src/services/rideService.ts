import { apiCalls } from "../utils/apicall";

export class RideService {
  async findRide(params: RideRequest) {
    return await apiCalls({
      url: "ride/find-ride",
      method: "POST",
      body: { ...params },
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
      method: "PATCH",
      body: { rideData },
    });
  }

  async getDistance(rideFormData: any) {
    return await apiCalls({
      url: "ride/ride-prepared",
      method: "POST",
      body: { rideFormData },
    });
  }

  async getDriverLocation(driverId: string) {
    const res = await apiCalls({
      url: `ride/driver-location/${driverId}`,
      method: "GET",
    });
    console.log("driver loc", res);
    return res;
  }
}
interface RideRequest {
  from_address: string;
  to_address: string;
  from_lat: number;
  from_lng: number;
  to_lat: number;
  to_lng: number;
}
