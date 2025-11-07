import { LocationPin } from "@/app/components/locationPin";
import { useMap } from "@/src/stores/useMap";
import { useRideStore } from "@/src/stores/useRiderStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";
import { RideService } from "@/src/services/rideService";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { goBack } from "expo-router/build/global-state/routing";

const Page = () => {
  const {
    setRideForm,
    startRide,
    rideForm,
    loading,
    getliveRide,
    liveRide,
    isRideReady,
    setRideDetails,
  } = useRideStore();
  const { from_address, to_address } = rideForm;

  const { showMap, setShowMap } = useMap((state) => state);
  const [mapType, setMapType] = useState<"pickup" | "dropoff">("pickup");
  const rideService = useMemo(() => new RideService(), []);

  useEffect(() => {
    useRideStore.getState().getliveRide();
  }, []);

  useEffect(() => {
    if (isRideReady) {
      const fetch = async () => {
        const res = await rideService.getDistance(rideForm);
        setRideDetails({
          estimatedDistance: res.distance,
          estimatedTime: res.duration,
          estimatedfare: res.estimatedprices,
        });
      };
      fetch();
      router.push("/home/ridePrepared");
    }
  }, [isRideReady]);

  const onSubmit = async () => {
    await startRide();
  };
  if (showMap) {
    return <LocationPin type={mapType} setShowMap={setShowMap} />;
  }

  return (
    <LinearGradient
      colors={["#ffffff", "#e5e5e5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 px-5 py-6 pt-14"
    >
      {/* Header */}
      <Animated.View
        entering={FadeInDown}
        className="flex-row items-center mb-8"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.replace("/(main)/home"); // or router.navigate("/(main)/home")
          }}
          className="w-10 h-10 rounded-xl bg-[#14213d]/10 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#14213d" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ml-4 text-[#14213d]">
          Plan Your Ride
        </Text>
      </Animated.View>

      {/* Card */}
      <Animated.View
        entering={FadeInUp.delay(80)}
        className="bg-[#ffffff] rounded-3xl p-6 shadow-sm border border-[#e5e5e5]"
      >
        {/* Pickup */}
        <TouchableOpacity
          onPress={() => {
            setMapType("pickup");
            setShowMap(true);
          }}
          className="flex-row items-center bg-[#e5e5e5]/40 rounded-2xl p-4 mb-4 border border-[#e5e5e5]"
        >
          <View className="h-3 w-3 rounded-full bg-[#fca311] mr-4" />
          <TextInput
            editable={false}
            placeholder="Your current location"
            placeholderTextColor="#9ca3af"
            value={from_address || ""}
            className="flex-1 text-[#000000] font-medium"
          />
        </TouchableOpacity>

        {/* Drop */}
        <TouchableOpacity
          onPress={() => {
            setMapType("dropoff");
            setShowMap(true);
          }}
          className="flex-row items-center bg-[#e5e5e5]/40 rounded-2xl p-4 border border-[#e5e5e5]"
        >
          <View className="h-3 w-3 rounded-full bg-[#14213d] mr-4" />
          <TextInput
            editable={false}
            placeholder="Where are you going?"
            placeholderTextColor="#9ca3af"
            value={to_address || ""}
            className="flex-1 text-[#000000] font-medium"
          />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-6">
          <TouchableOpacity
            onPress={() => {
              setMapType("dropoff");
              setShowMap(true);
            }}
            className="flex-1 bg-[#14213d]/10 rounded-2xl py-4 items-center mr-3 border border-[#14213d]/20"
          >
            <Ionicons name="map-outline" size={20} color="#14213d" />
            <Text className="text-[#14213d] mt-1 text-sm">Use Map</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-[#14213d]/10 rounded-2xl py-4 items-center ml-3 border border-[#14213d]/20">
            <Ionicons name="add" size={20} color="#14213d" />
            <Text className="text-[#14213d] mt-1 text-sm">Add Stop</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Find Ride Button */}
      <Animated.View entering={FadeInUp.delay(140)} className="mt-8">
        <TouchableOpacity
          onPress={onSubmit}
          activeOpacity={0.9}
          className="rounded-2xl overflow-hidden"
        >
          <LinearGradient
            colors={["#fca311", "#14213d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">
              Find My Ride
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Loading */}
      {loading && (
        <Animated.View
          entering={FadeInUp}
          className="absolute bottom-6 left-6 right-6 flex-row items-center justify-between bg-[#14213d] px-5 py-3 rounded-2xl shadow-lg"
        >
          <Text className="text-white font-medium">
            Searching for rides nearby...
          </Text>
          <ActivityIndicator color="#fca311" />
        </Animated.View>
      )}
    </LinearGradient>
  );
};

export default Page;
