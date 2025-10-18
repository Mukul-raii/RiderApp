import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { apiCalls } from "../utils/apicall";
import { auth } from "../utils/firebaseConfig";
import { initSocket } from "src/utils/socket";

export const userAuthenticate = async (
  firebaseIdToken: string,
): Promise<AxiosResponse<any>> => {
  if (!firebaseIdToken) {
    throw new Error("No firebaseIdToken found");
  }
  try {
    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_RIDER_BACKEND_URL}/user/auth/verify`,
      { idToken: firebaseIdToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Authentication response:", res);
    const jwtToken = res.data?.data?.token;
    if (jwtToken) {
      console.log("JWT stored successfully", jwtToken);
      await save("authToken", jwtToken);
    } else {
      throw new Error("No token returned from server");
    }
    return res;
  } catch (err: any) {
    if (
      err.response?.status === 401 &&
      err.response?.data?.error === "TOKEN_EXPIRED"
    ) {
      const newIdToken = await auth.currentUser?.getIdToken(true);
      if (!newIdToken) {
        throw new Error("Unable to refresh Firebase ID token");
      }
      return await userAuthenticate(newIdToken);
    }
    console.error("Error authenticating user:", err);
    throw err;
  }
};

export const userProfile = async () => {
  try {
    const data = await apiCalls({
      url: "user/profile",
      method: "GET",
    });
    console.log("User profile response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export async function save(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      console.log("Saving to localStorage:", key, value);
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
