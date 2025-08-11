import { Image, StyleSheet, Text, View } from "react-native";
import SectionTitle from "./ui/SectionTitle";

export default function CinemaSection({
  cinemas,
}: {
  cinemas: {
    id: string;
    name: string;
    distance: string;
    address: string;
    logo: {
      size: { width: number; height: number };
      uri: string;
    };
    highlight?: boolean;
  }[];
}) {
  return (
    <View>
      <SectionTitle title="Cinema" style={{ marginBottom: 16 }} />
      <View style={{ gap: 16 }}>
        {cinemas.map((c) => (
          <View
            key={c.id}
            style={[styles.card, c.highlight ? styles.cardHighlight : null]}
          >
            <View style={styles.content}>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.meta}>
                {c.distance} • {c.address}
              </Text>
            </View>
            <Image
              style={styles.logo}
              height={c.logo.size.height}
              width={c.logo.size.width}
              source={{ uri: c.logo.uri }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#303030",
    borderWidth: 1,
    borderColor: "#303030",
    gap: 16,
    justifyContent: "space-between",
  },
  cardHighlight: {
    borderColor: "#ffb43a",
    backgroundColor: "#292216",
  },
  content: {
    gap: 8,
    flex: 1,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
  },
  meta: {
    color: "#919191",
    fontSize: 12,
  },
  logo: {
    borderRadius: 5,
  },
});
