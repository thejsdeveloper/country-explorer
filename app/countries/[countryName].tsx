import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function CountryDetails() {
  const { countryName } = useLocalSearchParams<{ countryName: string }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: countryName,
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text>Country Details!!!!</Text>
    </View>
  );
}
