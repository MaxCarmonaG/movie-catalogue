import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import { RouteProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Detail: { movieId: string };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackRouteProp = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

const stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Home" component={HomeScreen} />
      <stack.Screen name="Detail" component={DetailScreen} />
    </stack.Navigator>
  );
}
