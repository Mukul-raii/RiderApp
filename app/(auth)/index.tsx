import { getValueFor } from "@/src/services/userService";
import { userAuth, userStore } from "@/src/stores/user";
import { initSocket } from "@/src/utils/socket";
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
  Alert, // Imported for better error handling
  ActivityIndicator, // Imported for inline loading
} from "react-native";
import { LoadingApp } from "../components/loadingScreens";
import { Ionicons } from "@expo/vector-icons"; // Imported for password visibility toggle

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // New state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const { type, setType } = userAuth();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const { fetchUser } = userStore();

  // --- Initial Auth Check (Keep original logic) ---
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getValueFor("authToken");

        console.log("Auth token:", token);
        if (token) {
          router.replace("/(main)/home");
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
  // ------------------------------------------------

  const authenticate = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await firebaseAuth(email, password, type);

      if (res) {
        console.log("1 Auth Done ");

        await fetchUser(); // ✅ ensure store is updated
        console.log("2 user fetched");

        initSocket(); // now user.firebaseUid will exist
        console.log("3 init socket");

        // Use router.replace to prevent going back to the login screen
        router.replace("/(main)/home");
        console.log("4 routing to home");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      // Use Alert.alert for better user experience than generic alert()
      Alert.alert(
        "Authentication Failed",
        "The credentials you entered are incorrect or the account does not exist. Please check your email and password and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isLogin = type === "login";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-12"
        contentContainerClassName="justify-center"
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="mb-10 mt-8">
          <Text className="text-4xl font-extrabold text-gray-900 mb-2">
            Let's {isLogin ? "Sign You In" : "Get Started"}
          </Text>
          <Text className="text-base text-gray-500">
            {isLogin
              ? "Welcome back! You’ve been missed."
              : "Create an account to join the community."}
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-5">
          {/* Email Input */}
          <View>
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="#999"
              className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-base text-black shadow-sm"
            />
          </View>

          {/* Password Input with Toggle */}
          <View>
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center rounded-xl border border-gray-300 bg-gray-50 px-4 shadow-sm">
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                className="flex-1 py-3 text-base text-black"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
                className="p-1"
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In/Register Button */}
          <TouchableOpacity
            onPress={authenticate}
            className="bg-blue-600 rounded-xl py-4 items-center mt-6 shadow-lg shadow-blue-200"
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white font-bold text-lg">
                {isLogin ? "Sign In" : "Register"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Footer - Toggle Auth Type */}
          <TouchableOpacity
            onPress={() => setType(isLogin ? "register" : "login")}
            className="items-center pt-4"
          >
            <Text className="text-base text-gray-500">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text className="text-blue-600 font-bold">
                {isLogin ? "Register" : "Login"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
