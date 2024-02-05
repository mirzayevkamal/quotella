import * as React from "react";
import { PaperProvider, Portal, Snackbar } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Routes from "./Routes";
import { useFonts } from "expo-font";
import { Fonts } from "./src/utils/constants";
import Menu from "./src/Components/Menu";
import { NavigationContainer } from "@react-navigation/native";
import { MyTheme } from "./src/utils/theme";

export default function App() {
  const [fontsLoaded, fontError] = useFonts(Fonts);

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer theme={MyTheme}>
          <Routes />
          <Menu />
        </NavigationContainer>
        {/* <Portal>
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
        </Portal> */}
      </PaperProvider>
    </Provider>
  );
}
