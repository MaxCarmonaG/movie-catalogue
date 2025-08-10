import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import NowPlayingSection from "../components/NowPlayingSection";
import UpcomingSection from "../components/UpcomingSection";

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ gap: 28, paddingVertical: 10 }}
    >
      <Header />
      <SearchInput />
      <NowPlayingSection />
      <UpcomingSection />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    gap: 28,
    overflow: "scroll",
  },
  text: {
    color: "#fefefe",
    fontSize: 18,
    fontWeight: "bold",
  },
});
