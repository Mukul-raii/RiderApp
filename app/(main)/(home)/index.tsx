import { useRideStore } from "@/src/stores/rider";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";

const Page = () => {
  const user = auth.currentUser;
  const { from, to } = useRideStore((state) => state.rideForm);
  const setRideForm = useRideStore((state) => state.setRideForm);
  const startRide = useRideStore((state) => state.startRide);
  const loading = useRideStore((state) => state.loading);

  const fetchRides = useRideStore((state) => state.getliveRide);
  const rideData = useRideStore((state) => state.liveRide);

  const listenRideEvents = useRideStore((state) => state.listenRideEvents);

  useEffect(() => {
    fetchRides();
  }, []);

  const onSubmit = async () => {
    const res = await startRide(from, to);
    console.log("Ride started:", res);
  };

  return (
    <View className="flex-1 bg-white px-6 py-10">
      <Text className="text-2xl font-bold mb-8 text-gray-900">
        Welcome back 👋
      </Text>

      {/* From Input */}
      <TextInput
        className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-base"
        placeholder="Pickup location"
        value={from}
        onChangeText={(text) => setRideForm(text, to)}
      />

      {/* To Input */}
      <TextInput
        className="w-full border border-gray-300 rounded-2xl px-4 py-3 mb-6 text-base"
        placeholder="Drop-off location"
        value={to}
        onChangeText={(text) => setRideForm(from, text)}
      />

      {/* Start Ride Button */}
      <TouchableOpacity
        className="w-full bg-green-600 rounded-2xl py-4 shadow-md active:bg-green-700"
        onPress={onSubmit}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Start Ride
        </Text>
      </TouchableOpacity>

      {/* Floating Loading Toast */}
      {loading && (
        <View className="absolute bottom-6 right-6 left-6 flex-row items-center justify-between bg-blue-500 px-5 py-3 rounded-2xl shadow-lg">
          <Text className="text-white font-medium">
            Searching for rides nearby...
          </Text>
          <ActivityIndicator color="#fff" />
        </View>
      )}

      {/* Ride Details */}
      {rideData && (
        <View className="mt-10 w-full rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            🚖 Ride Details
          </Text>

          <View className="space-y-2">
            <Text className="text-gray-700">
              <Text className="font-semibold">Ride ID:</Text> {rideData.id}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-semibold">From:</Text>{" "}
              {rideData.fromLocation}
            </Text>
            <Text className="text-gray-700">
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
        </View>
      )}
    </View>
  );
};

export default Page;
