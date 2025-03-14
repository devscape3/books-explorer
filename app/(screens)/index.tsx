import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { BookItem } from "@/components/BookItem";
// TODO: refactor fetchBooks to fetchDocs
import { fetchBooks as fetchDocs } from "@/api/books";
import { Doc } from "@/types/open-library/query";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { SearchBox } from "@/components/SearchBox";

/**
 * Home Screen
 * 
 * Dynamically Search the books by book names or author names.
 * Taping the result list item takes to Details Screen.
 */

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  // open library organized the books as docs, a doc my contain many editions
  const [docs, setDocs] = useState<Doc[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Debounced effect to call fetchBooks only after 500ms
  useDebouncedEffect(() => {
    if (search.length >= 3) {
      setError("")
      fetchDocs(search)
        .then(setDocs)
        .catch(() => setError("Error fetching books. Please try again later."));
    }
  }, [search], 500);

  const renderBookItem = ({ item }: { item: Doc }) => (
    <BookItem
      book={item}
      onPress={() =>
        router.push({ pathname: "/(screens)/detail", params: { docJSON: JSON.stringify(item) } })
      }
    />
  );

  return (
    <View style={styles.container}>
      <SearchBox value={search} onChange={setSearch} placeholder="Book title or author" />
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList data={docs} keyExtractor={(item) => item.key} renderItem={renderBookItem} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 4, paddingRight: 30, paddingLeft: 30, paddingBottom: 30, backgroundColor: "#fff", fontFamily: "Roboto" },
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
    borderColor: "#E8E8E8",
  },
  error: { color: "red", marginBottom: 10 },
});
