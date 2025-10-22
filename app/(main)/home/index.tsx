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

  useEffect(() => {
    fetchRides();
  }, []);

  if (showMap) {
    return <LocationPin type={mapType} setShowMap={setShowMap} />;
  }

  return (
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
  );
};

export default Page;
