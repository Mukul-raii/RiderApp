// src/components/Map.tsx
import MapView, { Marker, Polyline, Region, UrlTile } from "react-native-maps";
import { View, StyleSheet, Image, Text } from "react-native";
import { useEffect, useRef } from "react";
import { useMap } from "@/src/stores/useMap";

// Define the expected props for better type safety
interface MapProps {
  currentLocation: {
    lat: number;
    lng: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  currLoc: { lat: number; lng: number };
  dropLoc: { lat: number; lng: number };
  directionCoordinate: { latitude: number; longitude: number }[];
  mode: "select" | "route" | "driverToPickup" | "driverToDrop";
}

export const Map = ({
  currentLocation,
  currLoc,
  dropLoc,
  directionCoordinate,
  mode,
}: MapProps) => {
  const mapRef = useRef<MapView>(null);
  console.log({
    currentLocation,
    currLoc,
    dropLoc,
    directionCoordinate,
    mode,
  });
  // Only create routeCoords if both are valid (not 0)

  const routeCoords = directionCoordinate.length > 0 ? directionCoordinate : [];

  const { getLocationAddress, getdirectionCoordinate } = useMap(
    (state) => state,
  );

  const debounceRef = useRef<number | null>(null);
  // Move map to current location when it updates
  useEffect(() => {
    if (
      currentLocation.lat !== 0 &&
      currentLocation.lng !== 0 &&
      mapRef.current
    ) {
      const region: Region = {
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        latitudeDelta: currentLocation.latitudeDelta || 0.005,
        longitudeDelta: currentLocation.longitudeDelta || 0.005,
      };
      mapRef.current.animateToRegion(region, 500); // 500ms animation
    }
  }, [currentLocation]);

  // Function to handle map region change (used for the LocationPin component's moving pin logic)
  const onRegionChangeComplete = (region: any) => {
    const { lat, lng } = useMap.getState().currentLocation;

    const distanceMoved = Math.sqrt(
      Math.pow(region.latitude - lat, 2) + Math.pow(region.longitude - lng, 2),
    );

    // If moved less than ~10 meters (approx threshold)
    if (distanceMoved < 0.0001) return;

    // 1. Update the current map location in the store
    useMap.setState({
      currentLocation: {
        lat: region.latitude,
        lng: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
    });

    // 2. Debounce the address and direction fetching
    if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        getLocationAddress(region.latitude, region.longitude);
        // Note: You might only want to call getdirectionCoordinate() if both pickup and drop-off are set
        // For simplicity, I'll keep the original logic here:
      }, 500);
    }
  };
  const FALLBACK_LAT = 37.78825;
  const FALLBACK_LNG = -122.4324;
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      // Use the last known currentLocation for the initial view
      initialRegion={{
        latitude: currentLocation.lat || FALLBACK_LAT,
        longitude: currentLocation.lng || FALLBACK_LNG,
        latitudeDelta: currentLocation.latitudeDelta || 0.005, // Fallback Delta
        longitudeDelta: currentLocation.longitudeDelta || 0.005, // Fallback Delta
      }}
      showsMyLocationButton
      loadingEnabled
      showsUserLocation
      // onRegionChangeComplete is only needed for the LocationPin screen,
      // but we add it here to make this map component reusable for that purpose.
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {/* OpenStreetMap Tile Layer */}
      <UrlTile
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
      />

      {currLoc.lat !== 0 && currLoc.lng !== 0 && (
        <LocationMarker
          coordinate={{ latitude: currLoc.lat, longitude: currLoc.lng }}
          title="Pickup Location"
          color="#4CAF50"
        />
      )}

      {mode === "driverToPickup" && dropLoc.lat !== 0 && dropLoc.lng !== 0 ? (
        <Marker
          coordinate={{
            latitude: dropLoc.lat,
            longitude: dropLoc.lng,
          }}
        >
          <Image
            source={require("@/assets/icons/car.png")}
            style={{
              width: 45,
              height: 45,
            }}
            resizeMode="contain"
          />
        </Marker>
      ) : (
        dropLoc.lat !== 0 &&
        dropLoc.lng !== 0 && (
          <LocationMarker
            coordinate={{
              latitude: dropLoc.lat,
              longitude: dropLoc.lng,
            }}
            title="Drop Location"
            color="#E53935"
          />
        )
      )}

      {/* Route Polyline */}
      {directionCoordinate.length >= 2 && (
        <Polyline
          coordinates={directionCoordinate}
          strokeColor="#2563eb" // blue
          strokeWidth={4}
          lineDashPattern={[0]}
        />
      )}
    </MapView>
  );
};

const LocationMarker = ({ coordinate, title, color }) => {
  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 1 }} title={title}>
      <View style={styles.markerContainer}>
        <View style={styles.pinBody}>
          {/* Inner circle with dynamic color */}
          <View
            style={[
              styles.innerCircle,
              { backgroundColor: color, borderColor: "#fff" },
            ]}
          />
          {/* Pointer with dynamic color */}
          <View style={[styles.pointer, { borderTopColor: color }]} />
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  currentMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  currentMarkerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    position: "absolute",
    top: 6,
    left: 6,
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10b981",
  },
  etaText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 16,
  },
  tripInfo: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    marginLeft: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: "#e5e7eb",
    marginLeft: 17,
    marginVertical: 4,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  driverDetails: {
    marginLeft: 12,
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 2,
  },
  vehicleInfo: {
    fontSize: 14,
    color: "#6b7280",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  pickupMarker: {
    backgroundColor: "#10b981",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  pickupDot: {
    backgroundColor: "#10b981",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dropMarker: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  dropDot: {
    backgroundColor: "#ef4444",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  markerContainer: {
    alignItems: "center",
  },
  pinBody: {
    alignItems: "center",
  },
  innerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    elevation: 4,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -1,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    elevation: 2,
  },
});
