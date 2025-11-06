import { View, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
  },
});

export default function RiderLogo() {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 64 64">
        {/* Circle background */}
        <Circle cx="32" cy="32" r="28" fill="#0ea5e9" opacity="0.1" />

        {/* Car icon */}
        <Path
          d="M 20 35 Q 20 28 26 28 L 38 28 Q 44 28 44 35 L 44 40 Q 44 42 42 42 L 22 42 Q 20 42 20 40 Z"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Windows */}
        <Path
          d="M 26 28 L 30 24 L 34 24 L 38 28"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wheels */}
        <Circle cx="26" cy="42" r="3" fill="#0ea5e9" />
        <Circle cx="38" cy="42" r="3" fill="#0ea5e9" />

        {/* Checkmark */}
        <Path
          d="M 48 20 L 52 24 L 56 16"
          stroke="#22d3ee"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
