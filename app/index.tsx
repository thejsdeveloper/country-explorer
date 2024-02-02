import { Link, Stack, router } from "expo-router";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { Country } from "@/types/country";
import { theme } from "@/constants/theme";
import { useCountries } from "@/hooks/useCountries/useCountries";

const CIRCLE_SIZE = 40;

const Separator = () => {
  return <View style={styles.separator} />;
};

const Error = () => {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.body}>
        There is some issue while loading countries.
      </Text>

      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Reload again</Text>
      </Link>
    </View>
  );
};

const Item = ({ country }: { country: Country }) => {
  return (
    <Pressable
      style={styles.item}
      onPress={() => router.navigate(`/countries/${country.name.common}`)}
    >
      <Image
        style={styles.flag}
        source={{
          uri: country.flags.png,
        }}
      />
      <Text style={styles.body}>{country.name.common}</Text>
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
  const { countries, error } = useCountries();

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Countries",
        }}
      />

      <FlatList
        data={countries}
        renderItem={({ item }) => <Item country={item} />}
        keyExtractor={(country) => country.cca3}
        ItemSeparatorComponent={Separator}
      />
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
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.bg.secondary,
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
});
