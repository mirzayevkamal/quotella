import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  FlatList,
} from "react-native";
import CarouselItem from "./CarouselItem";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { showSnackbar } from "../store/slices/snackbarSlice";
import { openShareDialogAsync, saveImage } from "../utils/share";
import { getQuotesFromDb } from "../utils/db";
import {
  setAllQuotes,
  setSelectedFonts,
  setSelectedBgImage,
} from "../store/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const CarouselScreen = ({ data }) => {
  const quoteRef = React.useRef(null);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { allQuotes, selectedBgImage, quoteBgOpacity } = useSelector(
    (state) => state.quotes
  );

  const [showActions, setShowActions] = React.useState({
    logo: false,
    actions: true,
  });

  const getSelectedFonts = async () => {
    try {
      const value = await AsyncStorage.getItem("selectedFonts");
      if (value !== null) {
        dispatch(setSelectedFonts(JSON.parse(value)));
      }
    } catch (e) {
      // error reading value
      console.log("error getting saved font");
    }
  };

  const getSelectedBgImage = async () => {
    try {
      const value = await AsyncStorage.getItem("selectedBgImage");
      if (value !== null) {
        dispatch(setSelectedBgImage(JSON.parse(value)));
      }
    } catch (e) {
      // error reading value
      console.log("error getting saved font");
    }
  };

  useEffect(() => {
    getSelectedFonts();
    getSelectedBgImage();
  }, []);

  const showSuccessSnackbar = () => {
    dispatch(showSnackbar({ type: "success", text: "Operation successful" }));
  };

  const showFailureSnackbar = () => {
    dispatch(
      showSnackbar({ type: "error", text: "Failed to perform operation" })
    );
  };

  const downloadQuote = async () => {
    setShowActions({
      logo: true,
      actions: false,
    });
    await new Promise((resolve) => setTimeout(resolve, 200));
    const res = await saveImage(quoteRef);
    setShowActions({
      logo: false,
      actions: true,
    });
    if (res) {
      showSuccessSnackbar();
    } else {
      showFailureSnackbar();
    }
  };

  const handleShare = async () => {
    setShowActions({
      logo: true,
      actions: false,
    });

    try {
      const res = await openShareDialogAsync(quoteRef);
      console.log("res", res);

      if (res.status === "shared") {
        Platform.OS === "ios" && showSuccessSnackbar();
      } else if (res.status === "dismissed") {
        // No action needed for dismissal
      } else {
        showFailureSnackbar();
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during sharing:", error);
      showFailureSnackbar();
    } finally {
      setShowActions({
        logo: false,
        actions: true,
      });
    }
  };

  const getDbData = async () => {
    const res = await getQuotesFromDb();

    if (allQuotes.length > 100) {
      dispatch(setAllQuotes(res));
    } else {
      dispatch(setAllQuotes([...allQuotes, ...res]));
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View ref={quoteRef} style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "blue",
        }}
      />

      <Image
        style={{
          alignSelf: "center",
          width: 130,
          height: 80,
          zIndex: 999,
          position: "absolute",
          top: insets.top,
          opacity: showActions.logo ? 0.5 : 0,
        }}
        width={130}
        height={40}
        source={require("../../assets/logo-white.png")}
      />
      <Image
        cachePolicy={"disk"}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: quoteBgOpacity,
        }}
        source={selectedBgImage}
      />
      <FlatList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          if (data.length > 1) {
            getDbData();
          }
        }}
        data={data}
        renderItem={({ item }) => (
          <CarouselItem
            showActions={showActions}
            setShowActions={setShowActions}
            item={item}
          />
        )}
        horizontal
        pagingEnabled
      />
      {showActions.actions && (
        <View style={[styles.actions, { top: insets.top }]}>
          <IconButton
            icon="download"
            iconColor="#fff"
            mode="contained"
            containerColor="rgba(0, 0, 0, .05)"
            onPress={downloadQuote}
          />
          <IconButton
            icon="share"
            iconColor="#fff"
            mode="contained"
            containerColor="rgba(0, 0, 0, .05)"
            onPress={handleShare}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  actions: {
    position: "absolute",
    right: 10,
    flexDirection: "row",
  },
});

export default CarouselScreen;
