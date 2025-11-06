"use client";

import React, { useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0ea5e9",
  },
});

export default function LoadingDots() {
  const anim1 = React.useRef(new Animated.Value(0)).current;
  const anim2 = React.useRef(new Animated.Value(0)).current;
  const anim3 = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.sequence([
            Animated.timing(anim1, {
              toValue: 1,
              duration: 400,
              useNativeDriver: false,
            }),
            Animated.timing(anim1, {
              toValue: 0,
              duration: 400,
              useNativeDriver: false,
            }),
          ]),
        ]),
      );
    };

    Animated.stagger(100, [
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(anim1, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim2, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(anim2, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim3, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(anim3, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ]),
      ),
    ]).start();
  }, []);

  const opacity1 = anim1;
  const opacity2 = anim2;
  const opacity3 = anim3;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: opacity1 }]} />
      <Animated.View style={[styles.dot, { opacity: opacity2 }]} />
      <Animated.View style={[styles.dot, { opacity: opacity3 }]} />
    </View>
  );
}
