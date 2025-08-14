import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";

export default function SectionTitle({
  title,
  hasSeeAll,
  style,
}: {
  title: string;
  hasSeeAll?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.container, style]}>
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
