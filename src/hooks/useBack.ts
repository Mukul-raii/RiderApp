import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useBack = (setShow) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setShow(false);
        return true; // Prevent default behavior
      },
    );
    return () => subscription.remove();
  });
};
