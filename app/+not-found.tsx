import { theme } from "@/constants/theme";
import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space.base,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: "500",
    color: theme.colors.text.primary,
  },
  link: {
    marginTop: theme.space.base,
    paddingVertical: theme.space.base,
  },
  linkText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text.link,
  },
});
