import { FlatList, StyleSheet, Text, View } from "react-native";
import SectionTitle from "./ui/SectionTitle";
import UpcomingCard from "./UpcomingCard";
import upcoming from "../upcoming.json";

export default function UpcomingSection() {
  const data = upcoming as {
    results: {
      id: number;
      title: string;
      release_date: string;
      poster_path: string;
      genre: string;
    }[];
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="Coming Soon" hasSeeAll={true} />
      <View style={styles.list}>
        {data.results.map((item) => (
          <UpcomingCard
            key={item.id}
            id={item.id}
            title={item.title}
            releaseDate={item.release_date}
            posterPath={item.poster_path}
            genre={item.genre}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  text: {
    color: "#fefefe",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
