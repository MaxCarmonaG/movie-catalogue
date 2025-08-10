import { FlatList, StyleSheet, Text, View } from "react-native";
import SectionTitle from "./ui/SectionTitle";
import UpcomingCard from "./UpcomingCard";
import useMovie from "../hooks/useMovie";

export default function UpcomingSection() {
  const { upcomingMovies } = useMovie();

  return (
    <View style={styles.container}>
      <SectionTitle title="Coming Soon" hasSeeAll={true} />
      <View style={styles.list}>
        {upcomingMovies.list.map(({ id, title, year, posterPath, genres }) => (
          <UpcomingCard
            key={id}
            id={id}
            title={title}
            year={year}
            posterPath={posterPath}
            genres={genres}
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
