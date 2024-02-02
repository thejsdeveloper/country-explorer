import { View, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import Separator from "../Separator/Separator";
import { CIRCLE_SIZE } from "@/constants/dimension";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function Loading() {
  return (
    <>
      <View style={styles.container}>
        <ShimmerPlaceholder style={styles.flag} />
        <ShimmerPlaceholder />
        <ShimmerPlaceholder style={styles.code} />
      </View>
      <Separator />
      <View style={styles.container}>
        <ShimmerPlaceholder style={styles.flag} />
        <ShimmerPlaceholder />
        <ShimmerPlaceholder style={styles.code} />
      </View>
      <Separator />
      <View style={styles.container}>
        <ShimmerPlaceholder style={styles.flag} />
        <ShimmerPlaceholder />
        <ShimmerPlaceholder style={styles.code} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.space.base,
  },
  flag: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: 50,
    marginRight: theme.space.base,
    borderWidth: 1,
    borderColor: theme.colors.ui.tertiary,
  },
  code: {
    width: 40,
    marginLeft: "auto",
  },
});
