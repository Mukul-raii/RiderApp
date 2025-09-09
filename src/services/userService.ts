import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const userAuthenticate = async (user: string) => {
  if (!user) {
    throw new Error("No user found");
  }
  try {
    console.log(
      "Authenticating user:",
      user,
      `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/rider/auth`
    );
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/rider/auth`,
      { idToken: user },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jwtToken = res.headers["authorization"]?.split(" ")[1];
    if (jwtToken) {
      save("authToken", jwtToken);
      console.log("JWT stored successfully");
    } else {
      throw new Error("No token returned from server");
    }
    return res;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export const userProfile = async () => {
  try {
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/rider/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getValueFor("authToken")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export async function save(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value); // Web
    } else {
      // mobile
      await SecureStore.setItemAsync(key, value.toString());
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export async function getValueFor(key: string) {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem(key); // Web
    } else {
      const result = await SecureStore.getItemAsync(key);
      return result;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

export async function deleteValueFor(key: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(key); // Web
    } else {
      await SecureStore.deleteItemAsync(key); // ✅ works on native
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
