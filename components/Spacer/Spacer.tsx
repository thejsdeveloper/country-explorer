import { StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

type SpacerProps = {
  position?: keyof typeof positionVariant;
  size?: keyof typeof theme.space;
};

const Spacer = ({ position = "top", size = "base" }: SpacerProps = {}) => {
  const property = positionVariant[position];
  const style = {
    [property]: theme.space[size],
  };
  return <View style={style} />;
};

export default Spacer;

const styles = StyleSheet.create({});
