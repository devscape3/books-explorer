import { useState } from "react";
import { Image, View, ActivityIndicator, StyleSheet } from "react-native";

export default function BookCover({ bookCoverUri }: { bookCoverUri: any }) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.imageContainer}>
      {loading && <ActivityIndicator style={styles.loader} size="small" color="#555" />}
      <Image
        source={bookCoverUri}
        style={styles.bookCover}
        onLoadStart={() => setLoading(true)} // Show loader when fetching starts
        onLoadEnd={() => setLoading(false)} // Hide loader when the image is loaded
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: { position: "relative", justifyContent: "center", alignItems: "center" },
  loader: { position: "absolute" }, // Keeps loader centered inside the image container
  bookCover: { width: 196, height: 300, marginBottom: 20, borderRadius: 10, resizeMode: "cover"},

});
