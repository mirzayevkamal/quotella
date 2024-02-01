import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import CarouselItem from "./CarouselItem";
import Animated, { SlideInDown } from "react-native-reanimated";
import { FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { showSnackbar } from "../store/slices/snackbarSlice";
import { openShareDialogAsync, saveImage } from "../utils/share";
import { getQuotesFromDb } from "../utils/db";
import { setAllQuotes, setSelectedFonts } from "../store/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarouselScreen = ({ data, activeItem }) => {
  const quoteRef = React.useRef(null);
  const dispatch = useDispatch();

  const allQuotes = useSelector((state) => state.quotes.allQuotes);

  const [state, setState] = React.useState({ open: false });
  const { open } = state;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setState({ open: false });
    }
  }, [isFocused]);
  const onStateChange = ({ open }) => setState({ open });

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

  useEffect(() => {
    getSelectedFonts();
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
    <Animated.View ref={quoteRef} style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#000",
        }}
      />

      <Image
        style={{
          alignSelf: "center",
          width: 130,
          height: 80,
          zIndex: 999,
          position: "absolute",
          top: 5,
          opacity: showActions.logo ? 0.5 : 0,
        }}
        width={130}
        height={40}
        source={require("../../assets/logo-white.png")}
      />
      <ImageBackground
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.4,
        }}
        source={require("../../assets/bgs/bg-2.jpg")}
      />
      <Animated.FlatList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
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
        <>
          <FAB.Group
            open={open}
            visible
            style={{
              zIndex: 9999,
            }}
            icon={open ? "content-save-move" : "content-save-move-outline"}
            color="#fff"
            fabStyle={{
              width: 37,
              height: 37,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#292626",
              position: Platform.OS === "ios" ? "absolute" : "relative",
              bottom: -35,
              borderRadius: 100,
              right: 9,
            }}
            backdropColor="rgba(0,0,0,0.5)"
            actions={[
              {
                icon: "download",
                label: "Download",
                onPress: () => downloadQuote(),
                style: {
                  backgroundColor: "#292626",
                },
                color: "#fff",
                labelTextColor: "#fff",
              },
              {
                icon: "share",
                label: "Share",
                onPress: () => handleShare(),
                style: {
                  backgroundColor: "#292626",
                },
                color: "#fff",
                labelTextColor: "#fff",
              },
            ]}
            onStateChange={onStateChange}
          />
        </>
      )}
    </Animated.View>
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
});

export default CarouselScreen;
