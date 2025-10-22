import { useMap } from "@/src/hooks/useMap";
import { useRideStore } from "@/src/stores/rider";
import { useEffect, useRef } from "react";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

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
    getCurrentLocation();
  }, []);

  const debounceRef = useRef<number | null>(null);

  const routeCoords = [
    { latitude: rideForm.from_lat, longitude: rideForm.from_lng },
    { latitude: rideForm.to_lat, longitude: rideForm.to_lng },
  ];

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        latitudeDelta: currentLocation.latitudeDelta,
        longitudeDelta: currentLocation.longitudeDelta,
      }}
      onRegionChangeComplete={(region) => {
        useMap.setState({
          currentLocation: {
            lat: region.latitude,
            lng: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          },
        });

        if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            getLocationAddress(region.latitude, region.longitude);
            getdirectionCoordinate();
          }, 500);
        }
      }}
    >
      {rideForm.from_lat !== 0 && (
        <Marker coordinate={routeCoords[0]} title="Pickup" />
      )}
      {rideForm.to_lat !== 0 && (
        <Marker coordinate={routeCoords[1]} title="Dropoff" />
      )}

      <UrlTile
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
      />

      {directionCoordinate.length >= 2 && (
        <Polyline
          coordinates={directionCoordinate}
          strokeColor="blue"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
};
