import { Book } from "@/types";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

/**
 * BookItem Component
 * 
 * It renders the book name and it's author name and takes onPress callback.
 * @param book
 * @param onPress
 * this does not render if authors list is empty or author object does not contain the name and bio
 */

export const BookItem = ({ book, onPress }: { book: Book; onPress: () => void }) => (
  <TouchableOpacity accessibilityRole="button" style={styles.bookItem} onPress={onPress}>
    <View style={{ flex: 1 }}>
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.bookAuthor}>{book.author_name?.join(', ') || 'Unknown Author'}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bookTitle: { fontSize: 16, fontWeight: 500, color: '#2FB78E', lineHeight: 16 * 1.5 },
  bookAuthor: { fontSize: 14, fontWeight: 400, color: '#9D9D9D', lineHeight: 14 * 1.5 },
  bookItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
});