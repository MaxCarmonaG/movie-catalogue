import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";

export default function BoxGradient({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <LinearGradient
      colors={["#272727", "#121212"]}
      style={style}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
}
