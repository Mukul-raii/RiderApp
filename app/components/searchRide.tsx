import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SearchRideScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-xl font-bold mb-4">
        Searching for rides nearby...
      </Text>

      <TouchableOpacity
        onPress={() => router.back()} // 👈 back button
        className="mt-6 bg-blue-500 px-5 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
