import { getValueFor } from "@/src/services/userService";
import { userStore } from "@/src/stores/user";
import { initSocket } from "@/src/utils/socket";
import { firebaseAuth } from "@/src/utils/userAuth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import LoadingScreen from "../components/loadingScreens";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { useAuth } from "@/src/hooks/useAuth";

export default function Index() {
  const {
    loginForm,
    setLoginForm,
    isLoading,
    setLoading,
    type,
    setType,
    authenticate,
  } = useAuthStore();
  const { email, password, showPassword } = loginForm;
  const [isChecking, setIsChecking] = useState(true);
  const isLogin = type === "login";
  useAuth(setIsChecking);
  const router = useRouter();
  if (isChecking || isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* App Icon/Logo */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: "#fca311",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <Ionicons name="car" size={40} color="#ffffff" />
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: "black",
              marginBottom: 8,
            }}
          >
            Welcome to RideFlow
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>
            {isLogin
              ? "Sign in to continue your journey"
              : "Create your account to get started"}
          </Text>
        </View>

        {/* Form Card */}
        <View
          style={{
            backgroundColor: "#14213d",
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: "rgba(229, 229, 229, 0.1)",
          }}
        >
          {/* Email Field */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#e5e5e5",
                marginBottom: 8,
              }}
            >
              Email
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#fca311",
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color="#fca311"
                style={{ marginRight: 12 }}
              />
              <TextInput
                value={email}
                onChangeText={(text) =>
                  setLoginForm({ ...loginForm, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="your@email.com"
                placeholderTextColor="#e5e5e5"
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#ffffff",
                  paddingVertical: 12,
                }}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#e5e5e5",
                marginBottom: 8,
              }}
            >
              Password
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#fca311",
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#fca311"
                style={{ marginRight: 12 }}
              />
              <TextInput
                value={password}
                onChangeText={(text) =>
                  setLoginForm({ ...loginForm, password: text })
                }
                secureTextEntry={!showPassword}
                placeholder="••••••••"
                placeholderTextColor="#e5e5e5"
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: "#ffffff",
                  paddingVertical: 12,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  setLoginForm({ ...loginForm, showPassword: !showPassword })
                }
                activeOpacity={0.7}
                style={{ padding: 4 }}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#e5e5e5"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password - Only show on login */}
          {isLogin && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ alignSelf: "flex-end", marginBottom: 24 }}
            >
              <Text
                style={{ fontSize: 14, color: "#fca311", fontWeight: "500" }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => {
              authenticate(router);
            }}
            style={{
              backgroundColor: "#fca311",
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              opacity: isLoading ? 0.7 : 1,
            }}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text
                style={{ color: "#000000", fontSize: 16, fontWeight: "600" }}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Toggle */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Text style={{ fontSize: 14, color: "black" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </Text>
          <TouchableOpacity
            onPress={() => setType(isLogin ? "register" : "login")}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 14, color: "#fca311", fontWeight: "600" }}>
              {isLogin ? "Sign up" : "Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
