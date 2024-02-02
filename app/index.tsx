import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { COUNTRIES_URL } from "@/constants/endpoint";
import useFetch from "@/hooks/useFetch/useFetch";
import { Country } from "@/types/country";

export default function Home() {
  const { data, error } = useFetch<Country[]>(COUNTRIES_URL);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          title: "Countries",
        }}
      />
      <Text>Home Screen</Text>
      <Link href="/countries/India">Go to Details</Link>
    </View>
  );
}
