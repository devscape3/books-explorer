import { useLocalSearchParams } from "expo-router";
import { Text, Image, ScrollView, StyleSheet } from "react-native";
import { useBookDetails } from "@/hooks/useBookDetails";
import { Doc } from "@/types/open-library/query";
import { StarRating } from "@/components/StarRating";
import { BookReviews } from "@/components/BookReviews";
import { BookOverview } from "@/components/BookOverview";
import { Authors } from "@/components/Authors";
import ActivityIndicator from "@/components/ActivityIndicator";
import BookCover from "@/components/BookCover";

/**
 * Details Screen
 * 
 * Details of a work are shown here
 * Pressing back or search icon takes back to the Main Screen.
 */
export default function DetailScreen() {
  const { docJSON } = useLocalSearchParams();
  const doc: Doc = JSON.parse(docJSON as string);
  const { bookDetail, authors, rating, reviews } = useBookDetails(doc.key);

  // Show Activity Indicator while loading
  if (!bookDetail)
    return (
      <ActivityIndicator/>
    );
  const bookCoverUri = bookDetail.covers?.[0]
    ? { uri: `https://covers.openlibrary.org/b/id/${bookDetail.covers[0]}-M.jpg` }
    : require("@/assets/images/emptybook.jpeg");
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <BookCover bookCoverUri={bookCoverUri}/>
      <Text style={styles.title}>{bookDetail.title}</Text>
      <Text style={styles.authorNames}>{authors.map((author) => author.name).join(", ")}</Text>
      {
        doc.first_publish_year && <Text style={styles.published}>Published in {doc.first_publish_year || "N/A"}</Text>
      }
      {/* Rating */}
      {rating?.average && !isNaN(parseFloat(rating.average)) ? (
        <StarRating rating={parseFloat(rating.average)} reviews={rating.count?.toString() ?? '0'} />
      ) : (
        true && <Text style={styles.rating}></Text>
      )}
      <Authors authors={authors} />
      <BookOverview bookDetail={bookDetail} />
      <BookReviews reviews={reviews} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", fontFamily: "Helvetica" },
  content: { paddingTop: 4, paddingRight: 30, paddingLeft: 30, paddingBottom: 30, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "700", color: "#19191B", textAlign: "center", marginBottom: 10 },
  authorNames: { color: "#9D9D9D", fontWeight: "400", fontSize: 16 },
  published: { marginTop: 6, marginBottom: 6, color: "#9D9D9D", fontWeight: "400", fontSize: 16 },
  rating: { marginTop: 6, fontSize: 18, fontWeight: "500", color: "#19191B", textAlign: "center", marginBottom: 10 },
  section: { marginTop: 8, width: "100%" },
  subTitle: { fontSize: 18, fontWeight: "700", marginBottom: 3 },
  text: { fontSize: 14, fontWeight: "400", color: "#9D9D9D", marginTop: 0 },
});
