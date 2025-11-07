import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black", // coral accent
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          paddingBottom: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <AntDesign
                name="home"
                size={24}
                color={focused ? "black" : color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="myRides/index"
        options={{
          title: "My Rides",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <AntDesign
                name="car"
                size={24}
                color={focused ? "black" : color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <AntDesign
                name="user"
                size={24}
                color={focused ? "black" : color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
