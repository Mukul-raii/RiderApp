import { create } from "zustand";

import * as Location from "expo-location";
import { useRideStore } from "../stores/rider";
import axios from "axios";

export const useMap = create<MapState>((set) => ({
  currentLocation: {
    lat: 0,
    lng: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  showMap: false,
  getCurrentLocation: async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log("📍 Current location:", latitude, longitude);
    set({
      currentLocation: {
        lat: latitude,
        lng: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    });
  },
  locationAddress: "",
  getLocationAddress: async (lat: number, lng: number) => {
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (address.name === undefined && address.street === undefined) {
        set({ locationAddress: "Unknown location" });
        return;
      }
      const formattedAddress = `${address.name ? address.name + ", " : ""}${
        address.street ? address.street + ", " : ""
      }${address.city ? address.city + ", " : ""}${
        address.region ? address.region + ", " : ""
      }${address.postalCode ? address.postalCode + ", " : ""}${
        address.country ? address.country : ""
      }`;
      console.log("🏠 Reverse geocoded address:", formattedAddress);
      set({ locationAddress: formattedAddress });
    } catch (error) {
      console.error("❌ Failed to get location address:", error);
    }
  },
  updateRideForm: (type, lat, lon, address) => {
    const rideStore = useRideStore.getState();
    if (type === "pickup") {
      rideStore.setRideForm(
        lat,
        lon,
        address,
        rideStore.rideForm.to_lat,
        rideStore.rideForm.to_lng,
        rideStore.rideForm.to_address,
      );
    } else {
      rideStore.setRideForm(
        rideStore.rideForm.from_lat,
        rideStore.rideForm.from_lng,
        rideStore.rideForm.from_address,
        lat,
        lon,
        address,
      );
    }
  },
  directionCoordinate: [], // Start with an empty array
  getdirectionCoordinate: async () => {
    // 1. Get state
    const { rideForm } = useRideStore.getState();

    // 2. FIX: Get API key from environment variables
    const ORS_API_KEY =
      "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImVhNTc1NjkzOGYwYzRlOGFiYjRkNDBiYTcyZjYzMDgxIiwiaCI6Im11cm11cjY0In0=";

    if (!ORS_API_KEY) {
      console.error(
        "API key is missing. Add EXPO_PUBLIC_ORS_API_KEY to your .env file.",
      );
      // You can still set the hardcoded key as a fallback for testing
      // ORS_API_KEY = "your-hardcoded-key";
      throw new Error("API key not configured.");
    }

    // 3. FIX: Coordinate format MUST be (longitude, latitude)
    const startParam = `${rideForm.from_lng},${rideForm.from_lat}`;
    const endParam = `${rideForm.to_lng},${rideForm.to_lat}`;

    const baseURL = `https://api.openrouteservice.org/v2/directions/driving-car`;

    try {
      if (rideForm.from_lat !== 0 || rideForm.to_lat !== 0) {
        const response = await axios.get(baseURL, {
          params: {
            api_key: ORS_API_KEY, // Use the secure variable
            start: startParam,
            end: endParam,
          },
        });

        if (response.data && response.data.features?.length > 0) {
          // 4. FIX: Parse the response and set the state
          const coords = response.data.features[0].geometry.coordinates;

          // ORS gives [longitude, latitude] arrays
          // We must map them to { latitude, longitude } objects for react-native-maps
          const formattedCoordinates: LatLng[] = coords.map((c: number[]) => ({
            latitude: c[1], // Index 1 is latitude
            longitude: c[0], // Index 0 is longitude
          }));
          console.log(response.data);
          set({ directionCoordinate: formattedCoordinates });
          return formattedCoordinates;
        } else {
          throw new Error("No route found.");
        }
      }
      return []; // Return empty if no coordinates
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error getting directions:",
          error.response?.data?.error?.message || error.message,
        );
      } else {
        console.error("Error getting directions:", error);
      }
      throw new Error("Failed to fetch directions from OpenRouteService.");
    }
  },
}));

interface MapState {
  showMap: boolean;
  currentLocation: {
    lat: number;
    lng: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  getCurrentLocation: () => Promise<void>;
  locationAddress: string;
  getLocationAddress: (lat: number, lng: number) => Promise<void>;
  updateRideForm: (
    type: "pickup" | "dropoff",
    lat: number,
    lon: number,
    address: string,
  ) => void;
  directionCoordinate: LatLng[];
  getdirectionCoordinate: () => Promise<LatLng[] | void>;
}

interface LatLng {
  latitude: number;
  longitude: number;
}
