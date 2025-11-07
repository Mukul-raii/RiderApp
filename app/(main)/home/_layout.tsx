import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="rideForm" options={{ title: "Ride Form" }} />
      <Stack.Screen name="ridePrepared" options={{ title: "Ride Prepared" }} />
    </Stack>
  );
}
