import { Text, View, StyleSheet } from 'react-native'
import { BookDetail } from '../types/index';

export function BookOverview({ bookDetail }: { bookDetail: BookDetail }) {
    return (
        <View style={styles.section}>
            <Text style={styles.subTitle}>Overview</Text>
            <Text style={styles.text}>
                {typeof bookDetail.description === "string"
                    ? bookDetail.description
                    : bookDetail.description?.value || "No description available."}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    section: { marginTop: 8, width: "100%" },
    subTitle: { fontSize: 18, fontWeight: "700", marginBottom: 3 },
    text: { fontSize: 14, fontWeight: "400", color: "#9D9D9D", marginTop: 0 },

})