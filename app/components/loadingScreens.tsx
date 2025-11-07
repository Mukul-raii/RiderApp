"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  Modal,
} from "react-native";
import RiderLogo from "./Loader/RiderLogo";
import AnimatedCar from "./Loader/AnimatedCar";
import LocationPin from "./Loader/LocationPin";
import LoadingDots from "./Loader/LoadingDots";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e27",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  logoWrapper: {
    backgroundColor: "#1e3a8a",
    padding: 24,
    borderRadius: 16,
  },
  carSection: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  textSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    fontWeight: "300",
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 32,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22d3ee",
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#64748b",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },
  checkmark: {
    fontSize: 40,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#cbd5e1",
  },
});

export default function LoadingScreen(isLoading) {
  const pulseAnim1 = React.useRef(new Animated.Value(0)).current;
  const pulseAnim2 = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate background blobs
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim1, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim2, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim2, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const blob1Opacity = pulseAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  const blob2Opacity = pulseAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: blob1Opacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.background,
          {
            opacity: blob2Opacity,
          },
        ]}
      />

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <RiderLogo />
          </View>
        </View>

        {/* Animated car section */}
        <View style={styles.carSection}>
          <AnimatedCar />
          <LocationPin style={{ position: "absolute", top: 32, right: 32 }} />
          <LocationPin style={{ position: "absolute", bottom: 48, left: 16 }} />
        </View>

        {/* Text section */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Finding Your Ride</Text>
          <Text style={styles.subtitle}>
            Connecting you with the best drivers nearby
          </Text>
        </View>

        {/* Loading dots */}
        <LoadingDots />

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#3b82f6" }]}>50K+</Text>
            <Text style={styles.statLabel}>Active Drivers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#22d3ee" }]}>4.8★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#a855f7" }]}>24/7</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by RideHub™</Text>
      </View>

      {/* Completion modal */}
      <Modal
        transparent
        animationType="fade"
        visible={!isLoading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.modalTitle}>Ride Found!</Text>
            <Text style={styles.modalSubtitle}>Your driver is on the way</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
