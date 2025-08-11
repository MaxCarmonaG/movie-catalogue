import { StyleSheet, View } from "react-native";
import SectionTitle from "./ui/SectionTitle";
import ReadMore from "@fawazahmed/react-native-read-more";

export default function SynopsisSection({ synopsis }: { synopsis: string }) {
  return (
    <View>
      <SectionTitle title="Synopsis" style={{ marginBottom: 16 }} />
      <ReadMore
        numberOfLines={2}
        style={styles.text}
        seeMoreText="Read More"
        seeLessText="Read Less"
        seeMoreStyle={styles.readMore}
        seeLessStyle={styles.readMore}
      >
        {synopsis}
      </ReadMore>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#919191",
    lineHeight: 20,
  },
  readMore: {
    color: "#ffb400",
    fontWeight: "bold",
  },
});
