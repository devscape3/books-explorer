import { Book } from "@/types";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const BookItem = ({ book, onPress }: { book: Book; onPress: () => void }) => (
    <TouchableOpacity style={styles.bookItem} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author_name?.join(', ') || 'Unknown Author'}</Text>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    bookTitle: { fontSize: 16, fontWeight: 'bold' },
    bookAuthor: { color: 'gray' },
    bookItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1 },
  });