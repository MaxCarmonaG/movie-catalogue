import { Text, View, StyleSheet } from "react-native";

export default function SectionTitle({
  title,
  hasSeeAll,
}: {
  title: string;
  hasSeeAll: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {hasSeeAll && <Text style={styles.link}>See All</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fefefe",
  },
  link: {
    color: "#ffb43a",
  },
});
