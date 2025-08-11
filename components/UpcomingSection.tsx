import { StyleSheet, TouchableOpacity, View } from "react-native";
import SectionTitle from "./ui/SectionTitle";
import UpcomingCard from "./UpcomingCard";
import useMovies from "../hooks/useMovies";

export default function UpcomingSection({
  onPressNavigation,
}: {
  onPressNavigation: (movieId: string) => void;
}) {
  const { upcomingMovies } = useMovies();

  return (
    <View style={styles.container}>
      <SectionTitle title="Coming Soon" hasSeeAll={true} />
      <View style={styles.list}>
        {upcomingMovies.list.map(({ id, title, year, posterPath, genres }) => (
          <TouchableOpacity key={id} onPress={() => onPressNavigation(id)}>
            <UpcomingCard
              id={id}
              title={title}
              year={year}
              posterPath={posterPath}
              genres={genres}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    paddingHorizontal: 24,
  },
  text: {
    color: "#fefefe",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    gap: 16,
    paddingVertical: 16,
  },
});
