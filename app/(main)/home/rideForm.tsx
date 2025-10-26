import { LocationPin } from "@/app/components/locationPin";
import { useMap } from "@/src/hooks/useMap";
import { rideDetails, useRideStore } from "@/src/stores/rider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";
import { RideService } from "@/src/services/rideService";

const Page = () => {
  const user = auth.currentUser;
  const { from_address, to_address } = useRideStore((state) => state.rideForm);
  const setRideForm = useRideStore((state) => state.setRideForm);
  const startRide = useRideStore((state) => state.startRide);
  const rideFormData = useRideStore((state) => state.rideForm);

  const loading = useRideStore((state) => state.loading);

  const fetchRides = useRideStore((state) => state.getliveRide);
  const rideData = useRideStore((state) => state.liveRide);

  const listenRideEvents = useRideStore((state) => state.listenRideEvents);
  const { showMap, setShowMap } = useMap((state) => state);
  const [mapType, setMapType] = useState<"pickup" | "dropoff">("pickup");
  const isRideReady = useRideStore((state) => state.isRideReady);
  const rideService = new RideService();
  useEffect(() => {
    fetchRides();
  }, []);

  useEffect(() => {
    if (isRideReady) {
      console.log("isRideReady changed:", isRideReady);

      const fetch = async () => {
        const res = await rideService.getDistance(rideFormData);
        useRideStore.setState({
          rideDetails: {
            estimatedDistance: res.distance,
            estimatedTime: res.duration,
            estimatedfare: res.estimatedprices,
          },
        });
        console.log("rideDetails:", res);
      };
      fetch();
      router.push("/home/ridePrepared");
    }
  }, [isRideReady]);

  const onSubmit = async () => {
    const res = await startRide();
  };

  if (showMap) {
    return <LocationPin type={mapType} setShowMap={setShowMap} />;
  }
  return (
    <View className="flex-1 bg-white px-5 py-6">
      {/* Back Button + Header */}
      <View className="flex-row items-center mb-8">
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.navigate("/(main)/home")}
        />
        <Text className="text-2xl font-bold ml-3">Drop</Text>
      </View>

      {/* Pickup Location */}
      <TouchableOpacity
        onPress={() => {
          setMapType("pickup");
          setShowMap(true);
        }}
        className="mb-4"
      >
        <View className="flex-row items-center border border-gray-300 rounded-2xl p-4 bg-gray-50">
          <View className="h-4 w-4 rounded-full bg-green-600 mr-4" />
          <TextInput
            editable={false}
            placeholder="Your Current Location"
            placeholderTextColor="#888"
            className="flex-1 text-black"
            value={from_address || ""}
          />
        </View>
      </TouchableOpacity>

      {/* Drop Location */}
      <TouchableOpacity
        onPress={() => {
          setMapType("dropoff");
          setShowMap(true);
        }}
        className="mb-6"
      >
        <View className="flex-row items-center border border-gray-300 rounded-2xl p-4 bg-gray-50">
          <View className="h-4 w-4 rounded-full bg-orange-500 mr-4" />
          <TextInput
            editable={false}
            placeholder="Drop location"
            placeholderTextColor="#888"
            className="flex-1 text-black"
            value={to_address || ""}
          />
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View className="flex-row justify-between mb-8">
        <TouchableOpacity
          onPress={() => {
            setMapType("dropoff");
            setShowMap(true);
          }}
          className="flex-1 border border-gray-300 rounded-2xl py-4 items-center mr-2"
        >
          <Ionicons name="map" size={20} color="#000" />
          <Text className="text-black mt-1">Select on map</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 border border-gray-300 rounded-2xl py-4 items-center ml-2">
          <Ionicons name="add" size={20} color="#000" />
          <Text className="text-black mt-1">Add stops</Text>
        </TouchableOpacity>
      </View>

      {/* Start Ride */}
      <TouchableOpacity
        onPress={onSubmit}
        className="bg-black rounded-2xl py-4 items-center"
      >
        <Text className="text-white font-semibold text-lg">Start Ride</Text>
      </TouchableOpacity>

      {/* Loading Overlay */}
      {loading && (
        <View className="absolute bottom-6 left-6 right-6 flex-row items-center justify-between bg-gray-800 px-5 py-3 rounded-2xl">
          <Text className="text-white font-medium">
            Searching for rides nearby...
          </Text>
          <ActivityIndicator color="#fff" />
        </View>
      )}

      {/* Ride Details Card */}
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
    </View>
  );
};

export default Page;
