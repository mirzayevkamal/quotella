import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Routes from "./Routes";
import { useFonts } from "expo-font";
import { Fonts } from "./src/utils/constants";

export default function App() {
  const [fontsLoaded, fontError] = useFonts(Fonts);

  return (
    <Provider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
