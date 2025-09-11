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
        <View className="flex-1 justify-start items-start bg-white px-6 py-10 ">
          <Text className="mt-6 text-lg font-semibold">Ride Details:</Text>
          <Text className="mt-2 text-gray-700">Ride ID: {rideData.id}</Text>
          <Text className="mt-2 text-gray-700">From: {rideData.from}</Text>
          <Text className="mt-2 text-gray-700">To: {rideData.to}</Text>
          <Text className="mt-2 text-gray-700">Status: {rideData.status}</Text>
        </View>
      )}
    </View>
  );
};

export default Page;
