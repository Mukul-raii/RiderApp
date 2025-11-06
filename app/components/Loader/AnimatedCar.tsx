"use client";

import React, { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  carWrapper: {
    width: 160,
    height: 100,
  },
});

export default function AnimatedCar() {
  const moveAnim = React.useRef(new Animated.Value(0)).current;
  const wheelRotation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Car movement animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 40,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Wheel rotation animation
    Animated.loop(
      Animated.timing(wheelRotation, {
        toValue: 360,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = moveAnim;
  const wheelRotate = wheelRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.carWrapper,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <Svg width="100%" height="100%" viewBox="0 0 160 100">
          {/* Car body */}
          <Path
            d="M 30 65 Q 30 50 45 50 L 115 50 Q 130 50 130 65 L 130 75 Q 130 80 125 80 L 35 80 Q 30 80 30 75 Z"
            fill="#1e40af"
            stroke="#0ea5e9"
            strokeWidth="2"
          />

          {/* Car top */}
          <Path
            d="M 50 50 L 60 30 L 100 30 L 110 50"
            fill="#3b82f6"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Windows */}
          <Rect
            x="55"
            y="35"
            width="20"
            height="14"
            fill="#0ea5e9"
            opacity="0.3"
          />
          <Rect
            x="85"
            y="35"
            width="20"
            height="14"
            fill="#0ea5e9"
            opacity="0.3"
          />

          {/* Headlights */}
          <Circle cx="32" cy="65" r="4" fill="#fbbf24" opacity="0.8" />

          {/* Wheels - front */}
          <Circle
            cx="50"
            cy="82"
            r="8"
            fill="#1f2937"
            stroke="#0ea5e9"
            strokeWidth="1"
          />
          <Circle
            cx="50"
            cy="82"
            r="5"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Wheels - back */}
          <Circle
            cx="110"
            cy="82"
            r="8"
            fill="#1f2937"
            stroke="#0ea5e9"
            strokeWidth="1"
          />
          <Circle
            cx="110"
            cy="82"
            r="5"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Speed lines */}
          <Path
            d="M 20 60 L 25 60"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.6"
            strokeDasharray="2,2"
          />
          <Path
            d="M 15 70 L 22 70"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.4"
            strokeDasharray="2,2"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
