import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";
import { blurhash } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setSelectedBgImage } from "../store/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showSnackbar } from "../store/slices/snackbarSlice";

const BackgroundImageItem = ({ url }) => {
  const dispatch = useDispatch();

  const showSuccessSnackbar = () => {
    dispatch(showSnackbar({ type: "success", text: "Operation successful" }));
  };
  const handleBgSelection = async () => {
    try {
      dispatch(setSelectedBgImage(url.image));
      showSuccessSnackbar();

      await AsyncStorage.setItem("selectedBgImage", JSON.stringify(url.image));
    } catch (e) {
      // saving error
      showSnackbar({
        type: "error",
        text: "Failed to change background image",
      });
      console.log("bg image save error", e);
    }
  };
  return (
    <Pressable onPress={handleBgSelection} style={styles.container}>
      <Image
        placeholder={blurhash}
        cachePolicy={"disk"}
        style={styles.image}
        source={url.image}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "auto",
    height: 200,
    margin: 2,
  },
});

export default BackgroundImageItem;
