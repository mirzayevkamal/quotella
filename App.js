import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/Screens/HomeScreen";
import SettingsScreen from "./src/Screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { PaperProvider } from "react-native-paper";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { MyTheme } from "./src/utils/theme";
import SearchScreen from "./src/Screens/SearchScreen";
import FavoritesScreen from "./src/Screens/FavoritesScreen";
import { Provider } from "react-redux";
import store from "./src/store/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer theme={MyTheme}>
          <SafeAreaProvider>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarVisibilityAnimationConfig: {
                  animation: "slide_from_right",
                },
              }}
              tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                  navigationState={state}
                  shifting={true}
                  safeAreaInsets={insets}
                  theme={MyTheme}
                  onTabPress={({ route, preventDefault }) => {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    });

                    if (event.defaultPrevented) {
                      preventDefault();
                    } else {
                      navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                      });
                    }
                  }}
                  renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                      return options.tabBarIcon({ focused, color, size: 24 });
                    }

                    return null;
                  }}
                  getLabelText={({ route }) => {
                    const { options } = descriptors[route.key];
                    const label =
                      options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.title;

                    return label;
                  }}
                />
              )}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Home",
                  tabBarIcon: ({ color, size }) => {
                    return <Feather name="home" size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                  tabBarLabel: "Search",
                  tabBarIcon: ({ color, size }) => {
                    return <Feather name="search" size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                  tabBarLabel: "Favorites",
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <Feather name="bookmark" size={size} color={color} />
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  tabBarLabel: "Settings",
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <Feather name="settings" size={size} color={color} />
                    );
                  },
                }}
              />
            </Tab.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
