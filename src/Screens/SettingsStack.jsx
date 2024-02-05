import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import FontsScreen from "./FontsScreen";
import BackgroundsScreen from "./BackgroundsScreen";
import BackgroundImagesScreen from "./BackgroundImagesScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Fonts"
        component={FontsScreen}
        options={{ title: "Fonts" }}
      />
      <Stack.Screen
        name="Backgrounds"
        component={BackgroundsScreen}
        options={{ title: "Backgrounds" }}
      />
      <Stack.Screen
        name="BackgroundImagesScreen"
        component={BackgroundImagesScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
