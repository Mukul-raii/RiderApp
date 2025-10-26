import { useMap } from "@/src/hooks/useMap";
import { useRideStore } from "@/src/stores/rider";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";
import { Map } from "./mapview";

export const LocationPin = ({
  type,
  setShowMap,
}: {
  type: "pickup" | "dropoff";
  setShowMap: (show: boolean) => void;
}) => {
  const {
    currentLocation,
    getCurrentLocation,
    locationAddress,
    getLocationAddress,
    updateRideForm,
    getdirectionCoordinate,
    directionCoordinate,
  } = useMap((state) => state);

  const { rideForm } = useRideStore((state) => state);

  useEffect(() => {
    try {
      console.log("🗺 useEffect: calling getCurrentLocation()");
      getCurrentLocation();
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  }, []);
  const debounceRef = useRef<number | null>(null);

  const routeCoords = [
    { latitude: rideForm.from_lat, longitude: rideForm.from_lng },
    { latitude: rideForm.to_lat, longitude: rideForm.to_lng }, // Delhi (example destination)
  ];
  console.log({ routeCoords });

  const pickupMarker =
    type === "pickup" && rideForm.from_lat !== 0
      ? { lat: rideForm.from_lat, lng: rideForm.from_lng }
      : { lat: 0, lng: 0 }; // Pass a clear zero/empty coordinate

  const dropoffMarker =
    type === "dropoff" && rideForm.to_lat !== 0
      ? { lat: rideForm.to_lat, lng: rideForm.to_lng }
      : { lat: 0, lng: 0 }; // Pass a clear zero/empty coordinate

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Map */}
      <Map
        currentLocation={currentLocation}
        // Pass the EXISTING rideForm locations to allow markers to show if set
        currLoc={pickupMarker}
        dropLoc={dropoffMarker}
        directionCoordinate={directionCoordinate}
        mode="select"
      />
      {/* Center Pin */}
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: -20,
          marginTop: -40,
          zIndex: 10,
        }}
      >
        <Text style={{ fontSize: 36 }}>📍</Text>
      </View>

      {/* Address & Confirm overlay */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          backgroundColor: "rgba(0,0,0,0.7)",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginBottom: 6,
            textAlign: "center",
          }}
        >
          {locationAddress?.length > 0 ? locationAddress : "Getting address..."}
        </Text>

        <TouchableOpacity
          onPress={() => setShowMap(false)}
          style={{
            backgroundColor: "#4ade80", // tailwind green-400
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 12,
            minWidth: 140,
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
            onPress={() => {
              updateRideForm(
                type,
                currentLocation.lat,
                currentLocation.lng,
                locationAddress,
              );
              setShowMap(false);
            }}
          >
            Confirm Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
