import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  RootStackNavigationProp,
  RootStackRouteProp,
} from "../navigation/RootNavigator";
import useMovieDetails from "../hooks/useMovieDetails";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DetailsCard from "../components/DetailsCard";
import SynopsisSection from "../components/SynopsisSection";
import CastSection from "../components/CastSection";
import CinemaSection from "../components/CinemaSection";

type DetailScreenProps = {
  route: RootStackRouteProp;
  navigation: RootStackNavigationProp;
};

const cinemas = [
  {
    id: "c1",
    name: "HARTONO MALL CGV",
    distance: "4.53 Km",
    address: "Jl. Ring Road Utara Jl. Kaliwedi",
    logo: {
      size: { width: 41, height: 20 },
      uri: "https://i.ibb.co/23T06HPH/CGV-logo1.png",
    },

    highlight: true,
  },
  {
    id: "c2",
    name: "LIPPO PLAZA JOGJA CINEPOLIS",
    distance: "7.2 Km",
    address: "Jl. Malioboro no XX",
    logo: {
      size: { width: 68, height: 20 },
      uri: "https://i.ibb.co/tpJyy0bY/Cin-polis1.png",
    },

    highlight: false,
  },
];

export default function DetailScreen({ route, navigation }: DetailScreenProps) {
  const movieId = route?.params?.movieId;

  if (!movieId) {
    return <Text>No movie ID provided</Text>;
  }

  const { details } = useMovieDetails(movieId);
  const { title, year, genre, runtime, posterPath, overview, director, cast } =
    details;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <ImageBackground
          source={{ uri: posterPath }}
          style={styles.posterContainer}
        >
          <LinearGradient
            colors={["transparent", "#121212"]}
            locations={[0.6, 0.9]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.posterContent}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={navigation.goBack}
            >
              <FontAwesome5 name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
            <DetailsCard
              title={title}
              year={year}
              genre={genre}
              runtime={runtime}
              director={director}
            />
          </View>
        </ImageBackground>
        <View style={styles.content}>
          <SynopsisSection synopsis={overview} />
          <CastSection cast={cast} />
          <CinemaSection cinemas={cinemas} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scroll: {
    flex: 1,
  },
  posterContainer: {
    width: "100%",
    height: 370,
  },
  posterContent: {
    paddingTop: 68,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "space-between",
  },
  circleButton: {
    backgroundColor: "rgba(48, 48, 48, 0.5)",
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 18,
    gap: 24,
  },
});
