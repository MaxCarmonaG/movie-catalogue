import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import BoxGradient from "../ui/BoxGradient";

export default function DetailsCard({
  title,
  year,
  genre,
  runtime,
  director,
}: {
  title: string;
  year: number;
  genre: string;
  runtime: string;
  director: {
    name: string;
    profilePath: string;
  };
}) {
  return (
    <BoxGradient style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons
          name="bookmark-minus-outline"
          size={30}
          color="#fff"
        />
      </View>
      <Text style={styles.meta}>
        {year} • {genre} • {runtime}
      </Text>
      <View style={styles.footer}>
        <View style={styles.pill}>
          <Image
            source={{ uri: director.profilePath }}
            style={styles.authorAvatar}
          />
          <View>
            <Text style={styles.pillLabel}>Director</Text>
            <Text style={styles.pillValue}>{director.name}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.trailerButton}>
          <FontAwesome6 name="play" color="#fff" />
          <Text style={styles.trailerText}>Watch trailer</Text>
        </TouchableOpacity>
      </View>
    </BoxGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303030",
    borderRadius: 12,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  meta: {
    color: "#919191",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 6,
  },
  pillLabel: {
    color: "#919191",
    fontSize: 12,
  },
  pillValue: {
    color: "#fff",
    fontWeight: "600",
  },
  trailerButton: {
    backgroundColor: "#272727",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  trailerText: {
    color: "#fff",
    fontSize: 13,
  },
});
