"use client";

import React, { useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function LocationPin({ style }: any) {
  const bounceAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ translateY: bounceAnim }],
        },
      ]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 40 40">
        {/* Pin shadow */}
        <Circle cx="20" cy="28" r="6" fill="#0ea5e9" opacity="0.2" />

        {/* Pin body */}
        <Path
          d="M 20 5 C 14 5 10 9 10 15 C 10 22 20 35 20 35 C 20 35 30 22 30 15 C 30 9 26 5 20 5 Z"
          fill="#22d3ee"
          stroke="#0ea5e9"
          strokeWidth="1"
        />

        {/* Pin center dot */}
        <Circle cx="20" cy="15" r="3" fill="#0a0e27" />
      </Svg>
    </Animated.View>
  );
}
