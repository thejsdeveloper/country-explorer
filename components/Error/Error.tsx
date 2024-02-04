import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

type ErrorProps = {
  message: string;
  title: string;
};

export default function Error({ message, title }: ErrorProps) {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{message}</Text>
    </View>
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
  body: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text.primary,
  },
  title: {
    fontSize: theme.fontSizes.title,
    color: theme.colors.text.primary,
  },
});
