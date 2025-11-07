// src/components/GlobalLoader.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { useGlobalLoader } from "@/src/stores/useGlobalLoader";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

export default function GlobalLoader() {
  const visible = useGlobalLoader((state) => state.visible);

  // Animation values
  const rotation = useSharedValue(0);
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const scale3 = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      // Continuous rotation
      rotation.value = withRepeat(
        withTiming(360, { duration: 1500, easing: Easing.linear }),
        -1,
        false,
      );

      // Pulsing dots with staggered timing
      scale1.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 400 }),
          withTiming(1, { duration: 400 }),
        ),
        -1,
        false,
      );

      scale2.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 133 }),
          withTiming(1.3, { duration: 400 }),
          withTiming(1, { duration: 267 }),
        ),
        -1,
        false,
      );

      scale3.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 267 }),
          withTiming(1.3, { duration: 400 }),
          withTiming(1, { duration: 133 }),
        ),
        -1,
        false,
      );
    } else {
      rotation.value = 0;
      scale1.value = 1;
      scale2.value = 1;
      scale3.value = 1;
    }
  }, [visible]);

  // Overlay fade animation
  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(visible ? 1 : 0, { duration: 250 }),
      pointerEvents: visible ? "auto" : "none",
    };
  });

  // Box scale animation
  const boxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(visible ? 1 : 0.85, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  // Spinner rotation
  const spinnerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Dot animations
  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale3.value }],
  }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]}>
      {/* Blur background - remove if expo-blur not installed */}
      <BlurView intensity={20} style={StyleSheet.absoluteFill} />

      <Animated.View style={[styles.box, boxStyle]}>
        {/* Spinning ring loader */}
        <View style={styles.spinnerContainer}>
          <Animated.View style={[styles.spinner, spinnerStyle]}>
            <View style={styles.spinnerArc} />
          </Animated.View>

          {/* Center icon/logo */}
          <View style={styles.centerIcon}>
            <View style={styles.taxiIcon}>
              <View style={styles.taxiBody} />
              <View style={styles.taxiTop} />
            </View>
          </View>
        </View>

        {/* Pulsing dots */}
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width,
    height,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  box: {
    backgroundColor: "white",
    padding: 32,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  spinnerContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  spinner: {
    width: 80,
    height: 80,
    position: "absolute",
  },
  spinnerArc: {
    width: "100%",
    height: "100%",
    borderWidth: 4,
    borderRadius: 40,
    borderColor: "transparent",
    borderTopColor: "#fca311",
    borderRightColor: "#fca311",
  },
  centerIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#fef3e2",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  taxiIcon: {
    width: 28,
    height: 28,
    position: "relative",
  },
  taxiBody: {
    width: 24,
    height: 12,
    backgroundColor: "#fca311",
    borderRadius: 4,
    position: "absolute",
    bottom: 6,
    left: 2,
  },
  taxiTop: {
    width: 16,
    height: 8,
    backgroundColor: "#fca311",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: "absolute",
    top: 4,
    left: 6,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fca311",
  },
});
