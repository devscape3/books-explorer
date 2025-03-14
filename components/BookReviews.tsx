import { NYTimesBookReview } from "@/types/nytimes-library";
import { View, Text, StyleSheet } from "react-native";

export function BookReviews({ reviews }: { reviews: NYTimesBookReview[] }) {
    return (
        <View style={styles.section}>
            <Text style={styles.subTitle}>Reviews</Text>
            {reviews.map((review, index) => (
                <View key={index}>
                    <Text>{review.byline}</Text>
                    <Text style={styles.text}>{review.summary}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    section: { marginTop: 8, width: "100%" },
    subTitle: { fontSize: 18, fontWeight: "700", marginBottom: 3 },
    text: { fontSize: 14, fontWeight: "400", color: "#9D9D9D", marginTop: 0 },
});