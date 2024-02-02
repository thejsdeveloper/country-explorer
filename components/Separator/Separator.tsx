import { View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

export default function Separator() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.bg.secondary,
      }}
    />
  );
}
