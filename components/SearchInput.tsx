import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import BoxGradient from "../ui/BoxGradient";

export default function SearchInput() {
  const [text, onChangeText] = useState("");

  return (
    <BoxGradient style={styles.gradient}>
      <Feather name="search" size={24} color="#fefefe" />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search movie, cinema, genre..."
        placeholderTextColor="#919191"
      />
    </BoxGradient>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 10,
    color: "#919191",
  },
  gradient: {
    paddingHorizontal: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2e2e2e",
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 24,
  },
});
