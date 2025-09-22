import { searchRide } from "@/app/components/searchRide";
import { getRide } from "@/src/stores/rider";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";

const Page = () => {
  const user = auth.currentUser;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const startRide = getRide((state) => state.startRide);
  const loading = getRide((state) => state.loading);
  const rideData = getRide((state) => state.ride);

  console.log("Current ride data:", rideData);
  const onSubmit = async () => {
    console.log({ from, to });
    const res = await startRide(from, to);
    console.log({ res });
  };

  return (
    <View className="flex-1 justify-start items-start bg-white px-6 py-10 ">
      <Text className="text-lg font-semibold mb-6">Welcome back,</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="From"
        value={from}
        onChangeText={setFrom}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
        placeholder="To"
        value={to}
        onChangeText={setTo}
      />

      <TouchableOpacity className="w-full bg-green-600 rounded-xl py-3 mb-4">
        <Text
          className="text-white text-center font-semibold"
          onPress={onSubmit}
        >
          Start Ride
        </Text>
      </TouchableOpacity>
      {loading && (
        <View className="absolute bottom-5 right-5 p-4 rounded-xl border border-blue-400 bg-blue-200 shadow-lg">
          <Text className="font-semibold text-gray-800" onPress={searchRide}>
            Searching for rides nearby...
          </Text>
        </View>
      )}
      {rideData && (
        <View className="flex-1 bg-white px-6 py-10">
          <View className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
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
        </View>
      )}
    </View>
  );
};

export default Page;
