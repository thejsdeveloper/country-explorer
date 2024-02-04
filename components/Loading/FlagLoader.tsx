import { StyleSheet } from "react-native";
import React from "react";

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { FLAG_HEIGHT } from "@/constants/dimension";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function FlagLoader() {
  return <ShimmerPlaceholder style={styles.flag} />;
}

const styles = StyleSheet.create({
  flag: {
    width: "100%",
    height: FLAG_HEIGHT,
  },
});
