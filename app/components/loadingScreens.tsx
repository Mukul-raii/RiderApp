import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const LoadingApp = () => {
  return (
    <View className="flex-1 bg-blue-200 items-center justify-center">
      {/* Replace with your actual logo */}
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 120, height: 120, marginBottom: 20 }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export const LoadingSpinners = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="small" color="#0000ff" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
