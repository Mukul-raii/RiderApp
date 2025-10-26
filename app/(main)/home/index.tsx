import { LocationPin } from "@/app/components/locationPin";
import { useRideStore } from "@/src/stores/rider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DriverLocation } from "@/app/components/viewDriver";

const Page = () => {
  const router = useRouter();
  const startRide = useRideStore((state) => state.startRide);
  const fetchRides = useRideStore((state) => state.getliveRide);
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState<"pickup" | "dropoff">("pickup");
  const [showDriverLocation, setShowDriverLocation] = useState(false);
  const rideData = useRideStore((state) => state.liveRide);

  useEffect(() => {
    fetchRides();
  }, []);

  if (showMap) return <LocationPin type={mapType} setShowMap={setShowMap} />;
  if (showDriverLocation) return <DriverLocation />;

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      {/* Search Box */}
      <TouchableOpacity
        onPress={() => {
          setMapType("pickup");
          router.push("/(main)/home/rideForm");
        }}
        className="bg-gray-100 border border-gray-300 rounded-2xl px-5 py-4 mb-6 shadow-sm"
      >
        <Text className="text-gray-700 text-lg font-medium">
          Where are you going?
        </Text>
      </TouchableOpacity>

      {/* Active Ride Card */}
      {rideData && (
        <View className="border border-gray-200 bg-white rounded-2xl p-5 shadow-md">
          <Text className="text-xl font-semibold text-gray-900 mb-2">
            🚖 Your Ride
          </Text>

          <View className="mt-2 space-y-1">
            <Text className="text-gray-700">
              <Text className="font-semibold text-gray-900">From:</Text>{" "}
              {rideData.fromLocation}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-semibold text-gray-900">To:</Text>{" "}
              {rideData.toLocation}
            </Text>
          </View>

          <View className="mt-4 flex-row justify-between items-center">
            <Text
              className={`text-base font-semibold ${
                rideData.status === "ASSIGNED"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {rideData.status === "ASSIGNED"
                ? "Driver Assigned"
                : rideData.status === "IN_PROGRESS"
                  ? "Ride in Progress"
                  : rideData.status}
            </Text>

            {rideData.status === "IN_PROGRESS" && (
              <TouchableOpacity
                onPress={() => setShowDriverLocation(true)}
                className="bg-blue-600 px-4 py-2 rounded-full"
              >
                <Text className="text-white font-semibold text-sm">
                  View Driver
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Page;
