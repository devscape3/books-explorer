import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

interface BookDetail {
  title: string;
  by_statement?: string;
  description?: { value: string } | string;
  covers?: number[];
  publish_date?: string;
  authors?: { name: string }[];
}

export default function DetailScreen() {
  const { bookId } = useLocalSearchParams();
  const [book, setBook] = useState<BookDetail | null>(null);

  useEffect(() => {
    if (!bookId) return;
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org${bookId}.json`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  if (!book) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {book.covers?.[0] && (
        <Image
          source={{ uri: `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` }}
          style={styles.bookCover}
        />
      )}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>
        {book.authors?.map((a) => a.name).join(', ') || 'Unknown Author'}
      </Text>
      <Text style={styles.published}>📅 Published: {book.publish_date || 'N/A'}</Text>
      <Text style={styles.rating}>⭐ Rating: N/A</Text> 
      <Text style={styles.description}>
        {typeof book.description === 'string' ? book.description : book.description?.value || 'No description available.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, alignItems: 'center' },
  bookCover: { width: 150, height: 220, marginBottom: 20, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  author: { fontSize: 18, color: 'gray', textAlign: 'center', marginBottom: 10 },
  published: { fontSize: 16, color: 'blue', textAlign: 'center', marginBottom: 5 },
  rating: { fontSize: 16, color: 'green', textAlign: 'center', marginBottom: 5 },
  description: { marginTop: 10, fontSize: 14, textAlign: 'justify', lineHeight: 22 },
  loading: { textAlign: 'center', fontSize: 18, marginTop: 20 },
});
