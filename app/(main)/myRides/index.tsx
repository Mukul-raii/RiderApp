import { useRideStore } from "@/src/stores/rider";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const Page = () => {
  const fetchRides = useRideStore((state) => state.getAllRides);
  const rides = useRideStore((state) => state.allrides);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  const renderRide = ({ item }: { item: any }) => (
    <View className="bg-white p-4 rounded-2xl mb-4 shadow">
      <Text className="text-lg font-bold mb-2">🚖 Ride #{item.id}</Text>
      <Text className="text-base text-gray-700">
        📍 From: {item.fromLocation}
      </Text>
      <Text className="text-base text-gray-700">🏁 To: {item.toLocation}</Text>
      <Text className="text-base font-medium text-blue-600">
        📌 Status: {item.status}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        🕒 {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">My Rides</Text>
      {!rides || rides.length === 0 ? (
        <Text className="text-center text-gray-500 mt-6 text-base">
          No rides available
        </Text>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRide}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default Page;
