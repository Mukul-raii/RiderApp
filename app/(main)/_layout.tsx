import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
const Layout = () => {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "coral", headerShown: false }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)/index"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};
export default Layout;
