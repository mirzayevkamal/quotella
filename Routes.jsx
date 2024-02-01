import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/Screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Portal, Snackbar } from "react-native-paper";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { MyTheme } from "./src/utils/theme";
import SearchScreen from "./src/Screens/SearchScreen";
import FavoritesScreen from "./src/Screens/FavoritesScreen";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "./src/store/slices/snackbarSlice";
import { getLikedQuotes } from "./src/utils/db";
import { setLikedQuotes } from "./src/store/slices/quotesSlice";
import FontsCarousel from "./src/Components/Fonts";
import SettingsStack from "./src/Screens/SettingsStack";

const Tab = createBottomTabNavigator();

export default function Routes() {
  const { type, visible, text } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const onDismissSnackBar = () => dispatch(hideSnackbar());

  const handleGetLikedQuotes = async () => {
    const res = await getLikedQuotes();
    dispatch(setLikedQuotes(res));
  };

  React.useEffect(() => {
    handleGetLikedQuotes();
  }, []);

  return (
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
                return <Feather name="bookmark" size={size} color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStack}
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => {
                return <Feather name="settings" size={size} color={color} />;
              },
            }}
          />
        </Tab.Navigator>

        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={2000}
            action={{
              label: "Ok",
              labelStyle: { color: "white" },
              onPress: () => {
                onDismissSnackBar();
              },
            }}
            style={{
              backgroundColor: type === "success" ? "#007C52" : "red",
              color: "white",
            }}
            wrapperStyle={{ position: "absolute", top: 60, margin: "auto" }}
          >
            {text}
          </Snackbar>
        </Portal>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
