import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { BookItem } from "@/components/BookItem";
import { fetchBooks as fetchDocs } from "@/api/books";
import { Doc } from "@/types/open-library/query";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { SearchBox } from "@/components/SearchBox";
import ActivityIndicator from "@/components/ActivityIndicator";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState<Doc[] | null>(null); // Start as null to differentiate between initial state and empty results
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useDebouncedEffect(() => {
    setError(null);

    if (search.length >= 3) {
      setLoading(true);
      fetchDocs(search)
        .then((results) => {
          setDocs(results.length > 0 ? results : []); // Explicitly set empty array only when API call completes
        })
        .catch((e: Error) => {
          setError(e.message);
          setDocs(null); // Reset docs on error
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDocs(null); // Reset docs to initial state
      setLoading(false);
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

      {search.length < 3 ? (
        <Text style={styles.message}>Please enter at least 3 letters.</Text>
      ) : loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : docs && docs.length > 0 ? (
        <FlatList data={docs} keyExtractor={(item) => item.key} renderItem={renderBookItem} />
      ) : docs !== null ? (
        <Text style={styles.message}>No results found. Try a different search.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: "#fff" },
  error: { color: "red", marginBottom: 10 },
  message: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
});
