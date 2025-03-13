import { useLocalSearchParams } from 'expo-router';
import { Text, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Author, Book, BookDetail } from '@/types';

export default function DetailScreen() {
  const { book: bookJSON } = useLocalSearchParams();
  const book: Book = JSON.parse(bookJSON as string);
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [rating, setRating] = useState<{ average: string; count: string } | null>(null);

  useEffect(() => {
    if (!book.key) return;

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org${book.key}.json`);
        const data = await response.json();
        setBookDetail(data);

        // Fetch author details
        if (data.authors) {
          const authorDetails = await Promise.all(
            data.authors.map(async (author: any) => {
              const res = await fetch(`https://openlibrary.org${author.author.key}.json`);
              return res.json();
            })
          );
          setAuthors(authorDetails);
        }

        // Fetch book rating
        const ratingResponse = await fetch(`https://openlibrary.org${book.key}/ratings.json`);
        const ratingData = await ratingResponse.json();
        setRating({
          average: ratingData.summary?.average || 'N/A',
          count: ratingData.summary?.count || '0',
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [book.key]); // ✅ Only re-run when `book.key` changes

  if (!bookDetail) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {bookDetail.covers?.[0] && (
        <Image
          source={{ uri: `https://covers.openlibrary.org/b/id/${bookDetail.covers[0]}-L.jpg` }}
          style={styles.bookCover}
        />
      )}
      <Text style={styles.title}>{bookDetail.title}</Text>
      <Text style={styles.published}>📅 Published: {book.first_publish_year || 'N/A'}</Text>
      <Text style={styles.rating}>⭐ Rating: {rating?.average} (Reviews: {rating?.count})</Text> 

      {/* ✅ Author Section */}
      {authors.length > 0 && (
        <View style={styles.authorSection}>
          <Text style={styles.authorTitle}>Author(s):</Text>
          {authors.map((author) => (
            <View key={author.key} style={styles.authorBox}>
              <Text style={styles.author}>{author.name}</Text>
              <Text style={styles.bio}>
                {typeof author.bio === 'string' ? author.bio : author.bio?.value || 'No biography available.'}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* ✅ Description */}
      <Text style={styles.description}>
        {typeof bookDetail.description === 'string' ? bookDetail.description : bookDetail.description?.value || 'No description available.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, alignItems: 'center' },
  bookCover: { width: 150, height: 220, marginBottom: 20, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  published: { fontSize: 16, color: 'blue', textAlign: 'center', marginBottom: 5 },
  rating: { fontSize: 16, color: 'green', textAlign: 'center', marginBottom: 10 },
  description: { marginTop: 10, fontSize: 14, textAlign: 'justify', lineHeight: 22 },
  loading: { textAlign: 'center', fontSize: 18, marginTop: 20 },
  authorSection: { marginTop: 20, width: '100%' },
  authorTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  authorBox: { marginBottom: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
  author: { fontSize: 16, fontWeight: 'bold' },
  bio: { fontSize: 14, color: 'gray', marginTop: 5 },
});