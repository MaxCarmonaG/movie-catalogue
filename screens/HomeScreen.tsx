import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import NowPlayingSection from "../components/NowPlayingSection";
import UpcomingSection from "../components/UpcomingSection";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation/RootNavigator";

export default function HomeScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressNavigation = (movieId: string) => {
    navigation.navigate("Detail", { movieId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ gap: 28, paddingVertical: 10 }}
      >
        <Header />
        <SearchInput />
        <NowPlayingSection onPressNavigation={onPressNavigation} />
        <UpcomingSection onPressNavigation={onPressNavigation} />
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#121212",
  },
  scroll: {
    gap: 28,
  },
});
