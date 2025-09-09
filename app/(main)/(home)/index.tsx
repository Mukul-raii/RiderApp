import { getRide } from "@/src/stores/rider";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";

const Page = () => {
  const user = auth.currentUser;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const startRide = getRide((state) => state.startRide);

  const onSubmit = async () => {
    console.log({ from, to });
    const res = await startRide(from, to);
    console.log({ res });
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
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
    </View>
  );
};

export default Page;
