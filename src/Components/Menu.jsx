import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Portal, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../store/slices/snackbarSlice";

const Menu = () => {
  const navigation = useNavigation();

  const { type, visible, text } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const onDismissSnackBar = () => dispatch(hideSnackbar());

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000",
      width: "100%",
      height: 88,
      justifyContent: "space-around",
      flexDirection: "row",
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <Pressable
          style={{ padding: 15 }}
          onPressIn={() => navigation.navigate("Home")}
        >
          <AntDesign name="home" size={24} color="#fff" />
        </Pressable>
        <Pressable
          style={{ padding: 15 }}
          onPressIn={() => navigation.navigate("Search")}
        >
          <Feather name="search" size={24} color="#fff" />
        </Pressable>
        <Pressable
          style={{ padding: 15 }}
          onPressIn={() => navigation.navigate("Search")}
        >
          <FontAwesome name="plus-square-o" size={26} color="#fff" />
        </Pressable>

        <Pressable
          style={{ padding: 15 }}
          onPressIn={() => navigation.navigate("Favorites")}
        >
          <Ionicons name="bookmarks-outline" size={24} color="#fff" />
        </Pressable>
        <Pressable
          style={{ padding: 15 }}
          onPressIn={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </Pressable>
      </View>
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
    </>
  );
};

export default Menu;
