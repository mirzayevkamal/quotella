import React, { useEffect } from "react";
import {
  Button,
  Easing,
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
} from "react-native";
import { openShareDialogAsync, saveImage } from "../utils/share";
import { IconButton, MD3Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Snackbar, Portal, FAB } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import {
  addQuoteToDbAsObject,
  getLikedQuotes,
  removeLikedQuote,
} from "../utils/db";
import PagerView from "react-native-pager-view";
import QuoteText from "./QuoteText";
import { useSelector, useDispatch } from "react-redux";
import { setLikedQuotes } from "../store/slices/quotesSlice";
import Animated, {
  useSharedValue,
  withTiming,
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

const QuoteWrapper = ({ data }) => {
  const quoteRef = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState(
    "Quote saved to Gallery."
  );
  const likedQuotes = useSelector((state) => state.quotes.likedQuotes);
  const [showActions, setShowActions] = React.useState({
    logo: false,
    actions: true,
  });
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setState({ open: false });
    }
  }, [isFocused]);

  const handleGetLikedQuotes = async () => {
    const res = await getLikedQuotes();
    dispatch(setLikedQuotes(res));
  };

  const handleQuoteLike = async (quote) => {
    await addQuoteToDbAsObject(quote);
    await handleGetLikedQuotes();
  };

  const handleQuoteUnlike = async (quote) => {
    await removeLikedQuote(quote);
    await handleGetLikedQuotes();
  };

  const showSnackbar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);

  const showSuccessSnackbar = () => {
    setSnackBarText("Quote saved to Gallery");
    showSnackbar();
  };

  const showFailureSnackbar = () => {
    setSnackBarText("Failed to save quote");
    showSnackbar();
  };

  const handleShare = async () => {
    setShowActions({
      logo: true,
      actions: false,
    });
    const res = await openShareDialogAsync(quoteRef);

    if (res.status === "shared") {
      showSuccessSnackbar();
      setShowActions({
        logo: false,
        actions: true,
      });
    } else if (res.status === "dismissed") {
      setShowActions({
        logo: false,
        actions: true,
      });
    } else {
      showFailureSnackbar();
      setShowActions({
        logo: false,
        actions: true,
      });
    }
  };

  const handleQuoteDownload = async () => {
    setShowActions({
      logo: true,
      actions: false,
    });

    setTimeout(async () => {
      await saveImage(
        quoteRef,
        () => {
          showSuccessSnackbar();
          setShowActions({
            logo: false,
            actions: true,
          });
        },
        () => {
          showFailureSnackbar();
          setShowActions({
            logo: false,
            actions: true,
          });
        }
      );
    }, 200);
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
    <View style={{ flex: 1, position: "relative" }}>
      <View
        ref={quoteRef}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#292626",
        }}
      >
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
          source={image ? { uri: image } : require("../../assets/bgs/bg-2.jpg")}
        />
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <PagerView
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            initialPage={0}
          >
            {data
              .filter((qt) => qt.quote.length < 450)
              .map((item) => (
                <View
                  key={item.id}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <QuoteText
                    key={item.id}
                    quote={item.quote}
                    author={item.by}
                  />
                  {showActions.actions && (
                    <Animated.View
                      entering={SlideInDown}
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        zIndex: 999,
                      }}
                    >
                      <IconButton
                        icon="heart"
                        iconColor={
                          likedQuotes?.filter((itm) => itm.quote === item.quote)
                            .length
                            ? "red"
                            : MD3Colors.neutral99
                        }
                        size={20}
                        onPress={() => {
                          if (
                            likedQuotes?.filter(
                              (itm) => itm.quote === item.quote
                            ).length
                          ) {
                            handleQuoteUnlike(item);
                          } else {
                            handleQuoteLike(item);
                          }
                        }}
                        mode="contained"
                        containerColor={"#292626"}
                      />
                    </Animated.View>
                  )}
                </View>
              ))}
          </PagerView>
        </View>
      </View>
      <FAB.Group
        style={{ position: "absolute", bottom: 0 }}
        open={open}
        visible
        icon={open ? "content-save-move" : "content-save-move-outline"}
        color="#fff"
        fabStyle={{
          width: 37,
          height: 37,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: -35,
          right: 10,
          borderRadius: 100,
          backgroundColor: "#292626",
        }}
        backdropColor="rgba(0,0,0,0.5)"
        actions={[
          {
            icon: "download",
            label: "Download",
            onPress: () => handleQuoteDownload(),
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
          style={{ backgroundColor: "#292626", color: "white" }}
          wrapperStyle={{ position: "absolute", top: 60, margin: "auto" }}
        >
          {snackBarText}
        </Snackbar>
      </Portal>
    </View>
  );
};

export default QuoteWrapper;
