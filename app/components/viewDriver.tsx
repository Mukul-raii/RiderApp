import { View, StyleSheet } from "react-native";
import { Map } from "./mapview";
import { useMap } from "@/src/hooks/useMap";
import { LoadingSpinners } from "./loadingScreens";
import { useEffect, useRef } from "react";
import { useRideStore } from "@/src/stores/rider";
import { Text } from "@react-navigation/elements";

export const DriverLocation = () => {
  const driverLocation = useMap((state) => state.driverLocation);
  const { driverId } = useRideStore.getState().liveRide;
  const { pickUpLat, pickUpLong } = useRideStore.getState().liveRide;
  // ✅ Get stable reference to the function
  const getdriverLocationRef = useRef(useMap.getState().getdriverLocation);

  useEffect(() => {
    if (!driverId) {
      console.log("⚠️ No driver ID available");
      return;
    }

    console.log("📍 Setting up driver location tracking (every 15s)");

    // Initial fetch
    getdriverLocationRef.current(driverId);

    // ✅ Poll every 15 seconds
    const intervalId = setInterval(() => {
      console.log("🔄 Polling driver location...");
      getdriverLocationRef.current(driverId);
    }, 2000); // 15 seconds

    return () => {
      console.log("🧹 Cleaning up location polling");
      clearInterval(intervalId);
    };
  }, [driverId]); // ✅ Only driverId in dependencies

  // Show loading while fetching location
  if (!driverLocation) {
    return <LoadingSpinners />;
  }

  // Validate location data
  const latitude = parseFloat(String(driverLocation.latitude));
  const longitude = parseFloat(String(driverLocation.longitude));

  // Check if we have valid coordinates
  if (isNaN(latitude) || isNaN(longitude)) {
    console.error("❌ Invalid driver location:", driverLocation);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load driver location</Text>
      </View>
    );
  }

  console.log("✅ Valid driver location:", { latitude, longitude });

  const loc = {
    lat: latitude,
    lng: longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <Map
        currentLocation={loc}
        currLoc={{ lat: pickUpLat, lng: pickUpLong }}
        dropLoc={loc}
        directionCoordinate={[]}
        mode="driverToPickup"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "500",
  },
});
