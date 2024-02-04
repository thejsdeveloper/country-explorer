import { Stack, router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  StatusBar,
  Pressable,
} from "react-native";
import { Country } from "@/types/country";
import { theme } from "@/constants/theme";
import { useCountries } from "@/hooks/useCountries/useCountries";
import Search from "@/components/Search/Search";
import Separator from "@/components/Separator/Separator";
import { CIRCLE_SIZE } from "@/constants/dimension";
import { Image } from "expo-image";
import Error from "@/components/Error/Error";
import CountryListLoading from "@/components/Loading/CountryListLoading";

const Empty = () => {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={[styles.title, styles.spacer]}>No Matching Result</Text>
      <Text style={[styles.body, styles.spacer]}>
        There is no matching country for your search
      </Text>
      <Text style={styles.body}>Please try other search term</Text>
    </View>
  );
};

const Item = ({ country }: { country: Country }) => {
  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        router.navigate(
          `/countries/${country.name.common}?countryCode=${country.cca3}`
        );
      }}
    >
      <Image
        style={styles.flag}
        source={{
          uri: country.flags.png,
        }}
      />
      <Text style={{ ...styles.body, flex: 1 }} numberOfLines={1}>
        {country.name.common}
      </Text>
      {!!country.idd.root && (
        <Text style={[styles.body, styles.code]}>
          {country.idd.root}
          {country.idd?.suffixes?.[0]}
        </Text>
      )}
    </Pressable>
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { countries, error } = useCountries({
    searchTerm,
    filters: ["name", "cca3", "flags", "idd"],
  });
  /**
   * if we get 404 while searching then we simply sho the Empty Component
   * in Flatlist and do not render Error component
   */
  const countryNotFoundDuringSearch =
    searchTerm.length > 0 && error?.message === "404";

  if (error && !countryNotFoundDuringSearch) {
    return (
      <Error
        title="There is some issue while loading country."
        message="Please go back and try again"
      />
    );
  }

  const loading = !error && !countries;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Country Explorer",
        }}
      />
      <View style={styles.searchBar}>
        <Search
          placeholder="Enter country name to filter"
          onChange={setSearchTerm}
        />
      </View>
      {loading ? (
        <CountryListLoading />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={countries}
          renderItem={({ item }) => <Item key={item.cca3} country={item} />}
          keyExtractor={(country) => country.cca3}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={() => <Empty />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: theme.colors.bg.primary,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.space.base,
  },
  body: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.body,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    color: theme.colors.text.primary,
  },
  flag: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: 50,
    marginRight: theme.space.base,
    borderWidth: 1,
    borderColor: theme.colors.ui.tertiary,
  },
  link: {
    marginTop: theme.space.base,
    paddingVertical: theme.space.base,
  },
  linkText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text.link,
  },
  code: {
    marginLeft: "auto",
    color: theme.colors.text.link,
  },
  searchBar: {
    margin: theme.space.base,
  },
  spacer: {
    marginVertical: theme.space.md,
  },
});
