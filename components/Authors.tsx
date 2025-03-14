import { View, Text, StyleSheet } from 'react-native'
import { Author } from '@/types';

/**
 * Author Component
 * 
 * @param author - Takes list of authors and displays the author name and its bio on screen.
 * Taping the result list item takes to Details Screen.
 * this does not render if authors list is empty or author object does not contain the name and bio
 */

export const Authors = ({ authors }: { authors: Author[] }) => {
    return (
        authors
            .filter((author) => author.name && author.bio).length > 0 && (
            <View style={styles.section}>
                <Text style={styles.subTitle}>About the Author(s)</Text>
                {authors
                    .filter((author) => author.name && author.bio)
                    .map((author) => (
                        <View key={author.key}>
                            <Text style={styles.text}>
                                {typeof author.bio === "string" ? author.bio : "No biography available."}
                            </Text>
                        </View>
                    ))}
            </View>
        )
    )
}

const styles = StyleSheet.create({
    section: { marginTop: 8, width: "100%" },
    subTitle: { fontSize: 18, fontWeight: "700", marginBottom: 3 },
    text: { fontSize: 14, fontWeight: "400", color: "#9D9D9D", marginTop: 0 },
});