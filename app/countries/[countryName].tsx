import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useCountryDetails } from "@/hooks/useCountries/useCountries";
import Error from "@/components/Error/Error";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import Spacer from "@/components/Spacer/Spacer";
import CountryDetailsLoading from "@/components/Loading/CountryDetailsLoading";
import FlagLoader from "@/components/Loading/FlagLoader";
import { FLAG_HEIGHT } from "@/constants/dimension";

export default function CountryDetails() {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const { countryName, countryCode } = useLocalSearchParams<{
    countryCode: string;
    countryName: string;
  }>();

  const { country, error } = useCountryDetails({
    countryCode,
  });

  if (error) {
    return (
      <Error
        title="There is some issue while loading country."
        message="Please go back and try again"
      />
    );
  }

  const loading = !error && !country;

  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: countryName,
          headerBackTitleVisible: false,
        }}
      />
      {loading ? (
        <CountryDetailsLoading />
      ) : (
        <>
          <View style={[styles.flagContainer, styles.shadow]}>
            <Image
              source={{ uri: country?.flags.png }}
              alt={country?.flags.alt}
              style={styles.flag}
              contentFit="cover"
            />
          </View>
          <Spacer />
          {country?.flags.alt && (
            <Text style={styles.body}>{country.flags.alt}</Text>
          )}
          <Spacer />
          {country?.capital && (
            <View style={[styles.row, styles.center]}>
              <Text style={styles.title}>Capital</Text>
              <Text style={styles.body}>{country?.capital}</Text>
            </View>
          )}
          <Spacer />
          <View style={[styles.row, styles.center]}>
            <Text style={styles.title}>Population</Text>
            <Text style={styles.body}>{country?.population || 0}</Text>
          </View>
          <Spacer />
          {!!country?.coatOfArms.png && (
            <>
              <Text style={[styles.title, styles.center]}>Coat of Arms</Text>
              <Spacer />
              <View
                style={[
                  styles.flagContainer,
                  styles.shadow,
                  styles.paddingBase,
                ]}
              >
                {!imageLoaded && <FlagLoader />}
                <Image
                  source={{ uri: country?.coatOfArms.png }}
                  style={styles.flag}
                  contentFit="contain"
                  onLoadEnd={() => setImageLoaded(true)}
                />
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: theme.colors.bg.primary,
    padding: theme.space.base,
    marginBottom: theme.space.xl,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: theme.colors.brand.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flagContainer: {
    borderWidth: 1,
    borderColor: theme.colors.ui.tertiary,
  },
  flag: {
    width: "100%",
    height: FLAG_HEIGHT,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.body,
  },
  paddingBase: {
    padding: theme.space.base,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
    color: theme.colors.text.primary,
    marginRight: theme.space.base,
    textAlign: "center",
  },
});
