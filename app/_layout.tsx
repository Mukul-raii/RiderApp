import { userStore } from "@/src/stores/user";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  const user = userStore((s) => s.user); // or useany auth context

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}{" "}
    </Stack>
  );
}
