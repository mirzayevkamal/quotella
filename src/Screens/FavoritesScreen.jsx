import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import QuoteItem from "../Components/QuoteItem";
import { IconButton, Text } from "react-native-paper";
import BottomSheet from "@devvie/bottom-sheet";
import QuoteWrapper from "../Components/QuoteWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getLikedQuotes, removeAllFavorites } from "../utils/db";
import { setLikedQuotes } from "../store/slices/quotesSlice";

const FavoritesScreen = () => {
  const likedQuotes = useSelector((state) => state.quotes.likedQuotes);
  const [selectedItem, setSelectedItem] = useState(null);
  const sheetRef = useRef(null);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFocused) {
      sheetRef.current?.close();
    }
  }, [isFocused]);

  const handleGetLikedQuotes = async () => {
    const res = await getLikedQuotes();
    dispatch(setLikedQuotes(res));
  };

  const handleRemoveAllFavorites = async () => {
    try {
      await removeAllFavorites();
      await handleGetLikedQuotes();
    } catch (error) {
      console.log("error when removing all favorites", error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text
            variant="headlineLarge"
            style={{
              color: "#fff",
              paddingVertical: 10,
              paddingHorizontal: 5,
              fontFamily: "Cabin",
            }}
          >
            Favorites
          </Text>
          {likedQuotes.length ? (
            <Pressable
              onPress={handleRemoveAllFavorites}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="heart-dislike" size={24} color="red" />
              <Text
                variant="titleSmall"
                style={{
                  color: "#fff",
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  fontFamily: "Cabin",
                }}
              >
                Remove all
              </Text>
            </Pressable>
          ) : null}
        </View>
        <FlatList
          data={likedQuotes}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 90 }}
          renderItem={({ item }) => (
            <QuoteItem
              item={item}
              onPress={() => {
                setSelectedItem(item);
                navigation.navigate("Quote", { item });
              }}
            />
          )}
          keyExtractor={(item) => item.ID || item.id}
        />
      </SafeAreaView>

      {selectedItem && (
        <BottomSheet
          animationType="fade"
          openDuration={300}
          closeDuration={300}
          customDragHandleComponent={() => (
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton
                icon="close"
                iconColor="#fff"
                onPress={() => setSelectedItem(null)}
              />
            </View>
          )}
          height={"83%"}
          ref={sheetRef}
          style={{ backgroundColor: "rgb(15, 15, 15)" }}
        >
          <View style={{ width: "100%", height: "100%", marginBottom: -50 }}>
            <QuoteWrapper allQuotes={[selectedItem]} />
          </View>
        </BottomSheet>
      )}
    </>
  );
};

export default FavoritesScreen;
