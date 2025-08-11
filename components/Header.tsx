import { Text, View, StyleSheet, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.saluteContainer}>
        <Text style={styles.salute}>Welcome Max👋</Text>
        <Text style={styles.message}>Let's relax and watch a movie.</Text>
      </View>
      <Image
        style={styles.img}
        source={require("../assets/images/max-photo.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 24,
  },
  saluteContainer: {
    flex: 1,
    gap: 4,
  },
  message: {
    color: "#fefefe",
    fontSize: 18,
    fontWeight: "bold",
  },
  salute: {
    color: "#919191",
    fontSize: 16,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
