import { LocationPin } from "@/app/components/locationPin";
import { useRideStore } from "@/src/stores/rider";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();
  const user = auth.currentUser;
  const { from_address, to_address } = useRideStore((state) => state.rideForm);
  const setRideForm = useRideStore((state) => state.setRideForm);
  const startRide = useRideStore((state) => state.startRide);
  const loading = useRideStore((state) => state.loading);

  const fetchRides = useRideStore((state) => state.getliveRide);
  const rideData = useRideStore((state) => state.liveRide);

  const listenRideEvents = useRideStore((state) => state.listenRideEvents);
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState<"pickup" | "dropoff">("pickup");

  useEffect(() => {
    fetchRides();
  }, []);

  const onSubmit = async () => {
    const res = await startRide();
  };

  if (showMap) {
    return <LocationPin type={mapType} setShowMap={setShowMap} />;
  }

  return (
    <View className="flex-1 bg-white px-6 py-8">
      {/* Pickup Input */}
      <TouchableOpacity
        onPress={() => {
          setMapType("pickup");
          setShowMap(true);
        }}
      >
        <TextInput
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-black bg-gray-50"
          placeholder="Where are you going "
          placeholderTextColor="#999"
          onPress={() => router.replace("/(main)/(home)/(rideForm)")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Page;
