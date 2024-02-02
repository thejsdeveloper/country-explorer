import { COUNTRIES_URL, COUNTRY_SEARCH_URL } from "@/constants/endpoint";
import { Country } from "@/types/country";
import { useFetch } from "../useFetch/useFetch";
type UseCountriesProps = {
  searchTerm?: string;
};
export const useCountries = ({ searchTerm = "" }: UseCountriesProps = {}) => {
  const url = searchTerm
    ? `${COUNTRY_SEARCH_URL}/${searchTerm}`
    : COUNTRIES_URL;

  const { data, error } = useFetch<Country[]>(url);

  data?.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  return {
    countries: data,
    error,
  };
};
