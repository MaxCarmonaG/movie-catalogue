import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Actor } from "../api/tmdb";
import SectionTitle from "../ui/SectionTitle";

export default function CastSection({ cast }: { cast: Actor[] }) {
  return (
    <View>
      <SectionTitle title="Cast" style={{ marginBottom: 16 }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        data={cast}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.castItem}>
            <Image
              source={{ uri: item.profilePath }}
              style={styles.castImage}
            />
            <Text style={styles.castName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  castItem: {
    maxWidth: 132,
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#303030",
    padding: 5,
    borderRadius: 15,
  },
  castImage: {
    width: 46,
    height: 46,
    borderRadius: 10,
  },
  castName: {
    width: 68,
    color: "#fff",
    fontSize: 12,
  },
});
