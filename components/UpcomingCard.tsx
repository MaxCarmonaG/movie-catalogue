import { Image, StyleSheet, Text, View } from "react-native";

export default function UpcomingCard({
  id,
  title,
  year,
  posterPath,
  genres,
}: {
  id: string;
  title: string;
  year: number;
  posterPath: string;
  genres: string;
}) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w500/" + posterPath }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          {title} ({year})
        </Text>
        <Text style={styles.genre}>{genres}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303030",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 72,
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  title: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    flex: 1,
  },
  genre: {
    color: "#919191",
    fontSize: 14,
  },
});
