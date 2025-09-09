import axios from "axios";
import { getValueFor } from "./userService";

export const find_ride = async ({
  from,
  to,
  pickUpLat,
  pickUpLong,
  dropLat,
  dropLong,
}: {
  from: string;
  to: string;
  pickUpLat?: string;
  pickUpLong?: string;
  dropLat?: string;
  dropLong?: string;
}) => {
  try {
    console.log(
      "Finding ride from",
      from,
      "to",
      to,
      await getValueFor("authToken")
    );
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
    return res.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};
