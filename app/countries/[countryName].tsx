import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useCountryDetails } from "@/hooks/useCountries/useCountries";
import Error from "@/components/Error/Error";

export default function CountryDetails() {
  const { countryName } = useLocalSearchParams<{ countryName: string }>();

  const { country, error } = useCountryDetails({
    countryCode: countryName,
  });

  if (true) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Country Details",
          }}
        />
        <Error
          title="There is some issue while loading country."
          message="Please go back and try again"
        />
      </>
    );
  }

  if (country) {
    console.log("Country received ====> ", country);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: countryName,
        }}
      />
      <Text>Country Details!!!!</Text>
    </View>
  );
}
