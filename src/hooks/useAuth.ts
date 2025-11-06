import { useEffect } from "react";
import { getValueFor } from "../services/userService";
import { router } from "expo-router";

export const useAuth = (setIsChecking) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getValueFor("authToken");
        if (token) {
          router.replace("/(main)/home");
        }
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, []);
};
