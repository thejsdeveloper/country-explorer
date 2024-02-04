import { View, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import Spacer from "../Spacer/Spacer";
import FlagLoader from "./FlagLoader";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function CountryDetailsLoading() {
  return (
    <>
      <View style={styles.container}>
        <FlagLoader />
        <Spacer />
        <ShimmerPlaceholder style={styles.text} />
        <ShimmerPlaceholder style={styles.text} />
        <ShimmerPlaceholder />
        <Spacer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: theme.colors.bg.primary,
    padding: theme.space.base,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    marginBottom: theme.space.base,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
