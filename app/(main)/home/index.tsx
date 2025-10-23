import { LocationPin } from "@/app/components/locationPin";
import { useRideStore } from "@/src/stores/rider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";

const Page = () => {
  const router = useRouter();
  const startRide = useRideStore((state) => state.startRide);
  const fetchRides = useRideStore((state) => state.getliveRide);
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState<"pickup" | "dropoff">("pickup");
  const rideData = useRideStore((state) => state.liveRide);

  useEffect(() => {
    fetchRides();
  }, []);

  if (showMap) {
    return <LocationPin type={mapType} setShowMap={setShowMap} />;
  }

  return (
    <>
      <View className="flex-1 bg-gradient-to-b from-yellow-50 to-white px-6 pt-16">
        <TouchableOpacity
          onPress={() => {
            setMapType("pickup");
            router.push("/(main)/home/rideForm");
          }}
          className="w-full bg-gray-200  border border-slate-800 rounded-2xl px-4 py-4 mb-4 shadow-sm"
        >
          <Text className="text-gray-700 text-base font-medium">
            Where are you going?
          </Text>
        </TouchableOpacity>
      </View>
      {rideData && (
        <View className="mt-8 border border-gray-200 bg-gray-50 p-5 rounded-2xl shadow-sm">
          <Text className="text-xl font-bold text-black mb-4">
            🚖 Ride Details
          </Text>
          <Text className="text-gray-800">
            <Text className="font-semibold">Ride ID:</Text> {rideData.id}
          </Text>
          <Text className="text-gray-800">
            <Text className="font-semibold">From:</Text> {rideData.fromLocation}
          </Text>
          <Text className="text-gray-800">
            <Text className="font-semibold">To:</Text> {rideData.toLocation}
          </Text>
          <Text
            className={`font-semibold ${
              rideData.status === "ASSIGNED"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Status: {rideData.status}
          </Text>
        </View>
      )}
    </>
  );
};

export default Page;
