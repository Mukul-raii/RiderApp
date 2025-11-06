import { userStore } from "@/src/stores/user";
import { Stack } from "expo-router";
import "./global.css";
import GlobalLoader from "./components/globalLoader";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const user = userStore((s) => s.user); // or useany auth context

  return (
    <SafeAreaProvider>
      <GlobalLoader />
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
    </SafeAreaProvider>
  );
}
