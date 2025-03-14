import { Text, StyleSheet } from 'react-native'

export const StarRating = ({ rating, reviews }: { rating: number, reviews: string }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating); // Number of fully filled stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
        <Text style={styles.rating}>
            {"⭐".repeat(fullStars)}
            {hasHalfStar && "⭐"} {/* Half star (You can replace with a half-star icon if needed) */}
            {"☆".repeat(emptyStars)}
            {` ${rating.toFixed(1)}`} {/* Display numeric value */}
            ({reviews} reviews)
        </Text>
    );
};

const styles = StyleSheet.create({
    rating: { fontSize: 18, fontWeight: "500", color: "#19191B", textAlign: "center", marginBottom: 10 },
});
