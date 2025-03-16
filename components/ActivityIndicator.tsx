import {View, StyleSheet, ActivityIndicator as ActivityIndicatorNative} from 'react-native'
export default function ActivityIndicator(){
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicatorNative size="large" color="#19191B" />
        </View>
    )
}
const styles = StyleSheet.create({
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
});