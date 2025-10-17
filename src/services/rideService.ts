import axios from "axios";
import { getValueFor } from "./userService";

export class RideService {
  async findRide(
    from: string,
    to: string,
    pickUpLat?: string,
    pickUpLong?: string,
    dropLat?: string,
    dropLong?: string
  ) {
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/ride/find-ride`,
        { from, to, pickUpLat, pickUpLong, dropLat, dropLong },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getValueFor("authToken")}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  }

  async getRides() {
    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/ride/user-rides`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getValueFor("authToken")}`,
          },
        }
      );
      console.log("Rides fetched from service:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  }

  async getLiveRide() {
    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/ride/live-rides`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getValueFor("authToken")}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.error("Error fetching live ride:", error);
    }
  }

  async requestRide(rideData: object) {
    try {
      await axios.patch(
        `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/ride/request-ride`,
        { rideData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getValueFor("authToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching live ride:", error);
    }
  }
}
