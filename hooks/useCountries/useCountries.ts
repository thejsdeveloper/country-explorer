import { COUNTRIES_URL, COUNTRY_SEARCH_URL } from "@/constants/endpoint";
import { Country } from "@/types/country";
import { useFetch } from "../useFetch/useFetch";
type UseCountriesProps = {
  searchTerm?: string;
  filters?: Array<keyof Country>;
};
export const useCountries = ({
  searchTerm = "",
  filters,
}: UseCountriesProps = {}) => {
  let url = searchTerm ? `${COUNTRY_SEARCH_URL}/${searchTerm}` : COUNTRIES_URL;

  if (filters) {
    url = `${url}?fields=${filters.toString()}`;
  }

  const { data, error } = useFetch<Country[]>(url);

  data?.sort((countryA, countryB) =>
    countryA.name.common.localeCompare(countryB.name.common)
  );

  return {
    countries: data,
    error,
  };
};

type UseCountryDetailsProps = {
  filters?: keyof Country;
  countryCode: Pick<Country, "cca2">;
};
