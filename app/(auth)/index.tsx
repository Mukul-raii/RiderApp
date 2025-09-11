import { getValueFor } from "@/src/services/userService";
import { userAuth } from "@/src/stores/user";
import { firebaseAuth } from "@/src/utils/userAuth";
import { Link, useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoadingApp } from "../components/loadingScreens";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { type, setType } = userAuth();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

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
        navigate("/(main)/(home)"); // or use router.replace if you use expo-router
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-6 py-20"
    >
      <View className="flex-1 justify-center">
        {/* Header */}
        <View className="mb-12">
          <Text className="text-3xl font-bold mb-2">Lets Sign You In</Text>
          <Text className="text-lg text-gray-600">
            Welcome back! You have been missed.
          </Text>
        </View>
        <Link href={"/(main)/(home)"}>Reroute</Link>

        {/* Form */}
        <View className="space-y-6">
          {/* Email */}
          <View>
            <Text className="text-lg font-semibold mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </View>

          {/* Password */}
          <View>
            <Text className="text-lg font-semibold mb-1">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={() => {
              authenticate();
            }}
            className="bg-purple-600 rounded-lg py-3 items-center"
          >
            <Text className="text-white text-lg font-semibold">
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          {type === "register" ? (
            <Text className="text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Text
                className="text-purple-600"
                onPress={() => setType("login")}
              >
                Login
              </Text>
            </Text>
          ) : (
            <Text className="text-center text-gray-500 mt-4">
              Dont have an account?{" "}
              <Text
                className="text-purple-600"
                onPress={() => setType("register")}
              >
                Register
              </Text>
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
