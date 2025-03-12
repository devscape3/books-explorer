import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3) fetchBooks(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchBooks = async (query: string) => {
    try {
      setError(null);
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name&limit=10`);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid API response. Try again later.');
      }

      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      setError('Error fetching books. Please try again later.');
      console.error('Error fetching books:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for books..."
        value={search}
        onChangeText={setSearch}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => router.push({ pathname: '/(screens)/detail', params: { bookId: item.key } })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author_name?.join(', ') || 'Unknown Author'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
  bookItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1 },
  bookCover: { width: 50, height: 75, marginRight: 10 },
  bookTitle: { fontSize: 16, fontWeight: 'bold' },
  bookAuthor: { color: 'gray' },
  bookYear: { color: 'blue' },
  bookRating: { color: 'green' },
});
