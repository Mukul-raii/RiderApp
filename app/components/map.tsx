import { useMap } from "@/src/stores/useMap";
import { useRideStore } from "@/src/stores/useRiderStore";
import { useEffect, useRef } from "react";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";
import { Map } from "./mapview";
import { View } from "react-native";
import { Text } from "@react-navigation/elements";
import GlobalLoader from "./globalLoader";
import { useGlobalLoader } from "@/src/stores/useGlobalLoader";

export const MapLocation = () => {
  const {
    currentLocation,
    getCurrentLocation,
    getLocationAddress,
    getdirectionCoordinate,
    directionCoordinate,
  } = useMap((state) => state);

  const { rideForm } = useRideStore();

  useEffect(() => {
    useGlobalLoader.getState().show();
    getCurrentLocation();
    useGlobalLoader.getState().hide();
  }, []);

  const debounceRef = useRef<number | null>(null);

  const routeCoords = [
    { latitude: rideForm.from_lat, longitude: rideForm.from_lng },
    { latitude: rideForm.to_lat, longitude: rideForm.to_lng },
  ];
  const isLoading = currentLocation.lat === 0 && currentLocation.lng === 0;

  return (
    <>
      {isLoading ? (
        <View className="bg-red-500">
          <Text>Loading... </Text>
        </View>
      ) : (
        <Map
          currentLocation={currentLocation}
          currLoc={{ lat: rideForm.from_lat, lng: rideForm.from_lng }}
          dropLoc={{ lat: rideForm.to_lat, lng: rideForm.to_lng }}
          directionCoordinate={directionCoordinate}
          mode="route"
          // Since this component is NOT the screen where the user selects a location,
          // the onRegionChangeComplete logic is now handled internally by the Map component
          // for generic map movement/updates (if desired), or you can remove that logic
          // from Map.tsx if it's only meant for LocationPin. I left it in Map.tsx
          // for maximum reusability.
        />
      )}
    </>
  );
};
