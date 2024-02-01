import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import FontsScreen from "./FontsScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="Fonts"
        component={FontsScreen}
        options={{ title: "Fonts" }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
