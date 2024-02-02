import { COUNTRIES_URL } from "@/constants/endpoint";
import { Country } from "@/types/country";
import useFetch from "../useFetch/useFetch";

export const useCountries = () => {
  const { data, error } = useFetch<Country[]>(COUNTRIES_URL);

  data?.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  return {
    countries: data,
    error,
  };
};
