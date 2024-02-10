import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/Screens/HomeScreen";
import SearchScreen from "./src/Screens/SearchScreen";
import FavoritesScreen from "./src/Screens/FavoritesScreen";
import { getLikedQuotes } from "./src/utils/db";
import {
  setLikedQuotes,
  setQuoteBgColor,
} from "./src/store/slices/quotesSlice";
import SettingsStack from "./src/Screens/SettingsStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuoteWrapper from "./src/Components/QuoteWrapper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootStack = createNativeStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  const handleGetLikedQuotes = async () => {
    const res = await getLikedQuotes();
    dispatch(setLikedQuotes(res));
  };

  const getSavedBgColor = async () => {
    try {
      const value = await AsyncStorage.getItem("quoteBgColor");
      if (value !== null) {
        dispatch(setQuoteBgColor(value));
      }
    } catch (e) {
      // error reading value
      console.log("error getting saved bg color");
    }
  };

  React.useEffect(() => {
    handleGetLikedQuotes();
    getSavedBgColor();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Group>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="Settings" component={SettingsStack} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="Search" component={SearchScreen} />
            <RootStack.Screen name="Favorites" component={FavoritesScreen} />
            <RootStack.Screen name="Quote" component={QuoteWrapper} />
          </RootStack.Group>
        </RootStack.Navigator>
      </SafeAreaProvider>
    </>
  );
}
