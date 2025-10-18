import { getValueFor } from "@/src/services/userService";
import { userAuth, userStore } from "@/src/stores/user";
import { firebaseAuth } from "@/src/utils/userAuth";
import { useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoadingApp } from "../components/loadingScreens";
import { initSocket } from "@/src/utils/socket";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { type, setType } = userAuth();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const { fetchUser } = userStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getValueFor("authToken");

        console.log("Auth token:", token);
        if (token) {
          router.replace("/(main)/(home)");
        }
      } finally {
        console.log("Auth check complete", isChecking);
        // ✅ Always stop checking after attempt
        setIsChecking(false);
      }
    };
    checkAuth();
  }, []);

  // prevent rendering stack until auth check is done
  if (isChecking || loading) {
    return <LoadingApp />;
  }

  const authenticate = async () => {
    try {
      setLoading(true);
      const res = await firebaseAuth(email, password, type);
      if (res) {
        console.log("1 Auth Done ");
        navigate("/(main)/(home)");
        console.log("2 user fetched");

        await fetchUser(); // ✅ ensure store is updated
        console.log("3 init socket");

        initSocket(); // now user.firebaseUid will exist
        console.log("4 completed init socket");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-20 "
        contentContainerClassName="justify-center"
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="mb-12">
          <Text className="text-3xl font-bold text-black mb-2">
            Let's Sign You In
          </Text>
          <Text className="text-base text-gray-500">
            Welcome back! You’ve been missed.
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Email */}
          <View>
            <Text className="text-gray-800 font-semibold mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="#999"
              className="border border-gray-300 rounded-xl px-4 py-3 text-black bg-gray-50"
            />
          </View>

          {/* Password */}
          <View>
            <Text className="text-gray-800 font-semibold mb-1">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="#999"
              className="border border-gray-300 rounded-xl px-4 py-3 text-black bg-gray-50"
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={authenticate}
            className="bg-black rounded-xl py-3 items-center mt-2"
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text className="text-center text-gray-500 mt-6">
            {type === "register"
              ? "Already have an account? "
              : "Don't have an account? "}
            <Text
              className="text-black font-semibold"
              onPress={() =>
                setType(type === "register" ? "login" : "register")
              }
            >
              {type === "register" ? "Login" : "Register"}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
