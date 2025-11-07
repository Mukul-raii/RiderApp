import { MapLocation } from "@/app/components/map";
import { useGlobalLoader } from "@/src/stores/useGlobalLoader";
import { useMap } from "@/src/stores/useMap";
import { useRideStore } from "@/src/stores/useRiderStore";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RidePrepared() {
  const { rideForm, rideDetails } = useRideStore();
  const startRide = useRideStore((state) => state.startRide);
  const clearMapState = useMap((s) => s.clearMapState);
  const clearRide = useRideStore((s) => s.clearRide);
  const distanceKm = (rideDetails.estimatedDistance / 1000).toFixed(2);
  const timeMin = (rideDetails.estimatedTime / 60).toFixed(2);
  const fare = rideDetails.estimatedfare;
  const { getdirectionCoordinate } = useMap();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    useGlobalLoader.getState().show();
    getdirectionCoordinate();
    useGlobalLoader.getState().hide();
  }, []);

  const handleStartRide = async () => {
    useGlobalLoader.getState().show();
    await startRide();
    router.replace("/(main)/home");
    useGlobalLoader.getState().hide();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearMapState();
        clearRide();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {/* 🗺️ Map Layer */}
      <View style={styles.mapWrapper}>
        <View style={styles.mapContainer}>
          <MapLocation />
        </View>
      </View>

      {/* ✅ Bottom Sheet */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 70 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🚕</Text>
          <Text style={styles.headerTitle}>Ride Details</Text>
        </View>

        {/* Section */}
        <View style={styles.row}>
          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.value} numberOfLines={2}>
            {rideForm.to_address}
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{distanceKm} Km</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{timeMin} min</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Estimated Fare:</Text>
          <Text style={[styles.value, { color: "#10b981" }]}>Rs. {fare}</Text>
        </View>

        {/* Start Ride Button */}
        <TouchableOpacity
          onPress={handleStartRide}
          activeOpacity={0.8}
          style={styles.startBtn}
        >
          <Text style={styles.startBtnText}>Start Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  mapWrapper: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden", // ✅ IMPORTANT FIX
    zIndex: 0,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  headerIcon: {
    fontSize: 26,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6b7280",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    maxWidth: "55%",
    textAlign: "right",
    lineHeight: 20,
  },

  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginBottom: 16,
  },

  startBtn: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
  },
  startBtnText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
});
