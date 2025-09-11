import { userStore } from "@/src/stores/user";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";

const ProfilePage = () => {
  const user = userStore((state) => state.user);
  const getUser = userStore((state) => state.getUser);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser(); // fetch and store user
    }
    console.log("Profile user:", user);
  }, [user]);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-6 py-12">
      {/* Profile Header */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-purple-100 items-center justify-center">
          <Text className="text-3xl font-bold text-purple-600">
            {user?.name?.charAt(0)?.toUpperCase() ||
              user?.email?.charAt(0)?.toUpperCase() ||
              "?"}
          </Text>
        </View>
        <Text className="text-2xl font-semibold mt-4">{user.name}</Text>
        <Text className="text-gray-500">{user?.email}</Text>
      </View>

      {/* User Info */}
      <View className="bg-gray-100 rounded-2xl p-5 mb-6">
        <Text className="text-sm text-gray-500">Role</Text>
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          {user?.role}
        </Text>

        <Text className="text-sm text-gray-500">Phone</Text>
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          {user?.phone || "Not provided"}
        </Text>

        <Text className="text-sm text-gray-500">Member Since</Text>
        <Text className="text-lg font-semibold text-gray-800">
          {new Date(user?.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Actions */}
      <TouchableOpacity
        onPress={() => router.push("/(main)/settings")}
        className="bg-purple-600 py-4 rounded-2xl items-center mb-4"
      >
        <Text className="text-white text-lg font-semibold">Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => auth.signOut()}
        className="border border-red-500 py-4 rounded-2xl items-center"
      >
        <Text className="text-red-500 text-lg font-semibold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;
