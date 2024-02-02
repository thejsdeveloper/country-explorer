import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import useDebounce from "@/hooks/useDebounce/useDebounce";

type SearchProps = {
  text?: string;
  placeholder?: string;
  onChange: (text: string) => void;
};
export default function Search({
  placeholder = "Search",
  onChange,
  text = "",
}: SearchProps) {
  const [searchTerm, setSearchTerm] = React.useState(text);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    onChange(searchTerm);
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.search}>
      <EvilIcons name="search" size={24} color="black" />
      <TextInput
        style={styles.input}
        value={searchTerm}
        placeholder={placeholder}
        onChangeText={setSearchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.bg.tertiary,
    borderRadius: 5,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.md,
  },
  input: {
    flex: 1,
    height: theme.space.xl,
    marginLeft: theme.space.md,
  },
});
