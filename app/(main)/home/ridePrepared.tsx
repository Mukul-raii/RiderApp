import { MapLocation } from "@/app/components/map";
import { useMap } from "@/src/hooks/useMap";
import { useRideStore } from "@/src/stores/rider";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RidePrepared() {
  const { rideForm, rideDetails } = useRideStore();

  const handleStartRide = async () => {
    await useRideStore.getState().startRide();
    console.log("🚀 Ride started!");

    // Navigate to the ride in progress screen
    router.replace("/(main)/home");
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log("RidePrepared unmounting");
        useMap.getState().clearMapState();
        useRideStore.getState().clearRide();
        console.log("RidePrepared unmounted");
      };
    }, []),
  );
  return (
    <View style={styles.container}>
      {/* 🗺️ Map Layer - Full Screen */}
      <View style={styles.mapContainer}>
        <MapLocation />
      </View>

      {/* 📍 Bottom Sheet Layer - Overlay */}
      <View style={styles.bottomSheet}>
        <Text className="text-2xl font-bold mb-5">🚖 Ride Details</Text>

        <View className="flex-row justify-between mb-3">
          <Text className="text-base text-gray-600 font-medium">
            Destination:
          </Text>
          <Text
            className="text-base font-semibold text-black w-1/2 text-right"
            numberOfLines={2}
          >
            {rideForm.to_address}
          </Text>
        </View>

        <View className="flex-row justify-between mb-3">
          <Text className="text-base text-gray-600 font-medium">Distance:</Text>
          <Text className="text-base font-semibold text-black">
            {Number(rideDetails.estimatedDistance / 1000).toFixed(2)} Km
          </Text>
        </View>
        <View className="flex-row justify-between mb-3">
          <Text className="text-base text-gray-600 font-medium">Time:</Text>
          <Text className="text-base font-semibold text-black">
            {Number(rideDetails.estimatedTime / 60).toFixed(2)} min
          </Text>
        </View>

        <View className="flex-row justify-between mb-6">
          <Text className="text-base text-gray-600 font-medium">
            Estimated Fare:
          </Text>
          <Text className="text-base font-semibold text-green-600">
            Rs. {rideDetails.estimatedfare}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleStartRide}
          className="bg-black py-4 rounded-2xl mt-2 items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">Start Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
});
