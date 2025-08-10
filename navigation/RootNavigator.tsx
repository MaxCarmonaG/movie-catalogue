import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

const stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={HomeScreen} />
    </stack.Navigator>
  );
}
